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
        {/* Hero Section */}
        <section className="contact-hero">
          <div className="container">
            <div className="contact-hero-content">
              <h1>Contact Us</h1>
              <p className="contact-hero-subtitle">
                Get in touch with our team for precision engineering solutions and manufacturing excellence
              </p>
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
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59531 1.99522 8.06679 2.16708 8.43376 2.48353C8.80073 2.79999 9.03996 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.89391 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9595 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="contact-content">
                      <h4>Phone</h4>
                      <p>(+91) 98242 22442</p>
                      <p>(+91) 7405 227775</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="contact-content">
                      <h4>Email</h4>
                      <p>info@kevinindustries.in</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="contact-content">
                      <h4>Address</h4>
                      <p>
                        Dall Mill Compound,<br />
                        Near Faruki Masjid,<br />
                        Dushsagar Road, Rajkot – 360003,<br />
                        Gujarat, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="contact-form-section">
                <div className="form-card">
                  <h3>Send us a message</h3>
                  {sent ? (
                    <div className="success-message">
                      <div className="success-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </div>
                      <h4>Thank you!</h4>
                      <p>We received your message and will get back to you soon.</p>
                    </div>
                  ) : (
                    <form className="contact-form" onSubmit={submit}>
                      <div className="form-group">
                        <input
                          required
                          placeholder="Your Name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          required
                          type="email"
                          placeholder="Your Email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="tel"
                          placeholder="Your Phone (Optional)"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <textarea
                          required
                          placeholder="Your Message"
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="form-textarea"
                          rows="5"
                        />
                      </div>
                      <button type="submit" className="submit-btn">
                        Send Message
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="map-section">
          <div className="container">
            <div className="section-header">
              <h2>Our Location</h2>
              <p className="section-subtitle">Visit our manufacturing facility in Rajkot, Gujarat</p>
            </div>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3707.393727799678!2d70.7932!3d22.3039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959cb86f3a9d8d7%3A0x5e89f7f95b5f0fbb!2sRajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1694980000000!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: '16px' }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        /* Contact Page Styles */
        .contact-hero {
          background: linear-gradient(135deg, var(--nav), var(--accent));
          color: #fff;
          padding: 120px 0 80px;
          text-align: center;
        }

        .contact-hero-content h1 {
          font-size: 48px;
          font-weight: 800;
          margin: 0 0 24px;
          background: linear-gradient(135deg, #fff, #e2e8f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .contact-hero-subtitle {
          font-size: 20px;
          color: #cbd5e1;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .contact-section {
          padding: 80px 0;
          background: #fff;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }

        .section-header {
          text-align: left;
          margin-bottom: 40px;
        }

        .section-header h2 {
          font-size: 36px;
          font-weight: 700;
          color: var(--nav);
          margin: 0 0 16px;
        }

        .section-subtitle {
          font-size: 18px;
          color: var(--muted);
          margin: 0;
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
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          flex-shrink: 0;
        }

        .contact-content h4 {
          font-size: 18px;
          font-weight: 600;
          color: var(--nav);
          margin: 0 0 8px;
        }

        .contact-content p {
          font-size: 16px;
          color: var(--muted);
          margin: 0;
          line-height: 1.5;
        }

        .form-card {
          background: var(--card);
          border-radius: 20px;
          padding: 40px;
          box-shadow: var(--shadow);
          border: 1px solid rgba(15, 23, 42, 0.05);
        }

        .form-card h3 {
          font-size: 24px;
          font-weight: 700;
          color: var(--nav);
          margin: 0 0 32px;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-input,
        .form-textarea {
          padding: 16px;
          border: 2px solid rgba(15, 23, 42, 0.1);
          border-radius: 12px;
          font-size: 16px;
          transition: all 0.3s ease;
          background: #fff;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-btn {
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          color: #fff;
          border: none;
          padding: 16px 32px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(14, 165, 233, 0.3);
        }

        .success-message {
          text-align: center;
          padding: 40px 20px;
        }

        .success-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #059669);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          margin: 0 auto 24px;
        }

        .success-message h4 {
          font-size: 24px;
          font-weight: 700;
          color: var(--nav);
          margin: 0 0 16px;
        }

        .success-message p {
          font-size: 16px;
          color: var(--muted);
          margin: 0;
        }

        .map-section {
          padding: 80px 0;
          background: var(--bg);
        }

        .map-container {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: var(--shadow);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .contact-hero-content h1 {
            font-size: 40px;
          }

          .contact-hero-subtitle {
            font-size: 18px;
          }

          .section-header h2 {
            font-size: 32px;
          }

          .contact-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .section-header {
            text-align: center;
          }
        }

        @media (max-width: 768px) {
          .contact-hero {
            padding: 100px 0 60px;
          }

          .contact-hero-content h1 {
            font-size: 32px;
          }

          .contact-hero-subtitle {
            font-size: 16px;
          }

          .section-header h2 {
            font-size: 28px;
          }

          .form-card {
            padding: 24px;
          }
        }

        @media (max-width: 480px) {
          .contact-hero-content h1 {
            font-size: 28px;
          }

          .section-header h2 {
            font-size: 24px;
          }

          .form-card {
            padding: 20px;
          }
        }
      `}</style>
    </Layout>
  )
}
