const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function migrateImages() {
  console.log('Starting image migration to Supabase...')

  try {
    // Read existing images data
    const imagesFile = path.join(process.cwd(), 'data', 'images.json')
    if (!fs.existsSync(imagesFile)) {
      console.log('No existing images data found')
      return
    }

    const existingImages = JSON.parse(fs.readFileSync(imagesFile, 'utf8'))
    console.log(`Found ${existingImages.length} existing images to migrate`)

    // Migrate each image
    for (const imageData of existingImages) {
      try {
        console.log(`Migrating image: ${imageData.filename}`)

        // Determine file path
        let filePath
        if (imageData.url.startsWith('/uploads/')) {
          filePath = path.join(process.cwd(), 'public', imageData.url)
        } else if (imageData.url.startsWith('/product_images/')) {
          filePath = path.join(process.cwd(), 'public', imageData.url)
        } else {
          console.log(`Skipping image with URL: ${imageData.url}`)
          continue
        }

        if (!fs.existsSync(filePath)) {
          console.log(`File not found: ${filePath}`)
          continue
        }

        // Read file
        const fileBuffer = fs.readFileSync(filePath)
        
        // Get image metadata
        let width = null, height = null, mimeType = 'image/jpeg'
        try {
          const metadata = await sharp(fileBuffer).metadata()
          width = metadata.width
          height = metadata.height
          mimeType = metadata.format ? `image/${metadata.format}` : 'image/jpeg'
        } catch (sharpError) {
          console.warn(`Could not get metadata for ${imageData.filename}:`, sharpError.message)
        }

        // Generate storage path
        const ext = path.extname(imageData.filename)
        const storagePath = `images/${imageData.page}/${imageData.filename}`

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('kevin-industries-images')
          .upload(storagePath, fileBuffer, {
            contentType: mimeType,
            cacheControl: '3600',
            upsert: false
          })

        if (uploadError) {
          console.error(`Upload error for ${imageData.filename}:`, uploadError)
          continue
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('kevin-industries-images')
          .getPublicUrl(storagePath)

        // Create database record
        const { data: dbData, error: dbError } = await supabase
          .from('images')
          .insert({
            filename: imageData.filename,
            url: urlData.publicUrl,
            alt_text: imageData.alt || `Uploaded image ${imageData.id}`,
            page: imageData.page || 'gallery',
            section: imageData.section || null,
            width,
            height,
            file_size: fileBuffer.length,
            mime_type: mimeType,
            storage_path: storagePath,
            order_index: imageData.order || 0,
            is_active: true
          })
          .select()
          .single()

        if (dbError) {
          console.error(`Database error for ${imageData.filename}:`, dbError)
          // Clean up uploaded file
          await supabase.storage
            .from('kevin-industries-images')
            .remove([storagePath])
          continue
        }

        console.log(`✅ Successfully migrated: ${imageData.filename}`)
      } catch (error) {
        console.error(`Error migrating ${imageData.filename}:`, error)
      }
    }

    console.log('Image migration completed!')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

// Run migration
migrateImages()
