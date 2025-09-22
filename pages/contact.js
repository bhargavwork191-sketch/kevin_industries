import Layout from '../components/Layout'
import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    try {
      // Send form data to your API route
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      setSent(true)
    } catch (err) {
      console.error(err)
      alert('Error sending message.')
    }
  }

  return (
    <Layout>
      <main>
        <div className="contact-container">
          {/* Hero Section */}
          <section className="contact-hero">
            <div className="container">
              <div className="hero-content">
                <h1>Contact Us</h1>
                <p className="hero-subtitle">
                  Get in touch with our team for precision engineering solutions and manufacturing excellence
                </p>
                <div className="contact-stats">
                  <div className="stat-item">
                    <div className="stat-number">60+</div>
                    <div className="stat-label">Years Experience</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">24/7</div>
                    <div className="stat-label">Support</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">100%</div>
                    <div className="stat-label">Quality Focus</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Information & Form */}
          <section className="contact-section">
            <div className="container">
              <div className="contact-grid">
                {/* Contact Information */}
                <div className="contact-info">
                  <div className="section-header">
                    <h2>Get In Touch</h2>
                    <p className="section-subtitle">
                      Ready to discuss your manufacturing needs? We're here to help.
                    </p>
                  </div>
                  
                  <div className="contact-details">
                    <div className="contact-item">
                      <div className="contact-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1469 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59531 1.99522 8.06679 2.16708 8.43376 2.48353C8.80073 2.79999 9.04004 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.89391 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5261 15.5775C21.8428 15.9518 22.0122 16.4296 22 16.92Z"/>
                        </svg>
                      </div>
                      <div className="contact-text">
                        <h3>Phone</h3>
                        <p>+91 98765 43210</p>
                        <p>+91 98765 43211</p>
                      </div>
                    </div>

                    <div className="contact-item">
                      <div className="contact-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"/>
                          <polyline points="22,6 12,13 2,6"/>
                        </svg>
                      </div>
                      <div className="contact-text">
                        <h3>Email</h3>
                        <p>info@kevinindustries.com</p>
                        <p>sales@kevinindustries.com</p>
                      </div>
                    </div>

                    <div className="contact-item">
                      <div className="contact-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                      </div>
                      <div className="contact-text">
                        <h3>Address</h3>
                        <p>Industrial Area, Rajkot</p>
                        <p>Gujarat, India - 360001</p>
                      </div>
                    </div>

                    <div className="contact-item">
                      <div className="contact-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12,6 12,12 16,14"/>
                        </svg>
                      </div>
                      <div className="contact-text">
                        <h3>Business Hours</h3>
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 9:00 AM - 2:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="contact-form-container">
                  <div className="form-header">
                    <h2>Send us a Message</h2>
                    <p>We'll get back to you within 24 hours</p>
                  </div>

                  {sent ? (
                    <div className="success-message">
                      <div className="success-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999"/>
                          <polyline points="22,4 12,14.01 9,11.01"/>
                        </svg>
                      </div>
                      <h3>Message Sent Successfully!</h3>
                      <p>Thank you for contacting us. We'll get back to you soon.</p>
                      <button 
                        className="reset-button"
                        onClick={() => {
                          setSent(false)
                          setForm({ name: '', email: '', phone: '', message: '' })
                        }}
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={submit} className="contact-form">
                      <div className="form-group">
                        <label htmlFor="name">Full Name *</label>
                        <input
                          type="text"
                          id="name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          required
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          required
                          placeholder="Enter your email address"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="message">Message *</label>
                        <textarea
                          id="message"
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          required
                          rows="5"
                          placeholder="Tell us about your manufacturing needs..."
                        ></textarea>
                      </div>

                      <button type="submit" className="submit-button">
                        Send Message
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"/>
                        </svg>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Map Section */}
          <section className="map-section">
            <div className="container">
              <div className="section-header">
                <h2>Find Us</h2>
                <p className="section-subtitle">Visit our manufacturing facility in Rajkot, Gujarat</p>
              </div>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.123456789!2d70.123456789!3d22.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDA3JzI0LjQiTiA3MMKwMDcnMjQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="400"
                  style={{ border: 0, borderRadius: '16px' }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </section>
        </div>

        <style jsx>{`
          .contact-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
          }

          /* Hero Section */
          .contact-hero {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
            color: white;
            padding: 100px 0;
            text-align: center;
            position: relative;
            overflow: hidden;
          }

          .contact-hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
            opacity: 0.3;
          }

          .hero-content {
            position: relative;
            z-index: 2;
          }

          .hero-content h1 {
            font-size: 3.5rem;
            font-weight: 800;
            margin: 0 0 24px 0;
            background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .hero-subtitle {
            font-size: 1.25rem;
            color: #cbd5e1;
            margin: 0 0 48px 0;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            line-height: 1.6;
          }

          .contact-stats {
            display: flex;
            justify-content: center;
            gap: 48px;
            flex-wrap: wrap;
          }

          .stat-item {
            text-align: center;
          }

          .stat-number {
            font-size: 2.5rem;
            font-weight: 800;
            color: #0ea5e9;
            margin: 0 0 8px 0;
          }

          .stat-label {
            font-size: 1rem;
            color: #94a3b8;
            font-weight: 500;
          }

          /* Contact Section */
          .contact-section {
            padding: 100px 0;
            background: white;
          }

          .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 64px;
            align-items: start;
          }

          .section-header {
            margin-bottom: 48px;
          }

          .section-header h2 {
            font-size: 2.5rem;
            font-weight: 700;
            color: #0f172a;
            margin: 0 0 16px 0;
          }

          .section-subtitle {
            font-size: 1.125rem;
            color: #64748b;
            margin: 0;
            line-height: 1.6;
          }

          .contact-details {
            display: flex;
            flex-direction: column;
            gap: 32px;
          }

          .contact-item {
            display: flex;
            align-items: flex-start;
            gap: 16px;
          }

          .contact-icon {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #0ea5e9, #3b82f6);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            flex-shrink: 0;
          }

          .contact-text h3 {
            font-size: 1.25rem;
            font-weight: 700;
            color: #0f172a;
            margin: 0 0 8px 0;
          }

          .contact-text p {
            font-size: 1rem;
            color: #64748b;
            margin: 0 0 4px 0;
            line-height: 1.5;
          }

          /* Contact Form */
          .contact-form-container {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            border: 1px solid #e2e8f0;
          }

          .form-header {
            text-align: center;
            margin-bottom: 32px;
          }

          .form-header h2 {
            font-size: 2rem;
            font-weight: 700;
            color: #0f172a;
            margin: 0 0 8px 0;
          }

          .form-header p {
            font-size: 1rem;
            color: #64748b;
            margin: 0;
          }

          .contact-form {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }

          .form-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .form-group label {
            font-size: 0.875rem;
            font-weight: 600;
            color: #374151;
          }

          .form-group input,
          .form-group textarea {
            padding: 12px 16px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 1rem;
            transition: all 0.3s ease;
            background: white;
          }

          .form-group input:focus,
          .form-group textarea:focus {
            outline: none;
            border-color: #0ea5e9;
            box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
          }

          .submit-button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            background: linear-gradient(135deg, #0ea5e9, #3b82f6);
            color: white;
            padding: 16px 32px;
            border: none;
            border-radius: 12px;
            font-size: 1.125rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
          }

          .submit-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(14, 165, 233, 0.4);
          }

          /* Success Message */
          .success-message {
            text-align: center;
            padding: 40px 20px;
          }

          .success-icon {
            color: #10b981;
            margin-bottom: 24px;
          }

          .success-message h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #0f172a;
            margin: 0 0 12px 0;
          }

          .success-message p {
            font-size: 1rem;
            color: #64748b;
            margin: 0 0 24px 0;
          }

          .reset-button {
            background: linear-gradient(135deg, #0ea5e9, #3b82f6);
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .reset-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
          }

          /* Map Section */
          .map-section {
            padding: 100px 0;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          }

          .map-container {
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .hero-content h1 {
              font-size: 2.5rem;
            }

            .contact-stats {
              gap: 24px;
            }

            .contact-grid {
              grid-template-columns: 1fr;
              gap: 32px;
            }

            .contact-form-container {
              padding: 24px;
            }
          }

          @media (max-width: 480px) {
            .hero-content h1 {
              font-size: 2rem;
            }

            .contact-details {
              gap: 24px;
            }

            .contact-item {
              flex-direction: column;
              text-align: center;
            }
          }
        `}</style>
      </main>
    </Layout>
  )
}