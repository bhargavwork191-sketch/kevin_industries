// Fallback API for images - returns empty array if Supabase is not configured
export default async function handler(req, res) {
  // Check if Supabase is configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    // Return empty array if Supabase is not configured
    return res.status(200).json([])
  }

  try {
    const { createClient } = await import('@supabase/supabase-js')
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { page = 'home' } = req.query
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .eq('page', page)
      .order('order', { ascending: true })

    if (error) return res.status(500).json({ error: error.message })
    res.status(200).json(data)
  } catch (error) {
    // Return empty array if there's any error
    res.status(200).json([])
  }
}
