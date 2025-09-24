# Kevin Industries - Next.js with Supabase

This project is a Next.js conversion of the static Kevin Industries site, wired up with Supabase for persistence.

## Local setup
1. Run `npm install`
2. Create `.env.local` in the project root with:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_public_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
```

3. Run `npm run dev` and open [http://localhost:3000](http://localhost:3000)

- Home page carousel pulls from `images` table in Supabase.
- Contact form submissions are stored in `contacts` table.
- Admin panel (`/admin`) uploads images to Supabase Storage (bucket `website-images`) and stores metadata in `images` table. Access requires login with credentials set in environment variables.

## Deployment
- Push to GitHub, connect repo to Vercel.
- Add the same environment variables in Vercel project settings.
- Re-deploy and your Supabase-backed site is live.

## Supabase Schema
```
create table images (
  id uuid primary key default gen_random_uuid(),
  page text not null,
  image_url text not null,
  alt text,
  "order" int default 0
);

create table contacts (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  message text,
  created_at timestamp default now()
);
```

And create a Storage bucket named `website-images`.
