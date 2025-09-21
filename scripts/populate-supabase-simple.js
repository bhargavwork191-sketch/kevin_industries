const { createClient } = require('@supabase/supabase-js')

// Simple UUID generator
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

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

async function populateDatabase() {
  try {
    console.log('🚀 Populating Supabase database with images...')

    // 1. Get all product images from storage
    console.log('📦 Getting images from storage...')
    const { data: storageFiles, error: listError } = await supabase.storage
      .from('kevin-industries-images')
      .list('images/gallery', {
        limit: 100,
        offset: 0
      })

    if (listError) {
      console.error('❌ Error listing storage files:', listError)
      return
    }

    console.log(`📸 Found ${storageFiles.length} images in storage`)

    // 2. Prepare image data for database (only required columns)
    const imagesToInsert = []

    // Add 5 carousel images
    const carouselImages = [
      {
        id: generateUUID(),
        type: 'gallery', // Using gallery type for carousel due to constraint
        url: '/images/hero.jpg',
        created_at: new Date().toISOString()
      },
      {
        id: generateUUID(),
        type: 'gallery', // Using gallery type for carousel due to constraint
        url: '/images/hero.svg',
        created_at: new Date().toISOString()
      },
      {
        id: generateUUID(),
        type: 'gallery', // Using gallery type for carousel due to constraint
        url: 'https://rxoepffotmzezbmjchan.supabase.co/storage/v1/object/public/kevin-industries-images/images/gallery/WhatsApp%20Image%202025-09-16%20at%209.06.02%20PM%20(1).jpeg',
        created_at: new Date().toISOString()
      },
      {
        id: generateUUID(),
        type: 'gallery', // Using gallery type for carousel due to constraint
        url: 'https://rxoepffotmzezbmjchan.supabase.co/storage/v1/object/public/kevin-industries-images/images/gallery/WhatsApp%20Image%202025-09-16%20at%209.06.02%20PM.jpeg',
        created_at: new Date().toISOString()
      },
      {
        id: generateUUID(),
        type: 'gallery', // Using gallery type for carousel due to constraint
        url: 'https://rxoepffotmzezbmjchan.supabase.co/storage/v1/object/public/kevin-industries-images/images/gallery/WhatsApp%20Image%202025-09-16%20at%209.06.03%20PM.jpeg',
        created_at: new Date().toISOString()
      }
    ]

    // Add 6 excellence images
    const excellenceImages = [
      {
        id: generateUUID(),
        type: 'excellence',
        url: 'https://rxoepffotmzezbmjchan.supabase.co/storage/v1/object/public/kevin-industries-images/images/gallery/WhatsApp%20Image%202025-09-16%20at%209.06.09%20PM%20(1).jpeg',
        created_at: new Date().toISOString()
      },
      {
        id: generateUUID(),
        type: 'excellence',
        url: 'https://rxoepffotmzezbmjchan.supabase.co/storage/v1/object/public/kevin-industries-images/images/gallery/WhatsApp%20Image%202025-09-16%20at%209.06.09%20PM%20(2).jpeg',
        created_at: new Date().toISOString()
      },
      {
        id: generateUUID(),
        type: 'excellence',
        url: 'https://rxoepffotmzezbmjchan.supabase.co/storage/v1/object/public/kevin-industries-images/images/gallery/WhatsApp%20Image%202025-09-16%20at%209.06.09%20PM%20(3).jpeg',
        created_at: new Date().toISOString()
      },
      {
        id: generateUUID(),
        type: 'excellence',
        url: 'https://rxoepffotmzezbmjchan.supabase.co/storage/v1/object/public/kevin-industries-images/images/gallery/WhatsApp%20Image%202025-09-16%20at%209.06.09%20PM%20(4).jpeg',
        created_at: new Date().toISOString()
      },
      {
        id: generateUUID(),
        type: 'excellence',
        url: 'https://rxoepffotmzezbmjchan.supabase.co/storage/v1/object/public/kevin-industries-images/images/gallery/WhatsApp%20Image%202025-09-16%20at%209.06.09%20PM%20(5).jpeg',
        created_at: new Date().toISOString()
      },
      {
        id: generateUUID(),
        type: 'excellence',
        url: 'https://rxoepffotmzezbmjchan.supabase.co/storage/v1/object/public/kevin-industries-images/images/gallery/WhatsApp%20Image%202025-09-16%20at%209.06.09%20PM.jpeg',
        created_at: new Date().toISOString()
      }
    ]

    // Add 12 gallery images (first 12 from storage)
    const galleryImages = storageFiles.slice(0, 12).map((file) => {
      const storagePath = `images/gallery/${file.name}`
      const { data: urlData } = supabase.storage
        .from('kevin-industries-images')
        .getPublicUrl(storagePath)

      return {
        id: generateUUID(),
        type: 'gallery',
        url: urlData.publicUrl,
        created_at: new Date().toISOString()
      }
    })

    // Combine all images
    const allImages = [...carouselImages, ...excellenceImages, ...galleryImages]

    console.log(`📊 Prepared ${allImages.length} images for database:`)
    console.log(`🎠 Carousel: ${carouselImages.length}`)
    console.log(`⭐ Excellence: ${excellenceImages.length}`)
    console.log(`🖼️ Gallery: ${galleryImages.length}`)

    // 3. Insert images into database
    console.log('💾 Inserting images into database...')
    
    // Insert in batches to avoid timeout
    const batchSize = 10
    for (let i = 0; i < allImages.length; i += batchSize) {
      const batch = allImages.slice(i, i + batchSize)
      
      const { data: insertData, error: insertError } = await supabase
        .from('images')
        .insert(batch)
        .select()

      if (insertError) {
        console.error(`❌ Error inserting batch ${Math.floor(i/batchSize) + 1}:`, insertError)
        continue
      }

      console.log(`✅ Inserted batch ${Math.floor(i/batchSize) + 1}: ${insertData.length} images`)
    }

    console.log('🎉 Database population complete!')
    console.log(`📊 Total images in database: ${allImages.length}`)
    console.log('🌐 You can now visit http://localhost:3003 to see the images')

  } catch (error) {
    console.error('❌ Population failed:', error)
  }
}

// Run the population
populateDatabase()
