# Company Profile PDF Download Feature

This document explains the new company profile PDF download functionality that has been added to the Kevin Industries website.

## Overview

The system now allows administrators to upload a company profile PDF that can be downloaded by visitors from multiple pages on the website. When a new PDF is uploaded, the old one is automatically deactivated and removed.

## Features

- ✅ PDF upload through admin panel
- ✅ Automatic cleanup of old PDFs when new ones are uploaded
- ✅ Download button on multiple pages (Home, About, Contact)
- ✅ Secure file storage using Supabase Storage
- ✅ Database tracking of PDF metadata
- ✅ Responsive design for mobile devices

## Setup Instructions

### 1. Database Setup

Run the following SQL script in your Supabase SQL editor:

```sql
-- Copy and paste the contents of scripts/setup-company-profile.sql
```

Or manually execute the migration file:
- Go to your Supabase dashboard
- Navigate to SQL Editor
- Copy and paste the contents of `supabase/migrations/005_create_company_profile_table.sql`
- Execute the script

### 2. Storage Bucket Setup

The script will automatically create a storage bucket named `company-profile`. If you need to create it manually:

1. Go to Supabase Dashboard → Storage
2. Create a new bucket named `company-profile`
3. Set it as public
4. Configure the appropriate policies

### 3. Environment Variables

Ensure your environment variables are set up correctly:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## How to Use

### For Administrators

1. **Access Admin Panel**: Go to `/admin` and log in
2. **Navigate to Company Profile Tab**: Click on the "COMPANY PROFILE" tab
3. **Upload PDF**: 
   - Click "Choose PDF" to select a PDF file
   - Click "Upload PDF" to upload
   - The system will automatically deactivate any existing PDF

### For Website Visitors

1. **Download Button**: Available on Home, About, and Contact pages
2. **Click to Download**: Click the "Download Company Profile" button
3. **Automatic Download**: The PDF will be downloaded to your device

## File Structure

```
pages/
├── api/
│   ├── company-profile.js          # Public API for PDF info
│   └── admin/
│       └── company-profile.js      # Admin API for PDF management
├── admin.js                        # Updated admin panel with PDF management
├── index.js                        # Home page with download button
├── about.js                        # About page with download button
└── contact.js                      # Contact page with download button

components/
└── CompanyProfileDownload.js       # Reusable download button component

supabase/migrations/
└── 005_create_company_profile_table.sql  # Database migration
```

## API Endpoints

### Public Endpoints

- `GET /api/company-profile` - Get current active company profile information

### Admin Endpoints

- `GET /api/admin/company-profile` - Get company profile (admin)
- `POST /api/admin/company-profile` - Upload new company profile PDF
- `DELETE /api/admin/company-profile?id={id}` - Delete company profile PDF

## Database Schema

```sql
CREATE TABLE company_profile (
  id BIGSERIAL PRIMARY KEY,
  filename TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  mime_type TEXT DEFAULT 'application/pdf',
  title TEXT DEFAULT 'Company Profile',
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Security Features

- **Row Level Security (RLS)**: Enabled on the company_profile table
- **Public Read Access**: Only active company profiles are publicly accessible
- **Admin Management**: Only authenticated users can manage company profiles
- **File Validation**: Only PDF files are accepted
- **Size Limits**: Maximum file size of 10MB

## Styling

The download button uses a modern design with:
- Gradient background
- Hover animations
- Responsive design
- Loading states
- Mobile-optimized layout

## Troubleshooting

### Common Issues

1. **PDF not uploading**: Check file size (max 10MB) and file type (PDF only)
2. **Download button not showing**: Ensure a company profile PDF is uploaded and active
3. **Database errors**: Verify the migration script was executed successfully
4. **Storage issues**: Check that the `company-profile` bucket exists and is public

### Debug Steps

1. Check browser console for JavaScript errors
2. Verify API endpoints are responding correctly
3. Check Supabase logs for database/storage errors
4. Ensure environment variables are set correctly

## Future Enhancements

Potential improvements for the future:
- Multiple language support for PDFs
- PDF preview functionality
- Download analytics
- Version history
- Custom PDF metadata (title, description)

## Support

If you encounter any issues with this feature, please check:
1. The troubleshooting section above
2. Supabase documentation for storage and database issues
3. Next.js documentation for API route issues
