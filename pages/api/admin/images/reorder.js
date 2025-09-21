import fs from 'fs'
import path from 'path'

// For now, we'll store images in a simple JSON file
// In production, you'd use a proper database
const IMAGES_FILE = path.join(process.cwd(), 'data', 'images.json')

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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { page, images: reorderData } = req.body

    if (!page || !reorderData) {
      return res.status(400).json({ error: 'Page and images data required' })
    }

    const allImages = loadImages()
    
    // Update order for images of the specified page
    reorderData.forEach(({ id, order }) => {
      const imageIndex = allImages.findIndex(img => img.id === id && img.page === page)
      if (imageIndex !== -1) {
        allImages[imageIndex].order = order
      }
    })

    // Sort all images by page and order
    allImages.sort((a, b) => {
      if (a.page !== b.page) return a.page.localeCompare(b.page)
      return (a.order || 0) - (b.order || 0)
    })

    saveImages(allImages)

    res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error reordering images:', error)
    res.status(500).json({ error: 'Error reordering images' })
  }
}
