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

    // 2. Prepare image data for database
    const imagesToInsert = []

    // Add 5 carousel images
    const carouselImages = [
      {
        filename: 'carousel-1.jpg',
        url: '/images/hero.jpg',
        alt_text: 'Manufacturing Excellence - Carousel',
        page: 'home',
        section: 'carousel',
        type: 'carousel',
        width: null,
        height: null,
        file_size: 0,
        mime_type: 'image/jpeg',
        storage_path: 'images/home/carousel-1.jpg',
        order_index: 0,
        is_active: true
      },
      {
        filename: 'carousel-2.svg',
        url: '/images/hero.svg',
        alt_text: 'Precision Engineering - Carousel',
        page: 'home',
        section: 'carousel',
        type: 'carousel',
        width: null,
        height: null,
        file_size: 0,
        mime_type: 'image/svg+xml',
        storage_path: 'images/home/carousel-2.svg',
        order_index: 1,
        is_active: true
      },
      {
        filename: 'carousel-3.jpg',
        url: 'https://rxoepffotmzezbmjchan.supabase.co/storage/v1/object/public/kevin-industries-images/images/gallery/WhatsApp%20Image%202025-09-16%20at%209.06.02%20PM%20(1).jpeg',
        alt_text: 'Advanced Manufacturing - Carousel',
        page: 'home',
        section: 'carousel',
        type: 'carousel',
        width: null,
        height: null,
        file_size: 27655,
        mime_type: 'image/jpeg',
        storage_path: 'images/home/carousel-3.jpg',
        order_index: 2,
        is_active: true
      },
      {
        filename: 'carousel-4.jpg',
        url: 'https://rxoepffotmzezbmjchan.supabase.co/storage/v1/object/public/kevin-industries-images/images/gallery/WhatsApp%20Image%202025-09-16%20at%209.06.02%20PM.jpeg',
        alt_text: 'Quality Manufacturing - Carousel',
        page: 'home',
        section: 'carousel',
        type: 'carousel',
        width: null,
        height: null,
        file_size: 30048,
        mime_type: 'image/jpeg',
        storage_path: 'images/home/carousel-4.jpg',
        order_index: 3,
        is_active: true
      },
      {
        filename: 'carousel-5.jpg',
        url: 'https://rxoepffotmzezbmjchan.supabase.co/storage/v1/object/public/kevin-industries-images/images/gallery/WhatsApp%20Image%202025-09-16%20at%209.06.03%20PM.jpeg',
        alt_text: 'Precision Tooling - Carousel',
        page: 'home',
        section: 'carousel',
        type: 'carousel',
        width: null,
        height: null,
        file_size: 87569,
        mime_type: 'image/jpeg',
        storage_path: 'images/home/carousel-5.jpg',
        order_index: 4,
        is_active: true
      }
    ]

    // Add 6 excellence images
    const excellenceImages = [
      {
        filename: 'excellence-1.jpg',
        url: 'https://rxoepffotmzezbmjchan.supabase.co/storage/v1/object/public/kevin-industries-images/images/gallery/WhatsApp%20Image%202025-09-16%20at%209.06.09%20PM%20(1).jpeg',
        alt_text: 'Excellence in Manufacturing',
        page: 'home',
        section: 'excellence',
        type: 'excellence',
        width: null,
        height: null,
        file_size: 0,
        mime_type: 'image/jpeg',
        storage_path: 'images/home/excellence-1.jpg',
        order_index: 0,
        is_active: true
      },
      {
        filename: 'excellence-2.jpg',
        url: 'https://rxoepffotmzezbmjchan.supabase.co/storage/v1/object/public/kevin-industries-images/images/gallery/WhatsApp%20Image%202025-09-16%20at%209.06.09%20PM%20(2).jpeg',
        alt_text: 'Precision Tooling Excellence',
        page: 'home',
        section: 'excellence',
        type: 'excellence',
        width: null,
        height: null,
        file_size: 0,
        mime_type: 'image/jpeg',
        storage_path: 'images/home/excellence-2.jpg',
        order_index: 1,
        is_active: true
      },
      {
        filename: 'excellence-3.jpg',
        url: 'https://rxoepffotmzezbmjchan.supabase.co/storage/v1/object/public/kevin-industries-images/images/gallery/WhatsApp%20Image%202025-09-16%20at%209.06.09%20PM%20(3).jpeg',
        alt_text: 'Quality Manufacturing Excellence',
        page: 'home',
        section: 'excellence',
        type: 'excellence',
        width: null,
        height: null,
        file_size: 0,
        mime_type: 'image/jpeg',
        storage_path: 'images/home/excellence-3.jpg',
        order_index: 2,
        is_active: true
      },
      {
        filename: 'excellence-4.jpg',
        url: 'https://rxoepffotmzezbmjchan.supabase.co/storage/v1/object/public/kevin-industries-images/images/gallery/WhatsApp%20Image%202025-09-16%20at%209.06.09%20PM%20(4).jpeg',
        alt_text: 'Advanced Casting Excellence',
        page: 'home',
        section: 'excellence',
        type: 'excellence',
        width: null,
        height: null,
        file_size: 0,
        mime_type: 'image/jpeg',
        storage_path: 'images/home/excellence-4.jpg',
        order_index: 3,
        is_active: true
      },
      {
        filename: 'excellence-5.jpg',
        url: 'https://rxoepffotmzezbmjchan.supabase.co/storage/v1/object/public/kevin-industries-images/images/gallery/WhatsApp%20Image%202025-09-16%20at%209.06.09%20PM%20(5).jpeg',
        alt_text: 'Precision Machining Excellence',
        page: 'home',
        section: 'excellence',
        type: 'excellence',
        width: null,
        height: null,
        file_size: 0,
        mime_type: 'image/jpeg',
        storage_path: 'images/home/excellence-5.jpg',
        order_index: 4,
        is_active: true
      },
      {
        filename: 'excellence-6.jpg',
        url: 'https://rxoepffotmzezbmjchan.supabase.co/storage/v1/object/public/kevin-industries-images/images/gallery/WhatsApp%20Image%202025-09-16%20at%209.06.09%20PM.jpeg',
        alt_text: 'Manufacturing Excellence Showcase',
        page: 'home',
        section: 'excellence',
        type: 'excellence',
        width: null,
        height: null,
        file_size: 0,
        mime_type: 'image/jpeg',
        storage_path: 'images/home/excellence-6.jpg',
        order_index: 5,
        is_active: true
      }
    ]

    // Add 12 gallery images (first 12 from storage)
    const galleryImages = storageFiles.slice(0, 12).map((file, index) => {
      const storagePath = `images/gallery/${file.name}`
      const { data: urlData } = supabase.storage
        .from('kevin-industries-images')
        .getPublicUrl(storagePath)

      return {
        filename: file.name,
        url: urlData.publicUrl,
        alt_text: `Product Image ${index + 1}`,
        page: 'gallery',
        section: null,
        type: 'gallery',
        width: null,
        height: null,
        file_size: file.metadata?.size || 0,
        mime_type: 'image/jpeg',
        storage_path: storagePath,
        order_index: index,
        is_active: true
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
