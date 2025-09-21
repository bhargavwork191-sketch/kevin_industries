import fs from 'fs/promises'
import path from 'path'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message, phone } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    try {
      // Create messages directory if it doesn't exist
      const messagesDir = path.join(process.cwd(), 'data', 'messages')
      await fs.mkdir(messagesDir, { recursive: true })

      // Create message object
      const messageData = {
        id: Date.now().toString(),
        name,
        email,
        phone: phone || '',
        message,
        timestamp: new Date().toISOString(),
        read: false
      }

      // Save message to file
      const messageFile = path.join(messagesDir, `${messageData.id}.json`)
      await fs.writeFile(messageFile, JSON.stringify(messageData, null, 2))

      // Send email notification (simplified - in production, use a proper email service)
      const emailContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Message: ${message}

Timestamp: ${new Date().toLocaleString()}
      `.trim()

      // Log the email content (in production, send actual email)
      console.log('Email to info@kevinindustries.in:', emailContent)

      res.status(200).json({ 
        message: 'Message sent successfully',
        id: messageData.id 
      })
    } catch (error) {
      console.error('Error saving message:', error)
      res.status(500).json({ message: 'Error saving message' })
    }
  } else if (req.method === 'GET') {
    // Get all messages for admin dashboard
    try {
      const messagesDir = path.join(process.cwd(), 'data', 'messages')
      
      try {
        await fs.access(messagesDir)
      } catch {
        return res.status(200).json([])
      }

      const files = await fs.readdir(messagesDir)
      const messages = []

      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(messagesDir, file)
          const content = await fs.readFile(filePath, 'utf8')
          messages.push(JSON.parse(content))
        }
      }

      // Sort by timestamp (newest first)
      messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

      res.status(200).json(messages)
    } catch (error) {
      console.error('Error reading messages:', error)
      res.status(500).json({ message: 'Error reading messages' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
