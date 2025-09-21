import { supabaseAdmin } from '../../../../lib/supabaseServer.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!supabaseAdmin) {
    return res.status(500).json({ error: 'Supabase not configured' })
  }

  try {
    const { page, images: reorderData } = req.body

    if (!page || !reorderData) {
      return res.status(400).json({ error: 'Page and images data required' })
    }

    // Update order for each image in the database
    const updatePromises = reorderData.map(({ id, order }) => 
      supabaseAdmin
        .from('images')
        .update({ order_index: order })
        .eq('id', id)
        .eq('page', page)
    )

    const results = await Promise.all(updatePromises)
    
    // Check if any updates failed
    const failedUpdates = results.filter(result => result.error)
    if (failedUpdates.length > 0) {
      console.error('Some image order updates failed:', failedUpdates)
      return res.status(500).json({ error: 'Error updating some image orders' })
    }

    res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error reordering images:', error)
    res.status(500).json({ error: 'Error reordering images' })
  }
}
