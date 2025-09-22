import { supabase } from '../../lib/supabaseClient'
import { sendContactNotification } from '../../lib/email'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message, phone } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    try {
      // Get client IP and user agent
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
      const userAgent = req.headers['user-agent']

      console.log('Contact data received:', { name, email, phone, message })
      console.log('IP:', ip, 'User Agent:', userAgent)

      // Insert contact into database (using available columns)
      const { data, error } = await supabase
        .from('contacts')
        .insert([
          {
            name,
            email,
            mobile: phone || null,
            message,
            created_at: new Date().toISOString()
          }
        ])
        .select()

      if (error) {
        console.error('Error inserting contact:', error)
        return res.status(500).json({ message: 'Error saving contact', error: error.message })
      }

      console.log('Contact saved successfully:', data)

      // Send email notification to admins
      const emailResult = await sendContactNotification(data[0])
      
      if (!emailResult.success) {
        console.error('Failed to send email notification:', emailResult.error)
        // Don't fail the request if email fails, just log the error
      }

      res.status(200).json({ 
        message: 'Message sent successfully',
        id: data[0].id,
        emailSent: emailResult.success
      })
    } catch (error) {
      console.error('Error saving contact:', error)
      res.status(500).json({ message: 'Error saving contact' })
    }
  } else if (req.method === 'GET') {
    // Get all contacts for admin dashboard
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching contacts:', error)
        return res.status(500).json({ message: 'Error fetching contacts' })
      }

      res.status(200).json(data || [])
    } catch (error) {
      console.error('Error reading contacts:', error)
      res.status(500).json({ message: 'Error reading contacts' })
    }
  } else if (req.method === 'PUT') {
    // Update contact status (for admin dashboard)
    const { id, status } = req.body

    if (!id || !status) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    try {
      const { data, error } = await supabase
        .from('contacts')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()

      if (error) {
        console.error('Error updating contact:', error)
        return res.status(500).json({ message: 'Error updating contact' })
      }

      res.status(200).json({ message: 'Contact updated successfully', data: data[0] })
    } catch (error) {
      console.error('Error updating contact:', error)
      res.status(500).json({ message: 'Error updating contact' })
    }
  } else if (req.method === 'DELETE') {
    // Delete contact (for admin dashboard)
    const { id } = req.body

    if (!id) {
      return res.status(400).json({ message: 'Missing contact ID' })
    }

    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting contact:', error)
        return res.status(500).json({ message: 'Error deleting contact' })
      }

      res.status(200).json({ message: 'Contact deleted successfully' })
    } catch (error) {
      console.error('Error deleting contact:', error)
      res.status(500).json({ message: 'Error deleting contact' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
