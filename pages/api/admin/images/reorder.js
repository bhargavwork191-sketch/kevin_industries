// import { supabaseAdmin } from '../../../lib/supabaseServer'
import { supabaseAdmin } from '@/lib/supabaseServer'


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

    console.log('🔄 Reordering images for page:', page, 'with data:', reorderData)

    // Since the current database schema doesn't have order_index column,
    // we'll update the created_at timestamp to reflect the new order
    // This ensures the database order matches the admin panel order
    
    const updatePromises = reorderData.map(({ id, order }, index) => {
      // Create a new timestamp based on the order
      // Earlier items get earlier timestamps
      const newTimestamp = new Date(Date.now() - (reorderData.length - index) * 1000).toISOString()
      
      return supabaseAdmin
        .from('images')
        .update({ created_at: newTimestamp })
        .eq('id', id)
        .eq('type', page) // Use type instead of page since that's what exists
    })

    const results = await Promise.all(updatePromises)
    
    // Check if any updates failed
    const failedUpdates = results.filter(result => result.error)
    if (failedUpdates.length > 0) {
      console.error('Some image order updates failed:', failedUpdates)
      return res.status(500).json({ error: 'Error updating some image orders' })
    }

    console.log('✅ Successfully updated image order in database')
    res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error reordering images:', error)
    res.status(500).json({ error: 'Error reordering images' })
  }
}
