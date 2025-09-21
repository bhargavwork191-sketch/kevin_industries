const fs = require('fs')
const path = require('path')

const IMAGES_FILE = path.join(process.cwd(), 'data', 'images.json')
const BACKUP_DIR = path.join(process.cwd(), 'backups')

// Ensure backup directory exists
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true })
}

function backupImages() {
  try {
    console.log('Creating image backup...')
    
    // Load current images
    const images = JSON.parse(fs.readFileSync(IMAGES_FILE, 'utf8'))
    
    // Create backup filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const backupFile = path.join(BACKUP_DIR, `images-backup-${timestamp}.json`)
    
    // Save backup
    fs.writeFileSync(backupFile, JSON.stringify(images, null, 2))
    
    console.log(`Backup created: ${backupFile}`)
    console.log(`Backed up ${images.length} images`)
    
    // Also create a latest backup
    const latestBackup = path.join(BACKUP_DIR, 'images-latest.json')
    fs.writeFileSync(latestBackup, JSON.stringify(images, null, 2))
    
    console.log(`Latest backup updated: ${latestBackup}`)
    
  } catch (error) {
    console.error('Backup failed:', error)
  }
}

// Run backup if this file is executed directly
if (require.main === module) {
  backupImages()
}

module.exports = backupImages
