const fs = require('fs')
const path = require('path')

// Load existing images data
const dataPath = path.join(process.cwd(), 'data', 'images.json')
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

// Update images with proper types
const updatedImages = data.images.map((image, index) => {
  let imageType = 'gallery' // default type
  
  // Determine type based on page and content
  if (image.page === 'home') {
    if (image.filename.includes('hero')) {
      imageType = 'carousel'
    } else {
      imageType = 'excellence'
    }
  } else if (image.page === 'gallery') {
    imageType = 'gallery'
  }
  
  // Add some sample carousel and excellence images
  if (index < 3) {
    imageType = 'carousel'
  } else if (index >= 3 && index < 6) {
    imageType = 'excellence'
  }
  
  return {
    ...image,
    type: imageType
  }
})

// Add some additional sample images for different types
const sampleImages = [
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
    filename: 'excellence-1.jpg',
    url: 'https://rxoepffotmzezbmjchan.supabase.co/storage/v1/object/public/kevin-industries-images/images/gallery/WhatsApp%20Image%202025-09-16%20at%209.06.02%20PM%20(1).jpeg',
    alt_text: 'Excellence in Manufacturing',
    page: 'home',
    section: 'excellence',
    type: 'excellence',
    width: null,
    height: null,
    file_size: 27655,
    mime_type: 'image/jpeg',
    storage_path: 'images/home/excellence-1.jpg',
    order_index: 0,
    is_active: true
  },
  {
    filename: 'excellence-2.jpg',
    url: 'https://rxoepffotmzezbmjchan.supabase.co/storage/v1/object/public/kevin-industries-images/images/gallery/WhatsApp%20Image%202025-09-16%20at%209.06.02%20PM.jpeg',
    alt_text: 'Precision Tooling Excellence',
    page: 'home',
    section: 'excellence',
    type: 'excellence',
    width: null,
    height: null,
    file_size: 30048,
    mime_type: 'image/jpeg',
    storage_path: 'images/home/excellence-2.jpg',
    order_index: 1,
    is_active: true
  },
  {
    filename: 'excellence-3.jpg',
    url: 'https://rxoepffotmzezbmjchan.supabase.co/storage/v1/object/public/kevin-industries-images/images/gallery/WhatsApp%20Image%202025-09-16%20at%209.06.03%20PM.jpeg',
    alt_text: 'Quality Manufacturing Excellence',
    page: 'home',
    section: 'excellence',
    type: 'excellence',
    width: null,
    height: null,
    file_size: 87569,
    mime_type: 'image/jpeg',
    storage_path: 'images/home/excellence-3.jpg',
    order_index: 2,
    is_active: true
  }
]

// Combine all images
const allImages = [...sampleImages, ...updatedImages]

// Update the data
const updatedData = {
  images: allImages,
  lastUpdated: new Date().toISOString()
}

// Save updated data
fs.writeFileSync(dataPath, JSON.stringify(updatedData, null, 2))

console.log('✅ Updated image data with types:')
console.log(`📊 Total images: ${allImages.length}`)
console.log(`🎠 Carousel images: ${allImages.filter(img => img.type === 'carousel').length}`)
console.log(`⭐ Excellence images: ${allImages.filter(img => img.type === 'excellence').length}`)
console.log(`🖼️ Gallery images: ${allImages.filter(img => img.type === 'gallery').length}`)
console.log('💾 Saved to data/images.json')
