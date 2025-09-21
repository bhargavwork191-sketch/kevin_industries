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

async function setupSimple() {
  try {
    console.log('🚀 Setting up database with simple approach...')

    // 1. Create storage bucket if it doesn't exist
    console.log('📦 Setting up storage...')
    const { data: buckets } = await supabase.storage.listBuckets()
    const bucketExists = buckets.some(bucket => bucket.name === 'kevin-industries-images')
    
    if (!bucketExists) {
      const { error: bucketError } = await supabase.storage.createBucket('kevin-industries-images', {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
        fileSizeLimit: 10485760
      })

      if (bucketError) {
        console.error('❌ Error creating bucket:', bucketError)
      } else {
        console.log('✅ Storage bucket created')
      }
    } else {
      console.log('✅ Storage bucket already exists')
    }

    // 2. Get all product images
    const productImagesDir = path.join(process.cwd(), 'public', 'product_images')
    const imageFiles = fs.readdirSync(productImagesDir)
      .filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
      .sort()

    console.log(`📸 Found ${imageFiles.length} product images`)

    // 3. Upload images to Supabase Storage
    const uploadedImages = []
    
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

      uploadedImages.push({
        filename: filename,
        url: urlData.publicUrl,
        alt_text: `Product Image ${i + 1}`,
        page: 'gallery',
        order_index: i
      })
    }

    console.log(`✅ Successfully uploaded ${uploadedImages.length} images to storage`)

    // 4. Create a JSON file with the image data for now
    const imagesData = {
      images: uploadedImages,
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

    console.log('💾 Saved image data to data/images.json')
    console.log('🎉 Setup complete!')
    console.log('🌐 You can now visit http://localhost:3000 to see the images')
    console.log('📝 Note: Images are stored in Supabase Storage and metadata in JSON file')

  } catch (error) {
    console.error('❌ Setup failed:', error)
  }
}

// Run the setup
setupSimple()
