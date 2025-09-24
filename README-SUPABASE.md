# Kevin Industries - Supabase Integration

This Next.js application has been fully integrated with Supabase for image management and contact form handling.

## 🚀 Features

- **Dynamic Image Management**: All images are stored in Supabase Storage with metadata in PostgreSQL
- **Admin Interface**: Upload, edit, delete, and reorder images through a web interface
- **Contact Form**: Integrated with Supabase database and email notifications
- **Responsive Design**: Modern UI with drag-and-drop functionality
- **SEO Optimized**: Proper image loading and metadata handling

## 📋 Prerequisites

- Node.js 18+ 
- Supabase account and project
- SMTP email service (Gmail, SendGrid, etc.)

## 🛠️ Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd kevin_industries
npm install
```

### 2. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and keys
3. Run the SQL migrations in your Supabase SQL editor:

```sql
-- Run the contents of supabase/migrations/001_create_images_table.sql
-- Run the contents of supabase/migrations/002_create_contacts_table.sql  
-- Run the contents of supabase/migrations/003_create_storage_bucket.sql
```

### 3. Environment Configuration

1. Copy the environment template:
```bash
cp env.template .env.local
```

2. Fill in your Supabase credentials in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Email configuration (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
ADMIN_EMAIL=info@kevinindustries.in
```

### 4. Migrate Existing Images (Optional)

If you have existing images to migrate:

```bash
npm run migrate-supabase
```

### 5. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📁 Project Structure

```
├── components/
│   ├── DynamicImage.js      # Reusable image component
│   ├── Carousel.js          # Updated carousel with Supabase
│   └── Layout.js            # Main layout component
├── lib/
│   ├── supabaseClient.js    # Client-side Supabase client
│   └── supabaseServer.js    # Server-side Supabase client
├── pages/
│   ├── api/
│   │   ├── images.js        # Public images API
│   │   ├── contact.js       # Contact form API
│   │   └── admin/
│   │       └── images.js    # Admin images API
│   ├── admin.js             # Admin dashboard
│   ├── gallery.js           # Gallery page
│   └── index.js             # Home page
├── supabase/
│   └── migrations/          # Database migrations
└── scripts/
    └── migrate-to-supabase.js # Image migration script
```

## 🎯 API Endpoints

### Public APIs
- `GET /api/images?page=gallery` - Get images for a specific page
- `POST /api/contact` - Submit contact form

### Admin APIs
- `GET /api/admin/images?page=gallery` - Get all images for admin
- `POST /api/admin/images` - Upload new image
- `DELETE /api/admin/images?id=123` - Delete image
- `POST /api/admin/images/reorder` - Reorder images

## 🗄️ Database Schema

### Images Table
```sql
CREATE TABLE images (
  id BIGSERIAL PRIMARY KEY,
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  alt_text TEXT,
  page TEXT NOT NULL DEFAULT 'gallery',
  section TEXT,
  width INTEGER,
  height INTEGER,
  file_size BIGINT,
  mime_type TEXT,
  storage_path TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Contacts Table
```sql
CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🚀 Deployment (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Vercel Environment Variables
Add these in your Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `ADMIN_EMAIL`
- `ADMIN_USERNAME` (for admin panel access)
- `ADMIN_PASSWORD` (for admin panel access)

## 🔧 Admin Access

- **URL**: `/admin`
- **Username**: Set via `ADMIN_USERNAME` environment variable (default: `kevin123`)
- **Password**: Set via `ADMIN_PASSWORD` environment variable (default: `Kevin@1234`)

**Note**: Admin credentials are now stored securely in environment variables and not exposed to the client-side code.

## 📊 Data Flow Diagram

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Next.js API    │    │   Supabase      │
│                 │    │                  │    │                 │
│ ┌─────────────┐ │    │ ┌──────────────┐ │    │ ┌─────────────┐ │
│ │ DynamicImage│ │───▶│ │ /api/images  │ │───▶│ │ PostgreSQL  │ │
│ └─────────────┘ │    │ └──────────────┘ │    │ └─────────────┘ │
│                 │    │                  │    │                 │
│ ┌─────────────┐ │    │ ┌──────────────┐ │    │ ┌─────────────┐ │
│ │ Admin Panel │ │───▶│ │/api/admin/...│ │───▶│ │ Storage     │ │
│ └─────────────┘ │    │ └──────────────┘ │    │ └─────────────┘ │
│                 │    │                  │    │                 │
│ ┌─────────────┐ │    │ ┌──────────────┐ │    │ ┌─────────────┐ │
│ │Contact Form │ │───▶│ │ /api/contact │ │───▶│ │ Email API   │ │
│ └─────────────┘ │    │ └──────────────┘ │    │ └─────────────┘ │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🐛 Troubleshooting

### Common Issues

1. **Images not loading**: Check Supabase Storage bucket permissions
2. **Contact form not working**: Verify SMTP credentials
3. **Admin access denied**: Check authentication context
4. **Database errors**: Ensure migrations are run correctly

### Debug Mode

Set `NODE_ENV=development` to see detailed error logs.

## 📝 License

This project is proprietary to Kevin Industries.

## 🤝 Support

For technical support, contact the development team.
