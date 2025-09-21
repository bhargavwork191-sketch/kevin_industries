#!/usr/bin/env node

/**
 * Script to migrate local images to Cloudinary
 * Run this script to upload all existing local images to Cloudinary
 * and update the database with Cloudinary URLs
 */

const cloudinary = require('cloudinary').v2
const fs = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Configure Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function migrateImages() {
  console.log('🚀 Starting image migration to Cloudinary...')
  
  // Check if Cloudinary is configured
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    console.error('❌ Cloudinary not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env.local')
    process.exit(1)
  }

  try {
    // Get all images from database
    const { data: images, error: fetchError } = await supabase
      .from('images')
      .select('*')
      .order('created_at', { ascending: true })

    if (fetchError) {
      console.error('❌ Error fetching images from database:', fetchError)
      return
    }

    console.log(`📊 Found ${images.length} images to migrate`)

    let successCount = 0
    let errorCount = 0

    for (const image of images) {
      try {
        // Skip if already using Cloudinary URL
        if (image.url.includes('cloudinary.com')) {
          console.log(`⏭️  Skipping ${image.filename} (already on Cloudinary)`)
          continue
        }

        // Skip if local file doesn't exist
        const localPath = path.join(process.cwd(), 'public', image.url)
        if (!fs.existsSync(localPath)) {
          console.log(`⚠️  Local file not found: ${image.url}`)
          continue
        }

        console.log(`📤 Uploading ${image.filename} to Cloudinary...`)

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(localPath, {
          folder: 'kevin-industries',
          resource_type: 'auto',
          quality: 'auto',
          fetch_format: 'auto',
          public_id: `kevin-industries/${image.filename}`
        })

        // Update database with Cloudinary URL
        const { error: updateError } = await supabase
          .from('images')
          .update({ 
            url: result.secure_url,
            cloudinary_id: result.public_id
          })
          .eq('id', image.id)

        if (updateError) {
          console.error(`❌ Error updating database for ${image.filename}:`, updateError)
          errorCount++
        } else {
          console.log(`✅ Successfully migrated ${image.filename}`)
          successCount++
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100))

      } catch (error) {
        console.error(`❌ Error migrating ${image.filename}:`, error.message)
        errorCount++
      }
    }

    console.log('\n📊 Migration Summary:')
    console.log(`✅ Successfully migrated: ${successCount} images`)
    console.log(`❌ Failed migrations: ${errorCount} images`)
    console.log(`📊 Total processed: ${images.length} images`)

  } catch (error) {
    console.error('❌ Migration failed:', error)
  }
}

// Run migration
migrateImages()
  .then(() => {
    console.log('🎉 Migration completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Migration failed:', error)
    process.exit(1)
  })