import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Server-side client with service role key for admin operations
// Will be null if environment variables are not configured
let supabaseAdmin = null

try {
  if (supabaseUrl && supabaseServiceKey) {
    supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  }
} catch (error) {
  console.error('Error creating Supabase client:', error)
  supabaseAdmin = null
}

export { supabaseAdmin }
