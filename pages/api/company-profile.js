import { supabaseAdmin } from '../../lib/supabaseServer'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get the current active company profile
    const { data, error } = await supabaseAdmin
      .from('company_profile')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching company profile:', error)
      return res.status(500).json({ error: 'Failed to fetch company profile' })
    }

    if (!data) {
      return res.status(404).json({ error: 'Company profile not found' })
    }

    // Return the PDF data
    return res.status(200).json({
      id: data.id,
      filename: data.original_filename,
      url: data.url,
      title: data.title,
      description: data.description,
      file_size: data.file_size,
      created_at: data.created_at
    })
  } catch (error) {
    console.error('Error in GET /api/company-profile:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
