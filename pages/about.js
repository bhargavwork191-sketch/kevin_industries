import Layout from '../components/Layout'
import { useEffect, useState } from 'react'

export default function About() {
  const [imgs, setImgs] = useState([])

  useEffect(() => {
    fetch('/api/images?page=about')
      .then(r => r.json())
      .then(setImgs)
  }, [])

  return (
    <Layout>
      <main>
        {/* Hero Section */}
        <section className="about-hero">
          <div className="container">
            <div className="about-hero-content">
              <h1>About Kevin Industries</h1>
              <p className="about-hero-subtitle">
                Six decades of precision engineering excellence in foundry, tool room, and casting solutions
              </p>
            </div>
          </div>
        </section>

        {/* Our Legacy */}
        <section className="legacy-section">
          <div className="container">
            <div className="section-header">
              <h2>Our Legacy</h2>
              <p className="section-subtitle">
                For over 60 years, Kevin Industries has been delivering precision engineering solutions through
                tool room innovation, die casting, and machining excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Our Manufacturing Divisions - Updated Chronology */}
        <section className="divisions-section">
          <div className="container">
            <div className="section-header">
              <h2>Our Manufacturing Divisions</h2>
              <p className="section-subtitle">Three core capabilities working in perfect harmony</p>
            </div>
            <div className="divisions-grid">
              <div className="division-card">
                <div className="division-icon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Foundry Solutions</h3>
                <p>Advanced pressure die casting with precision molds and high-quality metal alloys for durable, repeatable components.</p>
                <div className="division-features">
                  <span className="feature-tag">Pressure Die Casting</span>
                  <span className="feature-tag">Aluminum Alloys</span>
                  <span className="feature-tag">Zinc Alloys</span>
                  <span className="feature-tag">Quality Control</span>
                </div>
              </div>
              
              <div className="division-card">
                <div className="division-icon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
                    <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3>Tool Room Expertise</h3>
                <p>Die sets, jigs, fixtures and tool development supporting high-precision production with advanced machining capabilities.</p>
                <div className="division-features">
                  <span className="feature-tag">Die Sets & Jigs</span>
                  <span className="feature-tag">Custom Fixtures</span>
                  <span className="feature-tag">Tool Development</span>
                  <span className="feature-tag">Precision Machining</span>
                </div>
              </div>
              
              <div className="division-card">
                <div className="division-icon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3>Precision Casting</h3>
                <p>Component machining to drawings and samples with strict tolerance control and advanced finishing processes.</p>
                <div className="division-features">
                  <span className="feature-tag">Component Machining</span>
                  <span className="feature-tag">Strict Tolerances</span>
                  <span className="feature-tag">Surface Finishing</span>
                  <span className="feature-tag">Quality Assurance</span>
            </div>
            </div>
            </div>
          </div>
        </section>

        {/* Beautiful Process Flow Diagram */}
        <section className="process-section">
          <div className="container">
            <div className="section-header">
              <h2>Our Manufacturing Process</h2>
              <p className="section-subtitle">From design to delivery - a seamless workflow</p>
            </div>
            <div className="process-flow">
              <div className="process-step">
                <div className="step-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    {/* Foundry Pouring Icon */}
                    <path d="M3 8L12 3L21 8V16L12 21L3 16V8Z" stroke="currentColor" strokeWidth="2" fill="rgba(14, 165, 233, 0.1)"/>
                    <path d="M8 12L12 8L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="2" fill="currentColor"/>
                    <path d="M12 6V10M12 14V18" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="step-content">
                  <h3>01. Foundry</h3>
                  <p>Metal pouring & pressure die casting</p>
                  <div className="process-details">
                    <span className="process-tag">Molten Metal</span>
                    <span className="process-tag">Precision Molds</span>
                  </div>
                </div>
                <div className="step-arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              
              <div className="process-step">
                <div className="step-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    {/* Precision Machining Icon */}
                    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="rgba(14, 165, 233, 0.1)"/>
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M12 2V6M12 18V22M2 12H6M18 12H22" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="step-content">
                  <h3>02. Precision Casting</h3>
                  <p>Component machining & surface finishing</p>
                  <div className="process-details">
                    <span className="process-tag">CNC Machining</span>
                    <span className="process-tag">Tolerance Control</span>
                  </div>
                </div>
                <div className="step-arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              
              <div className="process-step">
                <div className="step-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    {/* Vernier Caliper/Testing Icon */}
                    <rect x="3" y="8" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="2" fill="rgba(14, 165, 233, 0.1)"/>
                    <path d="M7 8V4M17 8V4" stroke="currentColor" strokeWidth="2"/>
                    <path d="M9 12H15M9 14H15" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="12" cy="16" r="1" fill="currentColor"/>
                    <path d="M6 2L8 4L6 6M18 2L16 4L18 6" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="step-content">
                  <h3>03. Tool Room</h3>
                  <p>Die sets, jigs & precision measurement</p>
                  <div className="process-details">
                    <span className="process-tag">Vernier Caliper</span>
                    <span className="process-tag">Custom Fixtures</span>
                  </div>
                </div>
                <div className="step-arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              
              <div className="process-step">
                <div className="step-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    {/* Quality Control Icon */}
                    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" fill="rgba(16, 185, 129, 0.1)"/>
                    <path d="M12 6V10M12 14V18M6 12H10M14 12H18" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="step-content">
                  <h3>04. Quality Control</h3>
                  <p>ISO 9001:2015 testing & inspection</p>
                  <div className="process-details">
                    <span className="process-tag">ISO Standards</span>
                    <span className="process-tag">Final Inspection</span>
                  </div>
                </div>
                <div className="step-arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              
              <div className="process-step">
                <div className="step-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    {/* Delivery/Packaging Icon */}
                    <rect x="2" y="8" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="rgba(14, 165, 233, 0.1)"/>
                    <path d="M8 8V6C8 4.89543 8.89543 4 10 4H14C15.1046 4 16 4.89543 16 6V8" stroke="currentColor" strokeWidth="2"/>
                    <path d="M6 12H18M6 16H18" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="12" cy="18" r="1" fill="currentColor"/>
                  </svg>
                </div>
                <div className="step-content">
                  <h3>05. Delivery</h3>
                  <p>Packaging & secure dispatch</p>
                  <div className="process-details">
                    <span className="process-tag">Secure Packaging</span>
                        <span className="process-tag">Timely Dispatch</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certification */}
        <section className="certification-section">
          <div className="container">
            <div className="section-header">
              <h2>Certification</h2>
            </div>
            <div className="certification-card">
              <div className="certification-icon">
                <div className="iso-badge">
                  <span>ISO</span>
                </div>
              </div>
              <div className="certification-content">
                <h3>ISO 9001:2015 Certified</h3>
                <p>
                  Maintaining consistent quality management systems across manufacturing and service processes.
                  Our certification ensures adherence to international quality standards and continuous improvement.
                </p>
                <div className="certification-features">
                  <span className="feature-tag">Quality Management</span>
                  <span className="feature-tag">Process Control</span>
                  <span className="feature-tag">Continuous Improvement</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic About Images */}
        {imgs.length > 0 && (
          <section className="section about-images">
            {imgs.map(i => (
              <img key={i.id} src={i.image_url} alt={i.alt || ''} />
            ))}
          </section>
        )}
      </main>

      <style jsx>{`
        /* About Page Styles */
        .about-hero {
          background: linear-gradient(135deg, var(--nav), var(--accent));
          color: #fff;
          padding: 120px 0 80px;
          text-align: center;
        }

        .about-hero-content h1 {
          font-size: 48px;
          font-weight: 800;
          margin: 0 0 24px;
          background: linear-gradient(135deg, #fff, #e2e8f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .about-hero-subtitle {
          font-size: 20px;
          color: #cbd5e1;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .legacy-section {
          padding: 80px 0;
          background: #fff;
        }

        .section-header {
          text-align: center;
          margin-bottom: 64px;
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
          max-width: 800px;
          margin: 0 auto;
        }

        .divisions-section {
          padding: 80px 0;
          background: var(--bg);
        }

        .divisions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 40px;
        }

        .division-card {
          background: var(--card);
          border-radius: 20px;
          padding: 40px;
          text-align: center;
          box-shadow: var(--shadow);
          transition: all 0.3s ease;
          border: 1px solid rgba(15, 23, 42, 0.05);
        }

        .division-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
        }

        .division-icon {
          width: 80px;
          height: 80px;
          border-radius: 20px;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          margin: 0 auto 24px;
        }

        .division-card h3 {
          font-size: 24px;
          font-weight: 700;
          color: var(--nav);
          margin: 0 0 16px;
        }

        .division-card p {
          font-size: 16px;
          color: var(--muted);
          line-height: 1.6;
          margin: 0 0 24px;
        }

        .division-features {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
        }

        .feature-tag {
          background: var(--bg);
          color: var(--nav);
          padding: 6px 12px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 500;
          border: 1px solid rgba(15, 23, 42, 0.1);
        }

        /* Process Flow Styles */
        .process-section {
          padding: 80px 0;
          background: #fff;
        }

        /* Certification Section */
        .certification-section {
          padding: 80px 0;
          background: var(--bg);
        }

        .certification-card {
          background: var(--card);
          border-radius: 20px;
          padding: 40px;
          display: flex;
          align-items: center;
          gap: 32px;
          box-shadow: var(--shadow);
          border: 1px solid rgba(15, 23, 42, 0.05);
          max-width: 800px;
          margin: 0 auto;
        }

        .certification-icon {
          flex-shrink: 0;
        }

        .iso-badge {
          width: 100px;
          height: 100px;
          border-radius: 20px;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 24px;
          box-shadow: 0 8px 24px rgba(14, 165, 233, 0.3);
        }

        .certification-content h3 {
          font-size: 24px;
          font-weight: 700;
          color: var(--nav);
          margin: 0 0 16px;
        }

        .certification-content p {
          font-size: 16px;
          color: var(--muted);
          line-height: 1.6;
          margin: 0 0 24px;
        }

        .certification-features {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .process-flow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 24px;
          margin-top: 48px;
        }

        .process-step {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
          min-width: 200px;
        }

        .step-icon {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          flex-shrink: 0;
        }

        .step-content {
          flex: 1;
        }

        .step-content h3 {
          font-size: 18px;
          font-weight: 700;
          color: var(--nav);
          margin: 0 0 4px;
        }

        .step-content p {
          font-size: 14px;
          color: var(--muted);
          margin: 0 0 12px;
        }

        .process-details {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 8px;
        }

        .process-tag {
          background: rgba(14, 165, 233, 0.1);
          color: var(--accent);
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 500;
          border: 1px solid rgba(14, 165, 233, 0.2);
        }

        .step-arrow {
          color: var(--accent);
          margin-left: 16px;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .about-hero-content h1 {
            font-size: 40px;
          }

          .about-hero-subtitle {
            font-size: 18px;
          }

          .section-header h2 {
            font-size: 32px;
          }

          .process-flow {
            flex-direction: column;
            align-items: stretch;
          }
          
          .process-step {
            flex-direction: column;
            text-align: center;
            min-width: auto;
          }
          
          .step-arrow {
            transform: rotate(90deg);
            margin: 16px 0;
          }

          .certification-card {
            flex-direction: column;
            text-align: center;
            gap: 24px;
          }
        }

        @media (max-width: 768px) {
          .about-hero {
            padding: 100px 0 60px;
          }

          .about-hero-content h1 {
            font-size: 32px;
          }

          .about-hero-subtitle {
            font-size: 16px;
          }

          .section-header h2 {
            font-size: 28px;
          }

          .divisions-grid {
            grid-template-columns: 1fr;
          }
          
          .division-card {
            padding: 24px;
          }

          .certification-card {
            padding: 24px;
          }

          .iso-badge {
            width: 80px;
            height: 80px;
            font-size: 20px;
          }
        }

        @media (max-width: 480px) {
          .about-hero-content h1 {
            font-size: 28px;
          }

          .section-header h2 {
            font-size: 24px;
          }

          .certification-card {
            padding: 20px;
          }
        }
      `}</style>
    </Layout>
  )
}
