const fs = require('fs')
const path = require('path')

const IMAGES_FILE = path.join(process.cwd(), 'data', 'images.json')
const BACKUP_DIR = path.join(process.cwd(), 'backups')

function restoreImages(backupFile = 'images-latest.json') {
  try {
    console.log(`Restoring images from ${backupFile}...`)
    
    const backupPath = path.join(BACKUP_DIR, backupFile)
    
    if (!fs.existsSync(backupPath)) {
      console.error(`Backup file not found: ${backupPath}`)
      return
    }
    
    // Load backup
    const images = JSON.parse(fs.readFileSync(backupPath, 'utf8'))
    
    // Restore to main images file
    fs.writeFileSync(IMAGES_FILE, JSON.stringify(images, null, 2))
    
    console.log(`Successfully restored ${images.length} images`)
    
  } catch (error) {
    console.error('Restore failed:', error)
  }
}

// Run restore if this file is executed directly
if (require.main === module) {
  const backupFile = process.argv[2] || 'images-latest.json'
  restoreImages(backupFile)
}

module.exports = restoreImages
