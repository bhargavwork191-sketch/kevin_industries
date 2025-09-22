import nodemailer from 'nodemailer'

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

// HTML template for contact form notification
const createContactEmailTemplate = (contactData) => {
  const { name, email, message, created_at } = contactData
  const phone = contactData.mobile || 'Not provided'
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission - Kevin Industries</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f8fafc;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 700;
        }
        .header p {
          margin: 8px 0 0 0;
          opacity: 0.9;
          font-size: 14px;
        }
        .content {
          padding: 30px;
        }
        .contact-info {
          background: #f8fafc;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
        }
        .info-row {
          display: flex;
          margin-bottom: 12px;
          align-items: center;
        }
        .info-row:last-child {
          margin-bottom: 0;
        }
        .label {
          font-weight: 600;
          color: #374151;
          min-width: 80px;
          margin-right: 12px;
        }
        .value {
          color: #1f2937;
          flex: 1;
        }
        .message-section {
          background: #fef3c7;
          border-left: 4px solid #f59e0b;
          padding: 20px;
          border-radius: 0 8px 8px 0;
          margin-bottom: 20px;
        }
        .message-section h3 {
          margin: 0 0 12px 0;
          color: #92400e;
          font-size: 16px;
        }
        .message-text {
          color: #451a03;
          line-height: 1.6;
          white-space: pre-wrap;
          margin: 0;
        }
        .footer {
          background: #f8fafc;
          padding: 20px 30px;
          text-align: center;
          border-top: 1px solid #e5e7eb;
        }
        .footer p {
          margin: 0;
          color: #6b7280;
          font-size: 12px;
        }
        .timestamp {
          background: #e0f2fe;
          color: #0277bd;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          display: inline-block;
        }
        .priority-badge {
          background: #dc2626;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-left: 8px;
        }
        @media (max-width: 600px) {
          .container {
            margin: 0;
            border-radius: 0;
          }
          .content {
            padding: 20px;
          }
          .info-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .label {
            margin-bottom: 4px;
            margin-right: 0;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔔 New Contact Form Submission</h1>
          <p>Kevin Industries - Manufacturing Excellence</p>
        </div>
        
        <div class="content">
          <div class="contact-info">
            <div class="info-row">
              <span class="label">👤 Name:</span>
              <span class="value">${name}</span>
            </div>
            <div class="info-row">
              <span class="label">📧 Email:</span>
              <span class="value">${email}</span>
            </div>
            ${phone ? `
            <div class="info-row">
              <span class="label">📞 Phone:</span>
              <span class="value">${phone}</span>
            </div>
            ` : ''}
            <div class="info-row">
              <span class="label">🕒 Submitted:</span>
              <span class="value">
                <span class="timestamp">${new Date(created_at).toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZoneName: 'short'
                })}</span>
                <span class="priority-badge">NEW</span>
              </span>
            </div>
          </div>
          
          <div class="message-section">
            <h3>💬 Customer Message</h3>
            <p class="message-text">${message}</p>
          </div>
        </div>
        
        <div class="footer">
          <p>This email was automatically generated from the Kevin Industries contact form.</p>
          <p>Please respond to the customer at: <strong>${email}</strong></p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Send contact form notification email
export const sendContactNotification = async (contactData) => {
  try {
    const transporter = createTransporter()
    
    // Verify connection configuration
    await transporter.verify()
    
    const htmlTemplate = createContactEmailTemplate(contactData)
    
    // Email options
    const mailOptions = {
      from: `"Kevin Industries Contact Form" <${process.env.SMTP_USER}>`,
      to: [process.env.ADMIN_EMAIL, process.env.ADMIN_EMAIL_2],
      subject: `🔔 New Contact Form Submission from ${contactData.name} - Kevin Industries`,
      html: htmlTemplate,
      text: `
New Contact Form Submission - Kevin Industries

Name: ${contactData.name}
Email: ${contactData.email}
Phone: ${contactData.phone || 'Not provided'}
Message: ${contactData.message}

Submitted: ${new Date(contactData.created_at).toLocaleString()}

Please respond to: ${contactData.email}
      `.trim()
    }
    
    // Send email
    const result = await transporter.sendMail(mailOptions)
    console.log('✅ Email sent successfully:', result.messageId)
    return { success: true, messageId: result.messageId }
    
  } catch (error) {
    console.error('❌ Error sending email:', error)
    return { success: false, error: error.message }
  }
}

// Send test email
export const sendTestEmail = async () => {
  try {
    const transporter = createTransporter()
    
    // Verify connection configuration
    await transporter.verify()
    
    const mailOptions = {
      from: `"Kevin Industries Test" <${process.env.SMTP_USER}>`,
      to: [process.env.ADMIN_EMAIL, process.env.ADMIN_EMAIL_2],
      subject: '🧪 Test Email - Kevin Industries SMTP Configuration',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0ea5e9;">✅ SMTP Configuration Test Successful</h2>
          <p>This is a test email to verify that the SMTP configuration is working correctly.</p>
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          <p>If you received this email, the contact form notifications should work properly.</p>
        </div>
      `,
      text: 'SMTP Configuration Test Successful - Contact form notifications should work properly.'
    }
    
    const result = await transporter.sendMail(mailOptions)
    console.log('✅ Test email sent successfully:', result.messageId)
    return { success: true, messageId: result.messageId }
    
  } catch (error) {
    console.error('❌ Error sending test email:', error)
    return { success: false, error: error.message }
  }
}
