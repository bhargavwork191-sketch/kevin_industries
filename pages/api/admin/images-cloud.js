import formidable from 'formidable'
import fs from 'fs'
import path from 'path'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// For persistent storage, we'll use Cloudinary + JSON file
const IMAGES_FILE = path.join(process.cwd(), 'data', 'images.json')

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data')
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

// Load images from file
function loadImages() {
  try {
    if (fs.existsSync(IMAGES_FILE)) {
      const data = fs.readFileSync(IMAGES_FILE, 'utf8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error loading images:', error)
  }
  return []
}

// Save images to file
function saveImages(images) {
  try {
    fs.writeFileSync(IMAGES_FILE, JSON.stringify(images, null, 2))
  } catch (error) {
    console.error('Error saving images:', error)
  }
}

// Configure API to not parse body
export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Get images for specific page or all images
    const { page } = req.query
    const images = loadImages()
    
    if (page) {
      const filteredImages = images.filter(img => img.page === page)
      // Sort by order if available
      filteredImages.sort((a, b) => (a.order || 0) - (b.order || 0))
      res.status(200).json(filteredImages)
    } else {
      res.status(200).json(images)
    }
  } 
  else if (req.method === 'POST') {
    // Upload new image to Cloudinary
    try {
      const form = formidable({
        keepExtensions: true,
        maxFileSize: 10 * 1024 * 1024, // 10MB limit
      })

      const [fields, files] = await form.parse(req)
      const image = files.image?.[0]
      const page = fields.page?.[0] || 'gallery'

      if (!image) {
        return res.status(400).json({ error: 'No image provided' })
      }

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(image.filepath, {
        folder: 'kevin-industries',
        resource_type: 'auto',
        quality: 'auto',
        fetch_format: 'auto'
      })

      // Generate unique ID
      const timestamp = Date.now()
      const filename = `image_${timestamp}`

      // Create image record
      const newImage = {
        id: timestamp,
        filename,
        url: result.secure_url,
        cloudinaryId: result.public_id,
        alt: `Uploaded image ${timestamp}`,
        page,
        uploadedAt: new Date().toISOString()
      }

      // Save to images file
      const images = loadImages()
      images.push(newImage)
      saveImages(images)

      res.status(200).json(newImage)
    } catch (error) {
      console.error('Error uploading image:', error)
      res.status(500).json({ error: 'Error uploading image' })
    }
  } 
  else if (req.method === 'DELETE') {
    // Delete image from Cloudinary and local record
    const { id } = req.query
    
    if (!id) {
      return res.status(400).json({ error: 'Image ID required' })
    }

    try {
      const images = loadImages()
      const imageIndex = images.findIndex(img => img.id == id)
      
      if (imageIndex === -1) {
        return res.status(404).json({ error: 'Image not found' })
      }

      const image = images[imageIndex]
      
      // Delete from Cloudinary if it has cloudinaryId
      if (image.cloudinaryId) {
        try {
          await cloudinary.uploader.destroy(image.cloudinaryId)
        } catch (cloudinaryError) {
          console.error('Error deleting from Cloudinary:', cloudinaryError)
          // Continue with local deletion even if Cloudinary fails
        }
      }

      // Remove from images array
      images.splice(imageIndex, 1)
      saveImages(images)

      res.status(200).json({ success: true })
    } catch (error) {
      console.error('Error deleting image:', error)
      res.status(500).json({ error: 'Error deleting image' })
    }
  } 
  else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
    res.status(405).json({ error: 'Method not allowed' })
  }
}
