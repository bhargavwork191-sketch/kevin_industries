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
      // Get the current active digital visiting card
      const { data, error } = await supabaseAdmin
        .from('digital_visiting_card')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error fetching digital visiting card:', error)
        return res.status(500).json({ error: 'Failed to fetch digital visiting card' })
      }

      return res.status(200).json(data || null)
    } catch (error) {
      console.error('Error in GET /api/admin/digital-visiting-card:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  if (req.method === 'POST') {
    try {
      console.log('📤 Starting digital visiting card PDF upload process...')
      
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
      const filename = `digital-visiting-card-${timestamp}.pdf`
      const storagePath = `digital-visiting-card/${filename}`

      // Read the file buffer
      console.log('📖 Reading file buffer...')
      const fileBuffer = fs.readFileSync(file.filepath)
      console.log('📦 File buffer size:', fileBuffer.length, 'bytes')
      
      // Upload file to Supabase Storage
      console.log('☁️ Uploading to Supabase Storage...')
      const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
        .from('digital-visiting-card')
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
        .from('digital-visiting-card')
        .getPublicUrl(storagePath)

      // Get existing digital visiting cards before deactivating
      const { data: existingCards } = await supabaseAdmin
        .from('digital_visiting_card')
        .select('storage_path')
        .eq('is_active', true)

      // Deactivate all existing digital visiting cards
      await supabaseAdmin
        .from('digital_visiting_card')
        .update({ is_active: false })
        .eq('is_active', true)

      // Clean up old files from storage
      if (existingCards && existingCards.length > 0) {
        const oldPaths = existingCards.map(card => card.storage_path)
        console.log('🗑️ Cleaning up old files:', oldPaths)
        await supabaseAdmin.storage
          .from('digital-visiting-card')
          .remove(oldPaths)
      }

      // Create a user-friendly filename for download
      const userFriendlyFilename = file.originalFilename 
        ? file.originalFilename.replace(/\.pdf$/i, '') + '.pdf'
        : 'Kevin-Industries-Digital-Visiting-Card.pdf'

      // Insert new digital visiting card record
      const { data: insertData, error: insertError } = await supabaseAdmin
        .from('digital_visiting_card')
        .insert({
          filename: filename,
          original_filename: userFriendlyFilename,
          url: urlData.publicUrl,
          storage_path: storagePath,
          file_size: file.size,
          mime_type: file.mimetype,
          title: fields.title?.[0] || 'Digital Visiting Card',
          description: fields.description?.[0] || '',
          is_active: true
        })
        .select()
        .single()

      if (insertError) {
        console.error('Error inserting digital visiting card:', insertError)
        // Clean up uploaded file if database insert fails
        await supabaseAdmin.storage
          .from('digital-visiting-card')
          .remove([storagePath])
        return res.status(500).json({ error: 'Failed to save digital visiting card' })
      }

      // Clean up temporary file
      fs.unlinkSync(file.filepath)

      return res.status(201).json(insertData)
    } catch (error) {
      console.error('Error in POST /api/admin/digital-visiting-card:', error)
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
        return res.status(400).json({ error: 'Digital visiting card ID is required' })
      }

      // Get the digital visiting card to get storage path
      const { data: card, error: fetchError } = await supabaseAdmin
        .from('digital_visiting_card')
        .select('storage_path')
        .eq('id', id)
        .single()

      if (fetchError) {
        console.error('Error fetching digital visiting card:', fetchError)
        return res.status(404).json({ error: 'Digital visiting card not found' })
      }

      // Delete from storage
      const { error: storageError } = await supabaseAdmin.storage
        .from('digital-visiting-card')
        .remove([card.storage_path])

      if (storageError) {
        console.error('Error deleting file from storage:', storageError)
      }

      // Delete from database
      const { error: deleteError } = await supabaseAdmin
        .from('digital_visiting_card')
        .delete()
        .eq('id', id)

      if (deleteError) {
        console.error('Error deleting digital visiting card:', deleteError)
        return res.status(500).json({ error: 'Failed to delete digital visiting card' })
      }

      return res.status(200).json({ message: 'Digital visiting card deleted successfully' })
    } catch (error) {
      console.error('Error in DELETE /api/admin/digital-visiting-card:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
