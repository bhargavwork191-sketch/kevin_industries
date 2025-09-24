# Production Setup Guide

## Image Upload Issue Fix

The image upload functionality works locally but fails in production because production environments (like Vercel) don't support local file storage. Images need to be stored in a cloud service.

## Required Setup for Production

### 1. Cloudinary Account Setup

1. Go to [Cloudinary.com](https://cloudinary.com) and create a free account
2. After signing up, go to your Dashboard
3. Copy the following values from your Dashboard:
   - Cloud Name
   - API Key
   - API Secret

### 2. Environment Variables

Add these environment variables to your production deployment (Vercel):

```bash
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 3. Vercel Deployment

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add the three Cloudinary variables above
5. Redeploy your project

### 4. Local Development

For local development, create a `.env.local` file:

```bash
# Copy from env.template and add your values
cp env.template .env.local
```

Then edit `.env.local` and add your Cloudinary credentials.

## How It Works

- **Local Development**: Uses local file storage (`/public/uploads/`)
- **Production**: Uses Cloudinary for image storage
- **Database**: Stores image metadata and Cloudinary URLs
- **Fallback**: If Cloudinary fails in production, upload will return an error

## Testing

After setting up Cloudinary:

1. Deploy to production
2. Try uploading an image through the admin panel
3. Check that images appear correctly on all pages
4. Verify images are accessible via Cloudinary URLs

## Troubleshooting

- **404 errors on images**: Cloudinary not configured properly
- **Upload fails**: Check environment variables are set correctly
- **Images not displaying**: Verify Cloudinary URLs are being saved to database

## Cost

Cloudinary free tier includes:
- 25 GB storage
- 25 GB bandwidth per month
- 25,000 transformations per month

This should be sufficient for most small to medium websites.
