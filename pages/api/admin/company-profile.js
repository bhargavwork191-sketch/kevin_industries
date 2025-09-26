import { supabaseAdmin } from '../../../lib/supabaseServer'
import formidable from 'formidable'
import fs from 'fs'

// Disable the default body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
  },
}

export default async function handler(req, res) {
  console.log('📡 API Route hit:', req.method, req.url)
  console.log('📏 Content-Length:', req.headers['content-length'])
  console.log('📏 Content-Type:', req.headers['content-type'])
  
  // Check if request is too large before processing
  const contentLength = parseInt(req.headers['content-length'] || '0')
  console.log('📏 Request content-length:', contentLength, 'bytes')
  
  // 4.5MB Vercel limit check
  if (contentLength > 4.5 * 1024 * 1024) { // 4.5MB Vercel limit
    console.log('❌ Request too large for Vercel:', contentLength)
    return res.status(413).json({ 
      error: 'File too large for serverless function. Maximum size is 4.5MB. Please compress your PDF or use a smaller file.',
      fileSize: contentLength,
      maxSize: 4.5 * 1024 * 1024
    })
  }
  
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
      console.log('📤 Starting PDF upload process...')
      
      // Parse the multipart form data
      const form = formidable({
        maxFileSize: 50 * 1024 * 1024, // 50MB
        filter: ({ mimetype }) => mimetype === 'application/pdf'
      })

      const [fields, files] = await form.parse(req)
      console.log('📁 Form parsed successfully')
      
      const file = files.file?.[0]
      if (!file) {
        return res.status(400).json({ error: 'No PDF file provided' })
      }

      // Validate file type
      if (file.mimetype !== 'application/pdf') {
        return res.status(400).json({ error: 'Only PDF files are allowed' })
      }

      // Check file size
      if (file.size > 50 * 1024 * 1024) { // 50MB
        return res.status(413).json({ 
          error: 'File too large. Maximum size allowed is 50MB.',
          fileSize: file.size,
          maxSize: 50 * 1024 * 1024
        })
      }

      // Generate unique filename
      const timestamp = Date.now()
      const filename = `company-profile-${timestamp}.pdf`
      const storagePath = `company-profile/${filename}`

      // Read the file buffer
      console.log('📖 Reading file buffer...')
      const fileBuffer = fs.readFileSync(file.filepath)
      console.log('📦 File buffer size:', fileBuffer.length, 'bytes')
      
      // Upload file to Supabase Storage
      console.log('☁️ Uploading to Supabase Storage...')
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

      // Get existing company profiles before deactivating
      const { data: existingProfiles } = await supabaseAdmin
        .from('company_profile')
        .select('storage_path')
        .eq('is_active', true)

      // Deactivate all existing company profiles
      await supabaseAdmin
        .from('company_profile')
        .update({ is_active: false })
        .eq('is_active', true)

      // Clean up old files from storage
      if (existingProfiles && existingProfiles.length > 0) {
        const oldPaths = existingProfiles.map(profile => profile.storage_path)
        console.log('🗑️ Cleaning up old files:', oldPaths)
        await supabaseAdmin.storage
          .from('company-profile')
          .remove(oldPaths)
      }

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
      const { data: profile, error: fetchError } = await supabaseAdmin
        .from('company_profile')
        .select('storage_path')
        .eq('id', id)
        .single()

      if (fetchError) {
        console.error('Error fetching company profile:', fetchError)
        return res.status(404).json({ error: 'Company profile not found' })
      }

      // Delete from storage
      const { error: storageError } = await supabaseAdmin.storage
        .from('company-profile')
        .remove([profile.storage_path])

      if (storageError) {
        console.error('Error deleting file from storage:', storageError)
      }

      // Delete from database
      const { error: deleteError } = await supabaseAdmin
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
