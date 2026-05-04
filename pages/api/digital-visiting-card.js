import { supabaseAdmin } from '../../lib/supabaseServer'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get the current active digital visiting card
    const { data, error } = await supabaseAdmin
      .from('digital_visiting_card')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching digital visiting card:', error)
      return res.status(500).json({ error: 'Failed to fetch digital visiting card' })
    }

    if (!data) {
      return res.status(404).json({ error: 'Digital visiting card not found' })
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
    console.error('Error in GET /api/digital-visiting-card:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
