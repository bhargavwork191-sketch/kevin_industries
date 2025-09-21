import formidable from 'formidable'
import fs from 'fs'
import path from 'path'
import { supabaseAdmin } from '../../../lib/supabaseServer'

// Helper function to get file extension
function getFileExtension(filename) {
  return path.extname(filename || '').toLowerCase()
}

// Helper function to generate unique filename
function generateFilename(originalFilename) {
  const timestamp = Date.now()
  const ext = getFileExtension(originalFilename)
  return `image_${timestamp}${ext}`
}

// Load images from JSON file
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

// Save images to JSON file
function saveImagesToFile(images) {
  try {
    const dataDir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    const filePath = path.join(dataDir, 'images.json')
    const data = {
      images: images,
      lastUpdated: new Date().toISOString()
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error saving images to file:', error)
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
    try {
      const { page, type } = req.query
      
      // Try database first if Supabase is configured
      if (supabaseAdmin) {
        try {
        let query = supabaseAdmin
          .from('images')
          .select('*')
          .order('created_at', { ascending: true })
        
        if (type) {
          query = query.eq('type', type)
        }
          
          const { data, error } = await query
          
          if (!error && data) {
            return res.status(200).json(data)
          }
        } catch (dbError) {
          console.log('Database query failed, falling back to JSON file:', dbError.message)
        }
      }

      // Fallback to JSON file
      const images = loadImagesFromFile()
      let filteredImages = images
      
      if (page) {
        filteredImages = filteredImages.filter(img => img.page === page)
      }
      
      if (type) {
        filteredImages = filteredImages.filter(img => img.type === type)
      }
      
      // Sort by order_index
      filteredImages.sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
      
      res.status(200).json(filteredImages)
    } catch (error) {
      console.error('Error in GET /api/admin/images:', error)
      res.status(200).json([])
    }
  } 
  else if (req.method === 'POST') {
    // Upload new image
    try {
      console.log('📤 Starting image upload...')
      
      const form = formidable({
        keepExtensions: true,
        maxFileSize: 10 * 1024 * 1024, // 10MB limit
      })

      const [fields, files] = await form.parse(req)
      console.log('📋 Parsed fields:', fields)
      console.log('📁 Parsed files:', files)
      
      const image = files.image?.[0]
      const type = fields.type?.[0] || 'gallery'
      
      console.log('🖼️ Image:', image)
      console.log('🏷️ Type:', type)

      if (!image) {
        console.log('❌ No image provided')
        return res.status(400).json({ error: 'No image provided' })
      }

      // Generate unique ID
      const timestamp = Date.now()
      const filename = `image_${timestamp}`
      
      // Generate UUID for database
      const generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0
          const v = c === 'x' ? r : (r & 0x3 | 0x8)
          return v.toString(16)
        })
      }
      const uuid = generateUUID()

      let imageUrl, cloudinaryId = null

      // Try Cloudinary first if configured
      if (process.env.CLOUDINARY_CLOUD_NAME) {
        try {
          const result = await cloudinary.uploader.upload(image.filepath, {
            folder: 'kevin-industries',
            resource_type: 'auto',
            quality: 'auto',
            fetch_format: 'auto',
            public_id: `kevin-industries/${filename}`
          })
          imageUrl = result.secure_url
          cloudinaryId = result.public_id
        } catch (cloudinaryError) {
          console.error('Cloudinary upload failed, falling back to local storage:', cloudinaryError)
        }
      }

      // Fallback to local storage if Cloudinary fails or not configured
      if (!imageUrl) {
        // In production (Vercel), require Cloudinary
        if (process.env.VERCEL) {
          return res.status(500).json({ 
            error: 'Cloudinary is required for production uploads. Please configure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables.' 
          })
        }
        
        console.log('📁 Using local storage...')
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
        console.log('📂 Uploads directory:', uploadsDir)
        
        if (!fs.existsSync(uploadsDir)) {
          console.log('📁 Creating uploads directory...')
          fs.mkdirSync(uploadsDir, { recursive: true })
        }

        const ext = path.extname(image.originalFilename || '')
        const localFilename = `${filename}${ext}`
        const newPath = path.join(uploadsDir, localFilename)

        console.log('📄 Original filename:', image.originalFilename)
        console.log('📄 Local filename:', localFilename)
        console.log('📄 New path:', newPath)
        console.log('📄 Source filepath:', image.filepath)

        // Move file to final location
        try {
          fs.renameSync(image.filepath, newPath)
          imageUrl = `/uploads/${localFilename}`
          console.log('✅ File moved successfully to:', imageUrl)
        } catch (moveError) {
          console.error('❌ Error moving file:', moveError)
          throw moveError
        }
      }

      // Create image record
      const newImage = {
        id: timestamp,
        filename,
        url: imageUrl,
        cloudinaryId,
        alt: `Uploaded image ${timestamp}`,
        type,
        uploadedAt: new Date().toISOString()
      }

      console.log('💾 Created image record:', newImage)

      // Try to save to database first
      if (supabaseAdmin) {
        try {
          console.log('🗄️ Saving to database...')
          const { error: dbError } = await supabaseAdmin
            .from('images')
            .insert([{
              id: uuid,
              type: type,
              url: imageUrl,
              created_at: new Date().toISOString()
            }])
          
          if (dbError) {
            console.error('❌ Database insert error:', dbError)
            // Fall back to JSON file
          } else {
            console.log('✅ Successfully saved to database')
            return res.status(200).json(newImage)
          }
        } catch (dbError) {
          console.error('❌ Database connection error:', dbError)
          // Fall back to JSON file
        }
      }

      // Fallback: Save to JSON file
      console.log('📄 Saving to JSON file as fallback...')
      const images = loadImagesFromFile()
      images.push(newImage)
      saveImagesToFile(images)

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
      // Try to delete from database first
      if (supabaseAdmin) {
        try {
          const { error: dbError } = await supabaseAdmin
            .from('images')
            .delete()
            .eq('id', id)
          
          if (dbError) {
            console.error('Database delete error:', dbError)
            // Fall back to JSON file deletion
          } else {
            console.log('Successfully deleted from database')
            return res.status(200).json({ success: true })
          }
        } catch (dbError) {
          console.error('Database connection error:', dbError)
          // Fall back to JSON file deletion
        }
      }

      // Fallback: Delete from JSON file
      const images = loadImagesFromFile()
      const imageIndex = images.findIndex(img => img.id == id)
      
      if (imageIndex === -1) {
        return res.status(404).json({ error: 'Image not found' })
      }

      const image = images[imageIndex]
      
      // Delete from Cloudinary if it has cloudinaryId
      if (image.cloudinaryId && process.env.CLOUDINARY_CLOUD_NAME) {
        try {
          await cloudinary.uploader.destroy(image.cloudinaryId)
        } catch (cloudinaryError) {
          console.error('Error deleting from Cloudinary:', cloudinaryError)
          // Continue with local deletion even if Cloudinary fails
        }
      }
      
      // Delete local file if it exists
      if (image.url.startsWith('/uploads/')) {
        const filePath = path.join(process.cwd(), 'public', image.url)
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
        }
      }

      // Remove from images array
      images.splice(imageIndex, 1)
      saveImagesToFile(images)

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