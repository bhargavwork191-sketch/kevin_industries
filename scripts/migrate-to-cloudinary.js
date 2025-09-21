const fs = require('fs')
const path = require('path')
const { v2: cloudinary } = require('cloudinary')

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const IMAGES_FILE = path.join(process.cwd(), 'data', 'images.json')
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads')

async function migrateImagesToCloudinary() {
  try {
    console.log('Starting image migration to Cloudinary...')
    
    // Load existing images
    const images = JSON.parse(fs.readFileSync(IMAGES_FILE, 'utf8'))
    console.log(`Found ${images.length} images to migrate`)
    
    const migratedImages = []
    
    for (const image of images) {
      try {
        // Check if image already has cloudinaryId (already migrated)
        if (image.cloudinaryId) {
          console.log(`Image ${image.id} already migrated, skipping...`)
          migratedImages.push(image)
          continue
        }
        
        // Check if local file exists
        const localPath = path.join(process.cwd(), 'public', image.url)
        if (!fs.existsSync(localPath)) {
          console.log(`Local file not found for image ${image.id}, skipping...`)
          migratedImages.push(image)
          continue
        }
        
        console.log(`Migrating image ${image.id}...`)
        
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(localPath, {
          folder: 'kevin-industries',
          resource_type: 'auto',
          quality: 'auto',
          fetch_format: 'auto',
          public_id: `kevin-industries/image_${image.id}`
        })
        
        // Update image record
        const migratedImage = {
          ...image,
          url: result.secure_url,
          cloudinaryId: result.public_id
        }
        
        migratedImages.push(migratedImage)
        console.log(`Successfully migrated image ${image.id}`)
        
        // Delete local file after successful upload
        fs.unlinkSync(localPath)
        console.log(`Deleted local file for image ${image.id}`)
        
      } catch (error) {
        console.error(`Error migrating image ${image.id}:`, error)
        // Keep original image if migration fails
        migratedImages.push(image)
      }
    }
    
    // Save migrated images back to file
    fs.writeFileSync(IMAGES_FILE, JSON.stringify(migratedImages, null, 2))
    console.log('Migration completed successfully!')
    
  } catch (error) {
    console.error('Migration failed:', error)
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migrateImagesToCloudinary()
}

module.exports = migrateImagesToCloudinary
