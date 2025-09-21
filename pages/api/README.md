API notes:
- /api/images?page=home|gallery|about  -> returns JSON array of images
- /api/contact  -> POST to submit contact messages (stores in data/contacts.json)
- /api/admin/images  -> POST form upload to add image (local demo: saves to public/images and data/images.json)
To use a real DB (Supabase) replace the fs read/writes with Supabase client calls.