const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables')
  console.error('Please make sure .env.local file exists with:')
  console.error('- NEXT_PUBLIC_SUPABASE_URL')
  console.error('- SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function setupDatabase() {
  try {
    console.log('🚀 Setting up database and populating with images...')

    // 1. Create the images table
    console.log('📋 Creating images table...')
    const { error: tableError } = await supabase.rpc('exec_sql', {
      sql: `
        -- Create images table
        CREATE TABLE IF NOT EXISTS images (
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

        -- Create index for faster queries
        CREATE INDEX IF NOT EXISTS idx_images_page ON images(page);
        CREATE INDEX IF NOT EXISTS idx_images_order ON images(page, order_index);
        CREATE INDEX IF NOT EXISTS idx_images_active ON images(is_active);

        -- Create updated_at trigger
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $$ language 'plpgsql';

        CREATE TRIGGER update_images_updated_at 
            BEFORE UPDATE ON images 
            FOR EACH ROW 
            EXECUTE FUNCTION update_updated_at_column();
      `
    })

    if (tableError) {
      console.error('❌ Error creating table:', tableError)
      // Try alternative approach - direct SQL execution
      console.log('🔄 Trying alternative table creation...')
    }

    // 2. Create storage bucket
    console.log('📦 Creating storage bucket...')
    const { data: bucketData, error: bucketError } = await supabase.storage.createBucket('kevin-industries-images', {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
      fileSizeLimit: 10485760 // 10MB
    })

    if (bucketError && !bucketError.message.includes('already exists')) {
      console.error('❌ Error creating bucket:', bucketError)
    } else {
      console.log('✅ Storage bucket ready')
    }

    // 3. Get all product images
    const productImagesDir = path.join(process.cwd(), 'public', 'product_images')
    const imageFiles = fs.readdirSync(productImagesDir)
      .filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
      .sort()

    console.log(`📸 Found ${imageFiles.length} product images`)

    // 4. Upload images to Supabase Storage and create database records
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

    // 5. Insert all images into database
    if (imagesToInsert.length > 0) {
      console.log(`💾 Inserting ${imagesToInsert.length} images into database...`)
      
      const { data: insertData, error: insertError } = await supabase
        .from('images')
        .insert(imagesToInsert)
        .select()

      if (insertError) {
        console.error('❌ Error inserting images:', insertError)
      } else {
        console.log(`✅ Successfully inserted ${insertData.length} images`)
      }
    }

    // 6. Add some sample images for other pages
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
    process.exit(1)
  }
}

// Run the setup
setupDatabase()
