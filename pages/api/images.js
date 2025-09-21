import { supabaseAdmin } from '../../lib/supabaseServer'
import fs from 'fs'
import path from 'path'

// Load images from JSON file as fallback
function loadImagesFromFile() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'images.json')
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8')
      const parsed = JSON.parse(data)
      return parsed.images || []
    }
  } catch (error) {
    console.error('Error loading images from file:', error)
  }
  return []
}

export default async function handler(req, res) {
  try {
    const { page = 'gallery', section, type } = req.query
    
    console.log('API request:', { page, section, type })
    
    // Use database if Supabase is configured
    if (supabaseAdmin) {
      try {
        let query = supabaseAdmin
          .from('images')
          .select('*')
          .order('created_at', { ascending: true })
        
        // Only filter by type since page column doesn't exist
        if (type) {
          query = query.eq('type', type)
        }

        const { data, error } = await query

        if (!error && data) {
          console.log(`Database returned ${data.length} images for type: ${type}`)
          return res.status(200).json(data)
        } else {
          console.log('Database error:', error)
        }
      } catch (dbError) {
        console.log('Database query failed:', dbError.message)
      }
    }

    // Fallback to JSON file only if database fails
    const images = loadImagesFromFile()
    const filteredImages = images.filter(img => {
      if (page && img.page !== page) return false
      if (section && img.section !== section) return false
      if (type && img.type !== type) return false
      return true
    })

    // Sort by order_index
    filteredImages.sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
    
    res.status(200).json(filteredImages)
  } catch (error) {
    console.error('Error in /api/images:', error)
    // Return empty array if there's any error
    res.status(200).json([])
  }
}
