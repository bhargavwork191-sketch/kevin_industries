const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function populateFromStorage() {
  try {
    console.log('🚀 Populating database from existing storage...')

    // 1. List all files in the storage bucket
    console.log('📦 Listing files in storage...')
    const { data: files, error: listError } = await supabase.storage
      .from('kevin-industries-images')
      .list('images/gallery', {
        limit: 100,
        offset: 0
      })

    if (listError) {
      console.error('❌ Error listing files:', listError)
      return
    }

    console.log(`📸 Found ${files.length} files in storage`)

    // 2. Create image records for each file
    const imagesToInsert = []
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const filename = file.name
      const storagePath = `images/gallery/${filename}`
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from('kevin-industries-images')
        .getPublicUrl(storagePath)

      console.log(`📝 Creating record for ${filename}...`)

      // Create database record
      const imageRecord = {
        filename: filename,
        url: urlData.publicUrl,
        alt_text: `Product Image ${i + 1}`,
        page: 'gallery',
        section: null,
        width: null,
        height: null,
        file_size: file.metadata?.size || 0,
        mime_type: 'image/jpeg',
        storage_path: storagePath,
        order_index: i,
        is_active: true
      }

      imagesToInsert.push(imageRecord)
    }

    // 3. Save to JSON file for now (since database table doesn't exist)
    const imagesData = {
      images: imagesToInsert,
      lastUpdated: new Date().toISOString()
    }

    const dataDir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    fs.writeFileSync(
      path.join(dataDir, 'images.json'),
      JSON.stringify(imagesData, null, 2)
    )

    console.log(`💾 Saved ${imagesToInsert.length} image records to data/images.json`)

    // 4. Add some sample images for other pages
    const sampleImages = [
      {
        filename: 'hero.jpg',
        url: '/images/hero.jpg',
        alt_text: 'Manufacturing Excellence',
        page: 'home',
        section: null,
        width: null,
        height: null,
        file_size: 0,
        mime_type: 'image/jpeg',
        storage_path: 'images/home/hero.jpg',
        order_index: 0,
        is_active: true
      },
      {
        filename: 'hero.svg',
        url: '/images/hero.svg',
        alt_text: 'Precision Engineering',
        page: 'home',
        section: null,
        width: null,
        height: null,
        file_size: 0,
        mime_type: 'image/svg+xml',
        storage_path: 'images/home/hero.svg',
        order_index: 1,
        is_active: true
      }
    ]

    // Add sample images to the data
    const allImages = [...imagesToInsert, ...sampleImages]
    const allImagesData = {
      images: allImages,
      lastUpdated: new Date().toISOString()
    }

    fs.writeFileSync(
      path.join(dataDir, 'images.json'),
      JSON.stringify(allImagesData, null, 2)
    )

    console.log('✅ Added sample images for home page')
    console.log('🎉 Database population complete!')
    console.log(`📊 Total images: ${allImages.length}`)
    console.log('🌐 You can now visit http://localhost:3000 to see the images')

  } catch (error) {
    console.error('❌ Population failed:', error)
  }
}

// Run the population
populateFromStorage()
