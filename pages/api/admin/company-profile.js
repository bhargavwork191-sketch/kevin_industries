import { supabaseAdmin } from '../../../lib/supabaseServer'
import formidable from 'formidable'
import fs from 'fs'

// Disable the default body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Get the current active company profile
      const { data, error } = await supabaseAdmin
        .from('company_profile')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error fetching company profile:', error)
        return res.status(500).json({ error: 'Failed to fetch company profile' })
      }

      return res.status(200).json(data || null)
    } catch (error) {
      console.error('Error in GET /api/admin/company-profile:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  if (req.method === 'POST') {
    try {
      // Parse the multipart form data
      const form = formidable({
        maxFileSize: 10 * 1024 * 1024, // 10MB
        filter: ({ mimetype }) => mimetype === 'application/pdf'
      })

      const [fields, files] = await form.parse(req)
      
      const file = files.file?.[0]
      if (!file) {
        return res.status(400).json({ error: 'No PDF file provided' })
      }

      // Validate file type
      if (file.mimetype !== 'application/pdf') {
        return res.status(400).json({ error: 'Only PDF files are allowed' })
      }

      // Generate unique filename
      const timestamp = Date.now()
      const filename = `company-profile-${timestamp}.pdf`
      const storagePath = `company-profile/${filename}`

      // Read the file buffer
      const fileBuffer = fs.readFileSync(file.filepath)
      
      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
        .from('company-profile')
        .upload(storagePath, fileBuffer, {
          contentType: 'application/pdf',
          upsert: false
        })

      if (uploadError) {
        console.error('Error uploading file:', uploadError)
        return res.status(500).json({ error: 'Failed to upload file' })
      }

      // Get public URL
      const { data: urlData } = supabaseAdmin.storage
        .from('company-profile')
        .getPublicUrl(storagePath)

      // Deactivate all existing company profiles
      await supabaseAdmin
        .from('company_profile')
        .update({ is_active: false })
        .eq('is_active', true)

      // Create a user-friendly filename for download
      const userFriendlyFilename = file.originalFilename 
        ? file.originalFilename.replace(/\.pdf$/i, '') + '.pdf'
        : 'Kevin-Industries-Company-Profile.pdf'

      // Insert new company profile record
      const { data: insertData, error: insertError } = await supabaseAdmin
        .from('company_profile')
        .insert({
          filename: filename,
          original_filename: userFriendlyFilename,
          url: urlData.publicUrl,
          storage_path: storagePath,
          file_size: file.size,
          mime_type: file.mimetype,
          title: fields.title?.[0] || 'Company Profile',
          description: fields.description?.[0] || '',
          is_active: true
        })
        .select()
        .single()

      if (insertError) {
        console.error('Error inserting company profile:', insertError)
        // Clean up uploaded file if database insert fails
        await supabaseAdmin.storage
          .from('company-profile')
          .remove([storagePath])
        return res.status(500).json({ error: 'Failed to save company profile' })
      }

      // Clean up temporary file
      fs.unlinkSync(file.filepath)

      return res.status(201).json(insertData)
    } catch (error) {
      console.error('Error in POST /api/admin/company-profile:', error)
      // Clean up temporary file if it exists
      if (files?.file?.[0]?.filepath) {
        try {
          fs.unlinkSync(files.file[0].filepath)
        } catch (cleanupError) {
          console.error('Error cleaning up temporary file:', cleanupError)
        }
      }
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query

      if (!id) {
        return res.status(400).json({ error: 'Company profile ID is required' })
      }

      // Get the company profile to get storage path
      const { data: profile, error: fetchError } = await supabase
        .from('company_profile')
        .select('storage_path')
        .eq('id', id)
        .single()

      if (fetchError) {
        console.error('Error fetching company profile:', fetchError)
        return res.status(404).json({ error: 'Company profile not found' })
      }

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('company-profile')
        .remove([profile.storage_path])

      if (storageError) {
        console.error('Error deleting file from storage:', storageError)
      }

      // Delete from database
      const { error: deleteError } = await supabase
        .from('company_profile')
        .delete()
        .eq('id', id)

      if (deleteError) {
        console.error('Error deleting company profile:', deleteError)
        return res.status(500).json({ error: 'Failed to delete company profile' })
      }

      return res.status(200).json({ message: 'Company profile deleted successfully' })
    } catch (error) {
      console.error('Error in DELETE /api/admin/company-profile:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
