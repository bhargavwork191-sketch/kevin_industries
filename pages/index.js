import Layout from '../components/Layout'
import Carousel from '../components/Carousel'
import ExcellenceImages from '../components/ExcellenceImages'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout>
      <main>
        <div className="home-container">
        {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-background">
            <Carousel page="home" />
          </div>
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <div className="container">
                <div className="hero-text">
                  <span className="hero-tag">Six Decades of Manufacturing Excellence</span>
                  <h1>Kevin Industries</h1>
                  <h2>Precesion Engineering • Pressure Die Casting • Machining</h2>
                  <p>Since 1963, we have been delivering best pressure die casting. From precision Die to casting and machining we bring your vision to life with unmatched quality, consistency and reliability.</p>
                  <div className="hero-stats">
                    <div className="stat-item">
                      <div className="stat-number">60+</div>
                      <div className="stat-label">Years of Excellence</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-number">ISO 9001</div>
                      <div className="stat-label">Quality Certified</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-number">100%</div>
                      <div className="stat-label">Customer Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Industrial Components Section */}
          <section className="industrial-components">
            <div className="container">
              <div className="section-header">
                <div className="header-shape"></div>
                <h2>Components for Different Industries</h2>
                <p>We manufacture precision components for diverse industrial applications with unmatched quality and reliability.</p>
              </div>
              
              <div className="components-timeline">
                <div className="timeline-item">
                  <div className="timeline-marker automotive">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-1.3-3.4C16.3 6.1 15.7 6 15 6H9c-.7 0-1.3.1-1.7.6L6 10l-1.5 1.1C3.7 11.3 3 12.1 3 13v3c0 .6.4 1 1 1h2"/>
                      <circle cx="7" cy="17" r="2"/>
                      <circle cx="17" cy="17" r="2"/>
                      <path d="M7 17h10"/>
                    </svg>
                  </div>
                  <div className="timeline-content">
                    <h3>Core Manufacturing Components</h3>
                    <div className="key-points">
                      <div className="point-item">
                        <span className="bullet-icon">⚙️</span>
                        <strong>Air cooling sleeves for fuel injector</strong>
                      </div>
                      <div className="point-item">
                        <span className="bullet-icon">🔧</span>
                        <strong>Bearing housings for various applications</strong>
                      </div>
                      <div className="point-item">
                        <span className="bullet-icon">🔩</span>
                        <strong>Builder's hardware fittings</strong>
                      </div>
                      <div className="point-item">
                        <span className="bullet-icon">💧</span>
                        <strong>Casings for water pump impeller</strong>
                      </div>
                      <div className="point-item">
                        <span className="bullet-icon">📊</span>
                        <strong>Casting Body for pressure gauges</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-marker electrical">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                    </svg>
                  </div>
                  <div className="timeline-content">
                    <h3>Electrical & Electronic Components</h3>
                    <div className="key-points">
                      <div className="point-item">
                        <span className="bullet-icon">⚡</span>
                        <strong>Castings for electrical & electronic components</strong>
                      </div>
                      <div className="point-item">
                        <span className="bullet-icon">💎</span>
                        <strong>Components related to jeweler making industry</strong>
                      </div>
                      <div className="point-item">
                        <span className="bullet-icon">🔋</span>
                        <strong>Components for pneumatic & hydraulic applications</strong>
                      </div>
                      <div className="point-item">
                        <span className="bullet-icon">🔗</span>
                        <strong>Connecting rods for small engines, gen-sets & refrigeration compressors</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-marker industrial">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div className="timeline-content">
                    <h3>Specialized Industrial Components</h3>
                    <div className="key-points">
                      <div className="point-item">
                        <span className="bullet-icon">🛡️</span>
                        <strong>End Covers for Electric Motors & Fans</strong>
                      </div>
                      <div className="point-item">
                        <span className="bullet-icon">🔍</span>
                        <strong>Filter Cap Castings for Air, Oil & Fuel</strong>
                      </div>
                      <div className="point-item">
                        <span className="bullet-icon">📐</span>
                        <strong>Stands, Brackets & Knobs for various applications</strong>
                      </div>
                      <div className="point-item">
                        <span className="bullet-icon">🧵</span>
                        <strong>Support Sockets for Textile Machines</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-marker specialized">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
                    </svg>
                  </div>
                  <div className="timeline-content">
                    <h3>Advanced Engineering Solutions</h3>
                    <div className="key-points">
                      <div className="point-item">
                        <span className="bullet-icon">📦</span>
                        <strong>Terminal Box & Covers for Electric Motors</strong>
                      </div>
                      <div className="point-item">
                        <span className="bullet-icon">⚙️</span>
                        <strong>Thrust Washers for Diesel Oil Engines & Gear Boxes</strong>
                      </div>
                      <div className="point-item">
                        <span className="bullet-icon">✨</span>
                        <strong>And many more specialized components</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="components-footer">
                <button 
                  className="explore-gallery-btn"
                  onClick={() => window.location.href = '/gallery'}
                >
                  <span>EXPLORE OUR GALLERY</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </section>

          {/* Creative Capabilities Section */}
          <section className="creative-capabilities">
            <div className="container">
              <div className="section-header">
                <h2>Our Manufacturing facilities</h2>
                <p className="section-subtitle">Three specialized facilities working together to deliver best quality component tailored as per your needs.</p>
              </div>
              
              <div className="capabilities-showcase">
                <div className="capability-card tool-room">
                  <div className="card-background">
                    <img src="/web_images/k_img7.jpeg" alt="Tool Room" />
                    <div className="card-overlay"></div>
                  </div>
                  <div className="card-content">
                    <div className="capability-number">01</div>
                    <div className="capability-icon">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                        <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
                        <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <h3>Tool Room</h3>
                    <p>Precision tooling solutions including custom die sets, specialized jigs, and advanced fixtures. Our expert team develops high-precision tools that ensure consistent, repeatable manufacturing processes.</p>
                    <div className="capability-features">
                      <span className="feature-badge">Custom Die Sets</span>
                      <span className="feature-badge">Specialized Jigs</span>
                      <span className="feature-badge">Precision Fixtures</span>
                    </div>
                    <button 
                      className="capability-cta"
                      onClick={() => window.location.href = '/processes'}
                    >
                      VIEW MORE
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="capability-card foundry">
                  <div className="card-background">
                    <img src="/web_images/k_img8.jpeg" alt="Foundry" />
                    <div className="card-overlay"></div>
                  </div>
                  <div className="card-content">
                    <div className="capability-number">02</div>
                    <div className="capability-icon">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3>High Pressure Die Casting</h3>
                    <p>Injects molten metal into Die set with high pressure.</p>
                    <div className="capability-features">
                      <span className="feature-badge">Pressure Die Casting</span>
                      <span className="feature-badge">Heat Treatment</span>
                    </div>
                    <button 
                      className="capability-cta"
                      onClick={() => window.location.href = '/processes'}
                    >
                      VIEW MORE
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="capability-card machine-shop">
                  <div className="card-background">
                    <img src="/web_images/k_img1.jpg" alt="Machine Shop" />
                    <div className="card-overlay"></div>
                  </div>
                  <div className="card-content">
                    <div className="capability-number">03</div>
                    <div className="capability-icon">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                        <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <path d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="8" cy="12" r="2" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="16" cy="12" r="2" stroke="currentColor" strokeWidth="2"/>
                        <path d="M10 12H14" stroke="currentColor" strokeWidth="2"/>
                        <path d="M6 18H18" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <h3>Machining</h3>
                    <p>We deliver durable , high quality components with precise dimensional accuracy and surface finish as per requirement.</p>
                    <div className="capability-features">
                      <span className="feature-badge">Quality Control</span>
                    </div>
                    <button 
                      className="capability-cta"
                      onClick={() => window.location.href = '/processes'}
                    >
                      VIEW MORE
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="capabilities-footer">
                <button 
                  className="main-cta"
                  onClick={() => window.location.href = '/processes'}
                >
                  <span>DISCOVER PROCESS WORKFLOW</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
            </div>
          </div>
        </section>

        {/* Excellence Section */}
          <section className="excellence-section">
            <div className="container">
              <div className="section-header">
                <h2>Glimse of Our work</h2>
                <p className="section-subtitle">Explore our portfolio of precision-engineered components and witness the quality craftsmanship that sets us apart in the industry</p>
              </div>
              <ExcellenceImages />
            </div>
          </section>

          </div>

      <style jsx>{`
          .home-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
          }

          /* Hero Section */
          .hero-section {
            position: relative;
          min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }

          .hero-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
          }

          .hero-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%);
            z-index: 2;
          }

          .hero-content {
            position: relative;
            z-index: 3;
            width: 100%;
            text-align: center;
            color: white;
          }

          .hero-text {
            max-width: 900px;
            margin: 0 auto;
          }

          .hero-tag {
            display: inline-block;
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(14, 165, 233, 0.15));
            color: #60a5fa;
            padding: 0.75rem 1.5rem;
            border-radius: 50px;
            font-size: 0.9rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            border: 2px solid rgba(59, 130, 246, 0.3);
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }

          .hero-text h1 {
            font-size: 4.5rem;
            font-weight: 900;
            margin: 0 0 1.5rem 0;
            background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #cbd5e1 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            line-height: 1.1;
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            animation: fadeInUp 1s ease-out;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .hero-text h2 {
            font-size: 1.5rem;
            font-weight: 500;
            margin: 0 0 2rem 0;
            color: #cbd5e1;
            line-height: 1.6;
            letter-spacing: 0.5px;
          }

          .hero-text p {
            font-size: 1.125rem;
            color: #e2e8f0;
            margin: 0 0 3rem 0;
            line-height: 1.7;
          }

          .hero-stats {
            display: flex;
            justify-content: center;
            gap: 60px;
            flex-wrap: wrap;
            margin-top: 2rem;
          }

          .stat-item {
            text-align: center;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 2rem 1.5rem;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            animation: fadeInUp 1s ease-out 0.5s both;
          }

          .stat-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
            background: rgba(255, 255, 255, 0.15);
          }

          .stat-number {
            font-size: 3rem;
            font-weight: 900;
            background: linear-gradient(135deg, #0ea5e9, #3b82f6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin: 0 0 8px 0;
            text-shadow: 0 2px 10px rgba(14, 165, 233, 0.3);
          }

          .stat-label {
            font-size: 1.1rem;
            color: #e2e8f0;
            font-weight: 600;
            letter-spacing: 0.5px;
          }

          /* Industrial Components Section */
          .industrial-components {
            padding: 60px 0;
            background: white;
            position: relative;
            overflow: hidden;
          }

          .industrial-components::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(14, 165, 233, 0.02) 0%, rgba(59, 130, 246, 0.02) 100%);
          }

          .industrial-components .section-header {
            position: relative;
            z-index: 2;
            text-align: center;
            margin-bottom: 40px;
          }

          .header-shape {
            width: 60px;
            height: 4px;
            background: linear-gradient(90deg, #0ea5e9, #3b82f6);
            margin: 0 auto 24px;
            border-radius: 2px;
            position: relative;
          }

          .header-shape::before {
            content: '';
            position: absolute;
            top: -8px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 8px solid #0ea5e9;
          }

          .industrial-components .section-header h2 {
            font-size: 3rem;
            font-weight: 800;
            margin: 0 0 16px 0;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            position: relative;
          }

          .industrial-components .section-header h2::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 4px;
            background: linear-gradient(90deg, #0ea5e9, #3b82f6);
            border-radius: 2px;
          }

          .industrial-components .section-header p {
            font-size: 1.125rem;
            color: #64748b;
            margin: 0;
            line-height: 1.6;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }

          .components-timeline {
            position: relative;
            z-index: 2;
            max-width: 900px;
            margin: 0 auto;
          }

          .components-timeline::before {
            content: '';
            position: absolute;
            left: 30px;
            top: 0;
            bottom: 0;
            width: 3px;
            background: linear-gradient(180deg, #0ea5e9, #3b82f6, #8b5cf6, #10b981);
            border-radius: 2px;
          }

          .timeline-item {
            position: relative;
            margin-bottom: 40px;
            padding-left: 70px;
            opacity: 0;
            animation: slideInLeft 0.8s ease forwards;
          }

          .timeline-item:nth-child(1) { animation-delay: 0.1s; }
          .timeline-item:nth-child(2) { animation-delay: 0.3s; }
          .timeline-item:nth-child(3) { animation-delay: 0.5s; }
          .timeline-item:nth-child(4) { animation-delay: 0.7s; }

          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .timeline-marker {
            position: absolute;
            left: -45px;
            top: 6px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 3;
            border: 2px solid white;
          }

          .timeline-marker svg {
            width: 24px;
            height: 24px;
            transition: all 0.3s ease;
          }

          .timeline-marker.automotive {
            background: linear-gradient(135deg, #dc2626, #b91c1c);
            box-shadow: 0 12px 40px rgba(220, 38, 38, 0.3);
          }

          .timeline-marker.electrical {
            background: linear-gradient(135deg, #d97706, #b45309);
            box-shadow: 0 12px 40px rgba(217, 119, 6, 0.3);
          }

          .timeline-marker.industrial {
            background: linear-gradient(135deg, #059669, #047857);
            box-shadow: 0 12px 40px rgba(5, 150, 105, 0.3);
          }

          .timeline-marker.specialized {
            background: linear-gradient(135deg, #7c3aed, #6d28d9);
            box-shadow: 0 12px 40px rgba(124, 58, 237, 0.3);
          }

          .timeline-content {
            background: white;
            border-radius: 20px;
            padding: 28px;
            border: 1px solid rgba(0, 0, 0, 0.08);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }

          .timeline-content::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 5px;
            background: linear-gradient(90deg, #0ea5e9, #3b82f6, #8b5cf6);
            transform: scaleX(0);
            transition: transform 0.4s ease;
          }

          .timeline-item:hover .timeline-content {
            transform: translateY(-12px);
            border-color: rgba(14, 165, 233, 0.2);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.12);
          }

          .timeline-item:hover .timeline-content::before {
            transform: scaleX(1);
          }

          .timeline-item:hover .timeline-marker {
            transform: scale(1.15) rotate(5deg);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
          }

          .timeline-item:hover .timeline-marker svg {
            transform: scale(1.1);
          }

          .timeline-content h3 {
            font-size: 1.4rem;
            font-weight: 800;
            color: #0f172a;
            margin: 0 0 18px 0;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            letter-spacing: -0.02em;
          }

          .key-points {
            margin: 0;
          }

          .point-item {
            display: flex;
            align-items: center;
            font-size: 1rem;
            line-height: 1.6;
            color: #475569;
            margin-bottom: 12px;
            padding: 6px 0;
            transition: all 0.3s ease;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          }

          .point-item:last-child {
            margin-bottom: 0;
          }

          .bullet-icon {
            font-size: 1.1rem;
            margin-right: 10px;
            width: 20px;
            text-align: center;
            transition: all 0.3s ease;
          }

          .point-item strong {
            color: #0f172a;
            font-weight: 600;
            background: linear-gradient(135deg, rgba(14, 165, 233, 0.08), rgba(59, 130, 246, 0.08));
            padding: 4px 8px;
            border-radius: 6px;
            transition: all 0.3s ease;
            border: 1px solid rgba(14, 165, 233, 0.1);
          }

          .timeline-item:hover .point-item {
            transform: translateX(8px);
          }

          .timeline-item:hover .bullet-icon {
            transform: scale(1.2);
          }

          .timeline-item:hover .point-item strong {
            background: linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(59, 130, 246, 0.15));
            border-color: rgba(14, 165, 233, 0.2);
            color: #0ea5e9;
          }

          .components-footer {
            text-align: center;
            margin-top: 40px;
            position: relative;
            z-index: 2;
          }

          .explore-gallery-btn {
            background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%);
            color: white;
            border: none;
            padding: 16px 32px;
            border-radius: 50px;
            font-size: 1rem;
            font-weight: 700;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            letter-spacing: 0.5px;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 8px 25px rgba(14, 165, 233, 0.3);
            display: inline-flex;
            align-items: center;
            gap: 12px;
            text-transform: uppercase;
            position: relative;
            overflow: hidden;
          }

          .explore-gallery-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s ease;
          }

          .explore-gallery-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 35px rgba(14, 165, 233, 0.4);
            background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%);
          }

          .explore-gallery-btn:hover::before {
            left: 100%;
          }

          .explore-gallery-btn svg {
            transition: transform 0.3s ease;
          }

          .explore-gallery-btn:hover svg {
            transform: translateX(4px);
          }

          /* Creative Capabilities Section */
          .creative-capabilities {
            padding: 100px 0;
            background: white;
          }

          .capabilities-showcase {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 40px;
            margin-bottom: 60px;
          }

          .capability-card {
            position: relative;
            border-radius: 28px;
            overflow: hidden;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            height: 520px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
          }

          .capability-card:hover {
            transform: translateY(-15px) scale(1.02);
            box-shadow: 0 40px 80px rgba(0, 0, 0, 0.25);
            border-color: rgba(14, 165, 233, 0.3);
          }

          .capability-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 1;
          }

          .capability-card:hover::before {
            opacity: 1;
          }

          .card-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
          }

          .card-background img {
          width: 100%;
          height: 100%;
          object-fit: cover;
            transition: transform 0.4s ease;
          }

          .capability-card:hover .card-background img {
            transform: scale(1.05);
          }

          .card-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 100%);
            z-index: 2;
          }

          .card-content {
            position: relative;
            z-index: 3;
            padding: 45px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            color: white;
            background: linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 100%);
            backdrop-filter: blur(5px);
            gap: 20px;
          }

          .card-content > *:last-child {
            margin-top: auto;
          }

          .card-content .capability-cta {
            margin-top: auto;
            align-self: flex-start;
          }

          .capability-number {
            position: absolute;
            top: 25px;
            right: 25px;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #0ea5e9, #3b82f6);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 1.5rem;
            box-shadow: 0 8px 25px rgba(14, 165, 233, 0.5);
            border: 3px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            animation: float 3s ease-in-out infinite;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }

          .capability-icon {
            width: 90px;
            height: 90px;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
            backdrop-filter: blur(15px);
            border-radius: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 28px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
          }

          .capability-card:hover .capability-icon {
            transform: scale(1.1) rotate(5deg);
            background: linear-gradient(135deg, rgba(14, 165, 233, 0.3), rgba(59, 130, 246, 0.3));
          }

          .card-content h3 {
            font-size: 2.2rem;
            font-weight: 800;
            margin: 0 0 20px 0;
            background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #cbd5e1 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            letter-spacing: 0.5px;
          }

          .card-content p {
            font-size: 1rem;
            line-height: 1.6;
            margin: 0 0 24px 0;
            color: #e2e8f0;
          }

          .capability-features {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 20px;
            flex-grow: 0;
          }

          .feature-badge {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15));
            backdrop-filter: blur(15px);
            color: white;
            padding: 8px 16px;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 700;
            border: 2px solid rgba(255, 255, 255, 0.4);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            letter-spacing: 0.3px;
          }

          .feature-badge:hover {
            transform: translateY(-2px);
            background: linear-gradient(135deg, rgba(14, 165, 233, 0.3), rgba(59, 130, 246, 0.3));
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
          }

          .capability-cta {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%);
            color: white;
            border: none;
            padding: 14px 28px;
            border-radius: 50px;
            font-size: 0.9rem;
            font-weight: 700;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            letter-spacing: 0.5px;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 8px 25px rgba(14, 165, 233, 0.3);
            text-transform: uppercase;
            position: relative;
            overflow: hidden;
            margin-top: auto;
            align-self: flex-start;
          }

          .capability-cta::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s ease;
          }

          .capability-cta:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 35px rgba(14, 165, 233, 0.4);
            background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%);
          }

          .capability-cta:hover::before {
            left: 100%;
          }

          .capability-cta svg {
            transition: transform 0.3s ease;
          }

          .capability-cta:hover svg {
            transform: translateX(4px);
          }

          .capabilities-footer {
            text-align: center;
          }

          .main-cta {
            display: inline-flex;
            align-items: center;
            gap: 15px;
            background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%);
            color: white;
            border: none;
            padding: 28px 56px;
            border-radius: 60px;
            font-weight: 900;
            font-size: 1.4rem;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            letter-spacing: 1px;
            text-transform: uppercase;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 15px 40px rgba(14, 165, 233, 0.4);
            position: relative;
            overflow: hidden;
            cursor: pointer;
          }

          .main-cta::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            transition: left 0.6s ease;
          }

          .main-cta:hover {
            transform: translateY(-8px) scale(1.05);
            box-shadow: 0 25px 60px rgba(14, 165, 233, 0.5);
            background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%);
          }

          .main-cta:hover::before {
            left: 100%;
          }

          .main-cta svg {
            transition: transform 0.3s ease;
          }

          .main-cta:hover svg {
            transform: translateX(6px);
          }

          .section-header {
            text-align: center;
            margin-bottom: 64px;
          }

          .section-header h2 {
            font-size: 3rem;
            font-weight: 800;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin: 0 0 20px 0;
            text-align: center;
            position: relative;
          }

          .section-header h2::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 4px;
            background: linear-gradient(135deg, #0ea5e9, #3b82f6);
            border-radius: 2px;
          }

          .section-subtitle {
            font-size: 1.1rem;
            color: #64748b;
            margin: 0;
            max-width: 900px;
            margin-left: auto;
            margin-right: auto;
            line-height: 1.6;
            font-weight: 400;
            letter-spacing: 0.2px;
          }

          /* Excellence Section */
          .excellence-section {
            padding: 100px 0;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          }


          /* Responsive Design */
          @media (max-width: 1600px) {
            .capabilities-showcase {
              grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
              gap: 44px;
            }

            .capability-card {
              height: auto;
              min-height: 540px;
            }

            .card-content {
              padding: 50px;
            }

            .card-content h3 {
              font-size: 2.2rem;
            }

            .card-content p {
              font-size: 1.1rem;
            }

            .capability-cta {
              padding: 16px 32px;
              font-size: 1rem;
            }
          }

          @media (max-width: 1440px) {
            .capabilities-showcase {
              grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
              gap: 40px;
            }

            .capability-card {
              height: auto;
              min-height: 520px;
            }

            .card-content {
              padding: 45px;
            }

            .card-content h3 {
              font-size: 2.1rem;
            }

            .card-content p {
              font-size: 1.05rem;
            }

            .capability-cta {
              padding: 15px 30px;
              font-size: 0.95rem;
            }
          }

          @media (max-width: 1200px) {
            .capabilities-showcase {
              grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
              gap: 36px;
            }

            .capability-card {
              height: auto;
              min-height: 500px;
            }

            .card-content {
              padding: 40px;
            }

            .card-content h3 {
              font-size: 2rem;
            }

            .card-content p {
              font-size: 1rem;
            }

            .capability-cta {
              padding: 14px 28px;
              font-size: 0.9rem;
            }
          }

          @media (max-width: 1024px) {
            .capabilities-showcase {
              grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
              gap: 32px;
            }

            .capability-card {
              height: auto;
              min-height: 480px;
            }

            .card-content {
              padding: 35px;
            }

            .card-content h3 {
              font-size: 1.9rem;
            }

            .card-content p {
              font-size: 0.95rem;
            }

            .capability-cta {
              padding: 13px 26px;
              font-size: 0.85rem;
            }
          }

          @media (max-width: 1024px) and (min-width: 769px) {
            .components-timeline {
              padding: 0 20px;
            }

            .components-timeline::before {
              left: 25px;
            }

            .timeline-item {
              padding-left: 60px;
            }

            .timeline-marker {
              left: -40px;
              width: 55px;
              height: 55px;
            }

            .timeline-marker svg {
              width: 22px;
              height: 22px;
            }
          }

          @media (max-width: 768px) {
            .hero-text h1 {
              font-size: 3rem;
            }

            .hero-stats {
              gap: 30px;
            }

            .stat-item {
              padding: 1.5rem 1rem;
            }

            .section-header h2 {
              font-size: 2.5rem;
            }

            .section-subtitle {
              font-size: 1rem;
              max-width: 700px;
            }

            .capabilities-showcase {
              grid-template-columns: 1fr;
              gap: 30px;
            }

            .capability-card {
              height: auto;
              min-height: 500px;
            }

            .card-content {
              padding: 30px;
              gap: 20px;
            }

            .card-content h3 {
              font-size: 1.8rem;
            }

            .card-content p {
              font-size: 0.95rem;
              line-height: 1.5;
            }

            .capability-features {
              gap: 8px;
              margin-bottom: 20px;
            }

            .feature-badge {
              padding: 7px 14px;
              font-size: 0.85rem;
            }

            .capability-cta {
              padding: 12px 24px;
              font-size: 0.85rem;
              letter-spacing: 0.3px;
            }

            .main-cta {
              padding: 24px 48px;
              font-size: 1.3rem;
              letter-spacing: 0.8px;
            }
          }

          @media (max-width: 480px) {
            .hero-text h1 {
              font-size: 2rem;
            }

            .section-header h2 {
              font-size: 1.75rem;
            }

            .components-timeline {
              padding: 0 10px;
            }

            .components-timeline::before {
              left: 15px;
            }

            .timeline-item {
              padding-left: 45px;
              margin-bottom: 25px;
            }

            .timeline-marker {
              left: -30px;
              width: 45px;
              height: 45px;
            }

            .timeline-marker svg {
              width: 18px;
              height: 18px;
            }

            .section-subtitle {
              font-size: 0.85rem;
              max-width: 500px;
            }

            .capabilities-showcase {
              gap: 20px;
            }

            .capability-card {
              height: auto;
              min-height: 450px;
            }

            .card-content {
              padding: 20px;
              gap: 16px;
            }

            .card-content h3 {
              font-size: 1.4rem;
              margin-bottom: 12px;
            }

            .card-content p {
              font-size: 0.9rem;
              line-height: 1.5;
              margin-bottom: 16px;
            }

            .capability-icon {
              width: 50px;
              height: 50px;
              margin-bottom: 16px;
            }

            .capability-features {
              gap: 6px;
              margin-bottom: 16px;
            }

            .feature-badge {
              padding: 6px 12px;
              font-size: 0.8rem;
            }

            .capability-cta {
              padding: 10px 20px;
              font-size: 0.8rem;
              letter-spacing: 0.2px;
              margin-top: auto;
            }

            .capability-number {
              width: 45px;
              height: 45px;
              font-size: 1.2rem;
              top: 15px;
              right: 15px;
            }

            .main-cta {
              padding: 16px 32px;
              font-size: 1rem;
              letter-spacing: 0.4px;
            }
          }

          @media (max-width: 360px) {
            .capability-card {
              min-height: 420px;
            }

            .card-content {
              padding: 16px;
            }

            .card-content h3 {
              font-size: 1.3rem;
            }

            .card-content p {
              font-size: 0.85rem;
            }

            .capability-icon {
              width: 45px;
              height: 45px;
            }

            .feature-badge {
              padding: 5px 10px;
              font-size: 0.75rem;
            }

            .capability-cta {
              padding: 8px 16px;
              font-size: 0.75rem;
            }

            .capability-number {
              width: 40px;
              height: 40px;
              font-size: 1.1rem;
            }

            .components-timeline {
              padding: 0 15px;
            }

            .components-timeline::before {
              left: 20px;
            }

            .timeline-item {
              padding-left: 50px;
              margin-bottom: 30px;
            }

            .timeline-marker {
              left: -35px;
              width: 50px;
              height: 50px;
            }

            .timeline-marker svg {
              width: 20px;
              height: 20px;
            }

            .timeline-content {
              padding: 20px 16px;
            }

            .timeline-content h3 {
              font-size: 1.2rem;
              margin-bottom: 12px;
            }

            .point-item {
              font-size: 0.9rem;
              line-height: 1.5;
              margin-bottom: 10px;
            }

            .bullet-icon {
              font-size: 1rem;
              margin-right: 8px;
              width: 18px;
            }

            .point-item strong {
              padding: 2px 5px;
            }

            .explore-gallery-btn {
              padding: 12px 24px;
              font-size: 0.85rem;
            }
          }
        }
      `}</style>
      </main>
    </Layout>
  )
}