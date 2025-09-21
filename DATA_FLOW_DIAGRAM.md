# Kevin Industries - Data Flow Diagram

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                FRONTEND LAYER                                  │
├─────────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │   Home      │  │  Gallery    │  │   Contact   │  │    Admin    │          │
│  │   Page      │  │   Page      │  │    Page     │  │   Panel     │          │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘          │
│         │                 │                 │                 │              │
│         ▼                 ▼                 ▼                 ▼              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ DynamicImage│  │ DynamicImage│  │ ContactForm │  │ ImageUpload │          │
│  │ Component   │  │ Component   │  │ Component   │  │ Component   │          │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              NEXT.JS API LAYER                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ /api/images │  │ /api/contact│  │/api/admin/  │  │/api/admin/  │          │
│  │             │  │             │  │   images    │  │images/reorder│          │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘          │
│         │                 │                 │                 │              │
│         ▼                 ▼                 ▼                 ▼              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ Supabase    │  │ Supabase    │  │ Supabase    │  │ Supabase    │          │
│  │ Client      │  │ Client      │  │ Admin       │  │ Admin       │          │
│  │ (Read)      │  │ (Write)     │  │ (CRUD)      │  │ (Update)    │          │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              SUPABASE LAYER                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────┐  ┌─────────────────────────────────┐      │
│  │         STORAGE                 │  │        DATABASE                 │      │
│  │                                 │  │                                 │      │
│  │  ┌─────────────────────────┐    │  │  ┌─────────────────────────┐    │      │
│  │  │ kevin-industries-images │    │  │  │      images table       │    │      │
│  │  │        bucket           │    │  │  │                         │    │      │
│  │  │                         │    │  │  │ • id (PK)               │    │      │
│  │  │ • /images/gallery/      │    │  │  │ • filename              │    │      │
│  │  │ • /images/carousel/     │    │  │  │ • url                   │    │      │
│  │  │ • /images/manufacturing/│    │  │  │ • alt_text              │    │      │
│  │  │                         │    │  │  │ • page                  │    │      │
│  │  └─────────────────────────┘    │  │  │ • section               │    │      │
│  │                                 │  │  │ • width/height          │    │      │
│  │                                 │  │  │ • order_index           │    │      │
│  │                                 │  │  │ • is_active             │    │      │
│  │                                 │  │  │ • created_at            │    │      │
│  │                                 │  │  └─────────────────────────┘    │      │
│  │                                 │  │                                 │      │
│  │                                 │  │  ┌─────────────────────────┐    │      │
│  │                                 │  │  │     contacts table      │    │      │
│  │                                 │  │  │                         │    │      │
│  │                                 │  │  │ • id (PK)               │    │      │
│  │                                 │  │  │ • name                  │    │      │
│  │                                 │  │  │ • email                 │    │      │
│  │                                 │  │  │ • phone                 │    │      │
│  │                                 │  │  │ • message               │    │      │
│  │                                 │  │  │ • status                │    │      │
│  │                                 │  │  │ • ip_address            │    │      │
│  │                                 │  │  │ • created_at            │    │      │
│  │                                 │  │  └─────────────────────────┘    │      │
│  └─────────────────────────────────┘  └─────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              EXTERNAL SERVICES                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────┐  ┌─────────────────────────────────┐      │
│  │         EMAIL SERVICE           │  │        CDN/DELIVERY             │      │
│  │                                 │  │                                 │      │
│  │  ┌─────────────────────────┐    │  │  ┌─────────────────────────┐    │      │
│  │  │     Nodemailer          │    │  │  │     Supabase CDN        │    │      │
│  │  │                         │    │  │  │                         │    │      │
│  │  │ • SMTP Configuration    │    │  │  │ • Global CDN            │    │      │
│  │  │ • Gmail/SendGrid        │    │  │  │ • Image Optimization    │    │      │
│  │  │ • Contact Notifications │    │  │  │ • Caching               │    │      │
│  │  │ • Admin Alerts          │    │  │  │ • Fast Delivery         │    │      │
│  │  └─────────────────────────┘    │  │  └─────────────────────────┘    │      │
│  └─────────────────────────────────┘  └─────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Data Flow Processes

### 1. Image Display Flow
```
User visits page → DynamicImage component → /api/images → Supabase Database → 
Supabase Storage → CDN → User's browser
```

### 2. Image Upload Flow
```
Admin uploads image → Admin panel → /api/admin/images → Supabase Storage → 
Database record created → Image available for display
```

### 3. Contact Form Flow
```
User submits form → Contact page → /api/contact → Supabase Database → 
Email notification sent → Admin dashboard updated
```

### 4. Image Management Flow
```
Admin reorders images → Admin panel → /api/admin/images/reorder → 
Database updated → Frontend reflects changes
```

## Key Components

### Frontend Components
- **DynamicImage**: Reusable component for loading images from Supabase
- **Carousel**: Updated to use Supabase data
- **Admin Panel**: Full CRUD interface for image management
- **Contact Form**: Integrated with Supabase and email notifications

### API Endpoints
- **GET /api/images**: Public image retrieval
- **POST /api/contact**: Contact form submission
- **GET /api/admin/images**: Admin image management
- **POST /api/admin/images**: Image upload
- **DELETE /api/admin/images**: Image deletion
- **POST /api/admin/images/reorder**: Image reordering

### Database Tables
- **images**: Stores image metadata and references
- **contacts**: Stores contact form submissions

### Storage
- **kevin-industries-images**: Supabase Storage bucket for all images
- **Organized by page**: gallery/, carousel/, manufacturing/

## Security Features

- **Row Level Security**: Supabase RLS policies
- **Authentication**: Admin access control
- **Input Validation**: Form validation and sanitization
- **File Type Validation**: Image upload restrictions
- **Rate Limiting**: API rate limiting (via Supabase)

## Performance Optimizations

- **Image Optimization**: Sharp for metadata extraction
- **CDN Delivery**: Supabase CDN for fast image delivery
- **Lazy Loading**: Next.js Image component with lazy loading
- **Caching**: Browser and CDN caching
- **Database Indexing**: Optimized queries with proper indexes
