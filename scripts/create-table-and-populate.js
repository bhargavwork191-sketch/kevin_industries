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

async function createTableAndPopulate() {
  try {
    console.log('🚀 Setting up database and populating with images...')

    // 1. First, let's check if the table exists
    console.log('🔍 Checking if images table exists...')
    const { data: existingData, error: checkError } = await supabase
      .from('images')
      .select('id')
      .limit(1)

    if (checkError) {
      console.log('❌ Table does not exist. Please create it manually in Supabase dashboard.')
      console.log('📋 SQL to create the table:')
      console.log(`
        CREATE TABLE images (
          id BIGSERIAL PRIMARY KEY,
          filename TEXT NOT NULL,
          url TEXT NOT NULL,
          alt_text TEXT,
          page TEXT NOT NULL DEFAULT 'gallery',
          section TEXT,
          width INTEGER,
          height INTEGER,
          file_size BIGINT,
          mime_type TEXT,
          storage_path TEXT NOT NULL,
          order_index INTEGER DEFAULT 0,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `)
      console.log('🔗 Go to: https://supabase.com/dashboard/project/rxoepffotmzezbmjchan/editor')
      console.log('📝 Run the SQL above in the SQL Editor')
      console.log('⏳ Then run this script again')
      return
    }

    console.log('✅ Images table exists!')

    // 2. Create storage bucket if it doesn't exist
    console.log('📦 Checking storage bucket...')
    const { data: buckets } = await supabase.storage.listBuckets()
    const bucketExists = buckets.some(bucket => bucket.name === 'kevin-industries-images')
    
    if (!bucketExists) {
      console.log('📦 Creating storage bucket...')
      const { error: bucketError } = await supabase.storage.createBucket('kevin-industries-images', {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
        fileSizeLimit: 10485760 // 10MB
      })

      if (bucketError) {
        console.error('❌ Error creating bucket:', bucketError)
      } else {
        console.log('✅ Storage bucket created')
      }
    } else {
      console.log('✅ Storage bucket already exists')
    }

    // 3. Check if images already exist
    const { data: existingImages, error: countError } = await supabase
      .from('images')
      .select('id')
      .eq('page', 'gallery')

    if (countError) {
      console.error('❌ Error checking existing images:', countError)
      return
    }

    if (existingImages && existingImages.length > 0) {
      console.log(`✅ Database already has ${existingImages.length} images`)
      console.log('🌐 You can now visit http://localhost:3000 to see the images')
      return
    }

    // 4. Get all product images
    const productImagesDir = path.join(process.cwd(), 'public', 'product_images')
    const imageFiles = fs.readdirSync(productImagesDir)
      .filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
      .sort()

    console.log(`📸 Found ${imageFiles.length} product images`)

    // 5. Upload images to Supabase Storage and create database records
    const imagesToInsert = []
    
    for (let i = 0; i < imageFiles.length; i++) {
      const filename = imageFiles[i]
      const filePath = path.join(productImagesDir, filename)
      const fileBuffer = fs.readFileSync(filePath)
      
      console.log(`📤 Uploading ${filename}...`)
      
      // Upload to storage
      const storagePath = `images/gallery/${filename}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('kevin-industries-images')
        .upload(storagePath, fileBuffer, {
          contentType: 'image/jpeg',
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error(`❌ Error uploading ${filename}:`, uploadError)
        continue
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('kevin-industries-images')
        .getPublicUrl(storagePath)

      // Create database record
      const imageRecord = {
        filename: filename,
        url: urlData.publicUrl,
        alt_text: `Product Image ${i + 1}`,
        page: 'gallery',
        section: null,
        width: null,
        height: null,
        file_size: fileBuffer.length,
        mime_type: 'image/jpeg',
        storage_path: storagePath,
        order_index: i,
        is_active: true
      }

      imagesToInsert.push(imageRecord)
    }

    // 6. Insert all images into database
    if (imagesToInsert.length > 0) {
      console.log(`💾 Inserting ${imagesToInsert.length} images into database...`)
      
      const { data: insertData, error: insertError } = await supabase
        .from('images')
        .insert(imagesToInsert)
        .select()

      if (insertError) {
        console.error('❌ Error inserting images:', insertError)
        console.log('🔍 Error details:', JSON.stringify(insertError, null, 2))
      } else {
        console.log(`✅ Successfully inserted ${insertData.length} images`)
      }
    }

    // 7. Add some sample images for other pages
    console.log('🎨 Adding sample images for other pages...')
    
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

    const { data: sampleData, error: sampleError } = await supabase
      .from('images')
      .insert(sampleImages)
      .select()

    if (sampleError) {
      console.error('❌ Error inserting sample images:', sampleError)
    } else {
      console.log('✅ Added sample images for home page')
    }

    console.log('🎉 Database setup complete!')
    console.log(`📊 Total images in database: ${imagesToInsert.length + sampleImages.length}`)
    console.log('🌐 You can now visit http://localhost:3000 to see the images')

  } catch (error) {
    console.error('❌ Setup failed:', error)
  }
}

// Run the setup
createTableAndPopulate()
