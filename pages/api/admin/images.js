import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

// For Vercel compatibility, we'll use a different approach
// Store images data in memory or use external storage
let imagesData = []

// In production, you should use a proper database like Supabase, MongoDB, etc.
// For now, we'll use a simple in-memory store that resets on each deployment
// This is NOT suitable for production - use a real database!

// Load images from memory (resets on each deployment)
function loadImages() {
  return imagesData || []
}

// Save images to memory
function saveImages(images) {
  imagesData = images
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
    // Upload new image
    try {
      const form = formidable({
        // Don't save to filesystem in Vercel
        keepExtensions: true,
        maxFileSize: 10 * 1024 * 1024, // 10MB limit
      })

      const [fields, files] = await form.parse(req)
      const image = files.image?.[0]
      const page = fields.page?.[0] || 'gallery'

      if (!image) {
        return res.status(400).json({ error: 'No image provided' })
      }

      // Read the file content
      const fileContent = fs.readFileSync(image.filepath)
      const base64Content = fileContent.toString('base64')
      
      // Generate unique filename
      const timestamp = Date.now()
      const ext = path.extname(image.originalFilename || '')
      const filename = `image_${timestamp}${ext}`

      // Create image record with base64 data
      const newImage = {
        id: timestamp,
        filename,
        url: `data:image/${ext.slice(1)};base64,${base64Content}`,
        alt: `Uploaded image ${timestamp}`,
        page,
        uploadedAt: new Date().toISOString()
      }

      // Save to memory
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
    // Delete image
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

      // Remove from images array (no file to delete since we're using base64)
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