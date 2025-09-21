# Kevin Industries - Image Persistence Guide

## Problem
When deploying new versions to Vercel, images uploaded through the admin panel are lost because Vercel's serverless functions don't have persistent file storage.

## Solution
This project now supports both local storage (for development) and Cloudinary cloud storage (for production) to ensure images persist across deployments.

## Setup Instructions

### 1. Create Cloudinary Account (Free)
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Get your credentials from the dashboard:
   - Cloud Name
   - API Key
   - API Secret

### 2. Configure Environment Variables
Add these to your Vercel environment variables:

```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Backup Current Images (Before First Deployment)
```bash
npm run backup
```

### 4. Deploy with Cloudinary
Once Cloudinary is configured, all new uploads will automatically go to cloud storage and persist across deployments.

## Available Scripts

### Backup Images
```bash
npm run backup
```
Creates a backup of all current images in `/backups/images-latest.json`

### Restore Images
```bash
npm run restore
```
Restores images from the latest backup

### Restore Specific Backup
```bash
npm run restore images-backup-2025-09-21T03-52-49-659Z.json
```

### Migrate to Cloudinary
```bash
npm run migrate-cloudinary
```
Migrates all existing local images to Cloudinary (requires Cloudinary setup)

## How It Works

### Development (Local)
- Images stored in `/public/uploads/`
- Metadata in `/data/images.json`
- Works without Cloudinary setup

### Production (Vercel + Cloudinary)
- Images uploaded to Cloudinary cloud storage
- Metadata still in `/data/images.json` (but this persists in Vercel)
- Images survive deployments and serverless function resets

### Hybrid Mode
- If Cloudinary is configured, new uploads go to cloud storage
- Existing local images continue to work
- Gradual migration as images are re-uploaded

## Deployment Checklist

### Before First Production Deployment:
1. ✅ Set up Cloudinary account
2. ✅ Add environment variables to Vercel
3. ✅ Run `npm run backup` to backup current images
4. ✅ Test upload functionality

### After Deployment:
1. ✅ Verify images are uploading to Cloudinary
2. ✅ Check that images persist after deployment
3. ✅ Test admin panel functionality

## Troubleshooting

### Images Not Persisting
- Check Cloudinary environment variables are set
- Verify Cloudinary account is active
- Check Vercel function logs for errors

### Upload Errors
- Check file size limits (10MB max)
- Verify Cloudinary API limits
- Check network connectivity

### Missing Images After Deployment
- Run `npm run restore` to restore from backup
- Check if images were migrated to Cloudinary
- Verify environment variables are correct

## File Structure
```
/backups/                    # Image backups
  ├── images-latest.json     # Latest backup
  └── images-backup-*.json   # Timestamped backups

/data/                       # Image metadata
  └── images.json           # Current image database

/public/uploads/            # Local images (development only)
  └── image_*.jpg          # Uploaded files

/scripts/                   # Utility scripts
  ├── backup-images.js     # Backup script
  ├── restore-images.js   # Restore script
  └── migrate-to-cloudinary.js # Migration script
```

## Benefits
- ✅ Images persist across deployments
- ✅ Automatic cloud storage
- ✅ Backup and restore capabilities
- ✅ Gradual migration support
- ✅ Development and production compatibility
- ✅ Free Cloudinary tier (25GB storage, 25GB bandwidth)
