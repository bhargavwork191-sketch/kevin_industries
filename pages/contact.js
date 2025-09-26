import Layout from '../components/Layout'
import CompanyProfileDownload from '../components/CompanyProfileDownload'
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
                    <div className="stat-number">ISO 9001</div>
                    <div className="stat-label">Certified</div>
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
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                      </div>
                      <div className="contact-text">
                        <h3>Phone</h3>
                        <p><a href="tel:+919824222442" className="phone-link">+91 98242 22442</a></p>
                        <p><a href="tel:+917405227775" className="phone-link">+91 7405 227775</a></p>
                      </div>
                    </div>

                    <div className="contact-item">
                      <div className="contact-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <rect x="2" y="4" width="20" height="16" rx="2"/>
                          <path d="m22 7-10 5L2 7"/>
                        </svg>
                      </div>
                      <div className="contact-text">
                        <h3>Email</h3>
                        <p>info@kevinindustries.com</p>
                        <p>kevindiecast@gmail.com</p>
                      </div>
                    </div>

                    <div className="contact-item">
                      <div className="contact-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                      </div>
                      <div className="contact-text">
                        <h3>Address</h3>
                        <p>Dall Mill Compound,</p>
                        <p>Near Faruki Masjid,</p>
                        <p>Dushsagar Road,</p>
                        <p>Rajkot - 360003,</p>
                        <p>Gujarat, India</p>
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
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10"/>
                          <path d="m9 12 2 2 4-4"/>
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
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="m22 2-7 7 7 7"/>
                          <path d="M15 9H2"/>
                        </svg>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Company Brochure Section */}
          <section className="brochure-section">
            <div className="container">
              <div className="brochure-content">
                <div className="brochure-text">
                  <h2>Company Information</h2>
                  <p>Access our detailed company brochure with technical specifications, service capabilities, and contact details.</p>
                </div>
                <div className="brochure-action">
                  <CompanyProfileDownload />
                </div>
              </div>
            </div>
          </section>

          {/* Map Section */}
          <section className="map-section">
            <div className="container">
              <div className="section-header">
                <h2>Find Us</h2>
                <p className="section-subtitle">Visit our manufacturing facility at Dall Mill Compound, Near Faruki Masjid, Dushsagar Road, Rajkot - 360003, Gujarat, India</p>
              </div>
              <div className="map-container">
                <div className="map-wrapper">
                  <iframe
                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29531.854997878032!2d70.7903574751315!3d22.297608450036858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959b5faa610e8a7%3A0x950151975e30ebf!2sKevin%20Industries!5e0!3m2!1sen!2sin!4v1758653544652!5m2!1sen!2sin"
                    width="100%"
                    height="400"
                    style={{ border: 0, borderRadius: '16px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                  <div className="map-overlay">
                    <button 
                      className="map-expand-btn"
                       onClick={() => window.open('https://maps.app.goo.gl/uDw64AaMDN6X9H4G7', '_blank')}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <path d="m15 3 6 6-6 6"/>
                      </svg>
                      View Larger Map
                    </button>
                  </div>
                </div>
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
            margin: 0 0 24px 0;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            line-height: 1.6;
          }

          /* Company Brochure Section */
          .brochure-section {
            background: #f8fafc;
            padding: 60px 0;
          }

          .brochure-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 40px;
          }

          .brochure-text h2 {
            font-size: 2rem;
            font-weight: 600;
            color: #0f172a;
            margin-bottom: 12px;
          }

          .brochure-text p {
            font-size: 1rem;
            color: #64748b;
            line-height: 1.6;
            margin: 0;
          }

          .brochure-action {
            flex-shrink: 0;
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
            background: linear-gradient(135deg, #ffffff, #f8fafc);
            border: 2px solid #0ea5e9;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #0ea5e9;
            flex-shrink: 0;
            box-shadow: 0 4px 12px rgba(14, 165, 233, 0.15);
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

          .phone-link {
            color: #64748b;
            text-decoration: none;
            font-weight: 400;
            transition: all 0.3s ease;
            border-bottom: 1px solid transparent;
            pointer-events: none;
            cursor: default;
          }

          /* Enable clickable functionality only on mobile and tablet */
          @media (max-width: 1024px) {
            .phone-link {
              color: #0ea5e9;
              font-weight: 600;
              pointer-events: auto;
              cursor: pointer;
            }

            .phone-link:hover {
              color: #3b82f6;
              border-bottom-color: #3b82f6;
              transform: translateY(-1px);
            }

            .phone-link:active {
              color: #1d4ed8;
              transform: translateY(0);
            }
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
            display: block;
          }

          .map-wrapper {
            position: relative;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          }

          .map-overlay {
            position: absolute;
            top: 16px;
            right: 16px;
            z-index: 10;
          }

          .map-expand-btn {
            background: rgba(255, 255, 255, 0.95);
            border: none;
            padding: 12px 16px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            font-weight: 600;
            color: #0ea5e9;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            backdrop-filter: blur(10px);
          }

          .map-expand-btn:hover {
            background: rgba(255, 255, 255, 1);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
          }

          .map-info {
            background: white;
            border-radius: 16px;
            padding: 32px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            height: fit-content;
          }

          .location-details h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #0f172a;
            margin: 0 0 20px 0;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .location-details p {
            font-size: 1rem;
            color: #64748b;
            margin: 0 0 16px 0;
            line-height: 1.6;
          }

          .location-details strong {
            color: #0f172a;
            font-weight: 600;
          }

          .map-actions {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-top: 24px;
          }

          .directions-btn,
          .share-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px 16px;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
          }

          .directions-btn {
            background: #0ea5e9;
            color: white;
          }

          .directions-btn:hover {
            background: #0284c7;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
          }

          .share-btn {
            background: #f1f5f9;
            color: #64748b;
            border: 1px solid #e2e8f0;
          }

          .share-btn:hover {
            background: #e2e8f0;
            color: #0f172a;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }

          /* Responsive Design */
          @media (max-width: 1600px) {
            .container {
              max-width: 1400px;
              padding: 0 24px;
            }

            .contact-hero {
              padding: 90px 0;
            }

            .hero-content h1 {
              font-size: 3.2rem;
            }

            .contact-section {
              padding: 90px 0;
            }

            .contact-grid {
              gap: 56px;
            }

            .map-section {
              padding: 90px 0;
            }

            .map-container {
              grid-template-columns: 1fr;
              gap: 24px;
            }
          }

          @media (max-width: 1440px) {
            .container {
              max-width: 1200px;
              padding: 0 20px;
            }

            .contact-hero {
              padding: 80px 0;
            }

            .hero-content h1 {
              font-size: 3rem;
            }

            .hero-subtitle {
              font-size: 1.2rem;
              max-width: 550px;
            }

            .contact-stats {
              gap: 40px;
            }

            .contact-section {
              padding: 80px 0;
            }

            .contact-grid {
              gap: 48px;
            }

            .section-header h2 {
              font-size: 2.3rem;
            }

            .contact-form-container {
              padding: 36px;
            }

            .map-section {
              padding: 80px 0;
            }

            .map-container {
              grid-template-columns: 1fr;
              gap: 20px;
            }

            .map-info {
              padding: 24px;
            }
          }

          @media (max-width: 1200px) {
            .container {
              max-width: 1000px;
              padding: 0 20px;
            }

            .contact-hero {
              padding: 70px 0;
            }

            .hero-content h1 {
              font-size: 2.8rem;
            }

            .hero-subtitle {
              font-size: 1.15rem;
              max-width: 500px;
            }

            .contact-stats {
              gap: 36px;
            }

            .stat-number {
              font-size: 2.2rem;
            }

            .contact-section {
              padding: 70px 0;
            }

            .contact-grid {
              gap: 44px;
            }

            .section-header h2 {
              font-size: 2.1rem;
            }

            .contact-form-container {
              padding: 32px;
            }

            .map-section {
              padding: 70px 0;
            }
          }

          @media (max-width: 1024px) {
            .container {
              max-width: 900px;
              padding: 0 20px;
            }

            .contact-hero {
              padding: 60px 0;
            }

            .hero-content h1 {
              font-size: 2.6rem;
            }

            .hero-subtitle {
              font-size: 1.1rem;
              max-width: 480px;
            }

            .contact-stats {
              gap: 32px;
            }

            .stat-number {
              font-size: 2rem;
            }

            .stat-label {
              font-size: 0.95rem;
            }

            .contact-section {
              padding: 60px 0;
            }

            .contact-grid {
              gap: 40px;
            }

            .section-header h2 {
              font-size: 2rem;
            }

            .section-subtitle {
              font-size: 1.05rem;
            }

            .contact-form-container {
              padding: 28px;
            }

            .form-header h2 {
              font-size: 1.8rem;
            }

            .map-section {
              padding: 60px 0;
            }
          }

          @media (max-width: 768px) {
            .container {
              padding: 0 16px;
            }

            .contact-hero {
              padding: 50px 0;
            }

            .brochure-section {
              padding: 40px 0;
            }

            .brochure-content {
              flex-direction: column;
              text-align: center;
              gap: 24px;
            }

            .brochure-text h2 {
              font-size: 1.75rem;
            }

            .hero-content h1 {
              font-size: 2.5rem;
            }

            .hero-subtitle {
              font-size: 1rem;
              max-width: 100%;
              margin-bottom: 40px;
            }

            .contact-stats {
              gap: 24px;
            }

            .stat-number {
              font-size: 1.8rem;
            }

            .stat-label {
              font-size: 0.9rem;
            }

            .contact-section {
              padding: 50px 0;
            }

            .contact-grid {
              grid-template-columns: 1fr;
              gap: 32px;
            }

            .section-header {
              margin-bottom: 40px;
            }

            .section-header h2 {
              font-size: 1.8rem;
            }

            .section-subtitle {
              font-size: 1rem;
            }

            .contact-details {
              gap: 28px;
            }

            .contact-item {
              gap: 14px;
            }

            .contact-icon {
              width: 45px;
              height: 45px;
            }

            .contact-text h3 {
              font-size: 1.2rem;
            }

            .contact-text p {
              font-size: 0.95rem;
            }


            .contact-form-container {
              padding: 24px;
            }

            .form-header h2 {
              font-size: 1.6rem;
            }

            .form-group input,
            .form-group textarea {
              padding: 10px 14px;
              font-size: 0.95rem;
            }

            .submit-button {
              padding: 14px 28px;
              font-size: 1rem;
            }

            .map-section {
              padding: 50px 0;
            }

            .map-container iframe {
              height: 350px;
            }

            .map-container {
              grid-template-columns: 1fr;
              gap: 16px;
            }

            .map-info {
              padding: 20px;
            }

            .location-details h3 {
              font-size: 1.25rem;
            }

            .map-actions {
              flex-direction: column;
              gap: 8px;
            }
          }

          @media (max-width: 640px) {
            .contact-hero {
              padding: 40px 0;
            }

            .hero-content h1 {
              font-size: 2.2rem;
            }

            .hero-subtitle {
              font-size: 0.95rem;
              margin-bottom: 36px;
            }

            .contact-stats {
              gap: 20px;
            }

            .stat-number {
              font-size: 1.6rem;
            }

            .stat-label {
              font-size: 0.85rem;
            }

            .contact-section {
              padding: 40px 0;
            }

            .contact-grid {
              gap: 28px;
            }

            .section-header {
              margin-bottom: 32px;
            }

            .section-header h2 {
              font-size: 1.6rem;
            }

            .contact-details {
              gap: 24px;
            }

            .contact-item {
              flex-direction: column;
              text-align: center;
              gap: 12px;
            }

            .contact-icon {
              width: 40px;
              height: 40px;
            }

            .contact-text h3 {
              font-size: 1.1rem;
            }

            .contact-text p {
              font-size: 0.9rem;
            }


            .contact-form-container {
              padding: 20px;
            }

            .form-header h2 {
              font-size: 1.4rem;
            }

            .form-group input,
            .form-group textarea {
              padding: 8px 12px;
              font-size: 0.9rem;
            }

            .submit-button {
              padding: 12px 24px;
              font-size: 0.95rem;
            }

            .map-section {
              padding: 40px 0;
            }

            .map-container iframe {
              height: 300px;
            }
          }

          @media (max-width: 480px) {
            .container {
              padding: 0 12px;
            }

            .contact-hero {
              padding: 36px 0;
            }

            .hero-content h1 {
              font-size: 2rem;
            }

            .hero-subtitle {
              font-size: 0.9rem;
              margin-bottom: 32px;
            }

            .contact-stats {
              gap: 16px;
            }

            .stat-number {
              font-size: 1.4rem;
            }

            .stat-label {
              font-size: 0.8rem;
            }

            .contact-section {
              padding: 36px 0;
            }

            .contact-grid {
              gap: 24px;
            }

            .section-header {
              margin-bottom: 28px;
            }

            .section-header h2 {
              font-size: 1.4rem;
            }

            .section-subtitle {
              font-size: 0.9rem;
            }

            .contact-details {
              gap: 20px;
            }

            .contact-item {
              gap: 10px;
            }

            .contact-icon {
              width: 36px;
              height: 36px;
            }

            .contact-text h3 {
              font-size: 1rem;
            }

            .contact-text p {
              font-size: 0.85rem;
            }


            .contact-form-container {
              padding: 16px;
            }

            .form-header h2 {
              font-size: 1.2rem;
            }

            .form-group input,
            .form-group textarea {
              padding: 6px 10px;
              font-size: 0.85rem;
            }

            .submit-button {
              padding: 10px 20px;
              font-size: 0.9rem;
            }

            .map-section {
              padding: 36px 0;
            }

            .map-container iframe {
              height: 250px;
            }
          }

          @media (max-width: 360px) {
            .container {
              padding: 0 8px;
            }

            .contact-hero {
              padding: 32px 0;
            }

            .hero-content h1 {
              font-size: 1.8rem;
            }

            .hero-subtitle {
              font-size: 0.85rem;
              margin-bottom: 28px;
            }

            .contact-stats {
              gap: 12px;
            }

            .stat-number {
              font-size: 1.2rem;
            }

            .stat-label {
              font-size: 0.75rem;
            }

            .contact-section {
              padding: 32px 0;
            }

            .contact-grid {
              gap: 20px;
            }

            .section-header {
              margin-bottom: 24px;
            }

            .section-header h2 {
              font-size: 1.2rem;
            }

            .section-subtitle {
              font-size: 0.85rem;
            }

            .contact-details {
              gap: 16px;
            }

            .contact-icon {
              width: 32px;
              height: 32px;
            }

            .contact-text h3 {
              font-size: 0.95rem;
            }

            .contact-text p {
              font-size: 0.8rem;
            }


            .contact-form-container {
              padding: 12px;
            }

            .form-header h2 {
              font-size: 1.1rem;
            }

            .form-group input,
            .form-group textarea {
              padding: 5px 8px;
              font-size: 0.8rem;
            }

            .submit-button {
              padding: 8px 16px;
              font-size: 0.85rem;
            }

            .map-section {
              padding: 32px 0;
            }

            .map-container iframe {
              height: 200px;
            }
          }
        `}</style>
      </main>
    </Layout>
  )
}