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
                  <span className="hero-tag">Six Decades of Precision</span>
                  <h1>Kevin Industries</h1>
                  <h2>Engineering Excellence in Tooling, Casting & Machining</h2>
                  <p>Kevin Industries – ISO 9001:2015 Certified. Delivering reliable foundry solutions, advanced machining, and tool-room expertise since 1963.</p>
                  <div className="hero-stats">
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
            </div>
          </section>

          {/* Creative Capabilities Section */}
          <section className="creative-capabilities">
            <div className="container">
              <div className="section-header">
                <h2>Our Divisions</h2>
                <p className="section-subtitle">Three core capabilities working in perfect harmony to deliver exceptional results</p>
              </div>
              
              <div className="capabilities-showcase">
                <div className="capability-card tool-room">
                  <div className="card-background">
                    <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop&crop=center" alt="Tool Room" />
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
                    <p>Die sets, jigs, fixtures and tool development supporting high-precision production with advanced machining capabilities.</p>
                    <div className="capability-features">
                      <span className="feature-badge">Die Sets & Jigs</span>
                      <span className="feature-badge">Custom Fixtures</span>
                      <span className="feature-badge">Tool Development</span>
                    </div>
                    <Link href="/processes" className="capability-cta">
                      Explore Process
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </Link>
                  </div>
                </div>

                <div className="capability-card foundry">
                  <div className="card-background">
                    <img src="https://images.unsplash.com/photo-1565812216238-4b3b73b0b8b8?w=600&h=400&fit=crop&crop=center" alt="Foundry" />
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
                    <h3>Foundry/Casting</h3>
                    <p>Advanced pressure die casting with precision molds and high-quality metal alloys for durable, repeatable components.</p>
                    <div className="capability-features">
                      <span className="feature-badge">Pressure Die Casting</span>
                      <span className="feature-badge">Heat Treatment</span>
                      <span className="feature-badge">Aluminum Alloys</span>
                    </div>
                    <Link href="/processes" className="capability-cta">
                      Explore Process
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </Link>
                  </div>
                </div>

                <div className="capability-card machine-shop">
                  <div className="card-background">
                    <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop&crop=center" alt="Machine Shop" />
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
                    <h3>Machine Shop</h3>
                    <p>Component machining to drawings and samples with advanced precision tools and strict quality control.</p>
                    <div className="capability-features">
                      <span className="feature-badge">CNC Machining</span>
                      <span className="feature-badge">Precision Tools</span>
                      <span className="feature-badge">Component Finishing</span>
                    </div>
                    <Link href="/processes" className="capability-cta">
                      Explore Process
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="capabilities-footer">
                <Link href="/processes" className="main-cta">
                  <span>View Complete Manufacturing Process</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
            </div>
          </div>
        </section>

        {/* Excellence Section */}
          <section className="excellence-section">
            <div className="container">
              <div className="section-header">
                <h2>Excellence in Manufacturing</h2>
                <p className="section-subtitle">Showcasing our precision engineering capabilities and quality craftsmanship</p>
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
            background: rgba(59, 130, 246, 0.1);
            color: #60a5fa;
            padding: 0.5rem 1rem;
            border-radius: 50px;
            font-size: 0.875rem;
            font-weight: 600;
            margin-bottom: 1rem;
            border: 1px solid rgba(59, 130, 246, 0.2);
          }

          .hero-text h1 {
            font-size: 4rem;
            font-weight: 800;
            margin: 0 0 1rem 0;
            background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            line-height: 1.1;
          }

          .hero-text h2 {
            font-size: 1.5rem;
            font-weight: 400;
            margin: 0 0 2rem 0;
            color: #cbd5e1;
            line-height: 1.6;
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
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            transition: all 0.4s ease;
            cursor: pointer;
            height: 500px;
          }

          .capability-card:hover {
            transform: translateY(-12px);
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
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
            padding: 40px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            color: white;
          }

          .capability-number {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #0ea5e9, #3b82f6);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1.25rem;
            box-shadow: 0 4px 15px rgba(14, 165, 233, 0.4);
          }

          .capability-icon {
            width: 80px;
            height: 80px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 24px;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .card-content h3 {
            font-size: 2rem;
            font-weight: 700;
            margin: 0 0 16px 0;
            background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
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
            margin-bottom: 24px;
          }

          .feature-badge {
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.875rem;
            font-weight: 600;
            border: 1px solid rgba(255, 255, 255, 0.3);
          }

          .capability-cta {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(135deg, #0ea5e9, #3b82f6);
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.875rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
            align-self: flex-start;
          }

          .capability-cta:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(14, 165, 233, 0.4);
          }

          .capabilities-footer {
            text-align: center;
          }

          .main-cta {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            background: linear-gradient(135deg, #0f172a, #1e293b);
            color: white;
            padding: 20px 40px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.125rem;
            transition: all 0.3s ease;
            box-shadow: 0 8px 25px rgba(15, 23, 42, 0.3);
          }

          .main-cta:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 35px rgba(15, 23, 42, 0.4);
          }

          .section-header {
            text-align: center;
            margin-bottom: 64px;
          }

          .section-header h2 {
            font-size: 2.5rem;
            font-weight: 700;
            color: #0f172a;
            margin: 0 0 16px 0;
          }

          .section-subtitle {
            font-size: 1rem;
            color: #64748b;
            margin: 0;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
            line-height: 1.4;
          }

          /* Excellence Section */
          .excellence-section {
            padding: 100px 0;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          }


          /* Responsive Design */
          @media (max-width: 768px) {
            .hero-text h1 {
              font-size: 2.5rem;
            }

            .hero-stats {
              gap: 24px;
            }

            .section-header h2 {
              font-size: 2rem;
            }

            .section-subtitle {
              font-size: 0.9rem;
              max-width: 600px;
            }

            .capabilities-showcase {
              grid-template-columns: 1fr;
              gap: 24px;
            }

            .capability-card {
              height: 450px;
            }

            .card-content {
              padding: 32px;
            }

            .card-content h3 {
              font-size: 1.75rem;
            }
          }

          @media (max-width: 480px) {
            .hero-text h1 {
              font-size: 2rem;
            }

            .section-header h2 {
              font-size: 1.75rem;
            }

            .section-subtitle {
              font-size: 0.85rem;
              max-width: 500px;
            }

            .capability-card {
              height: 400px;
            }

            .card-content {
              padding: 24px;
            }

            .card-content h3 {
              font-size: 1.5rem;
            }

            .capability-icon {
              width: 60px;
              height: 60px;
            }
          }
      `}</style>
      </main>
    </Layout>
  )
}