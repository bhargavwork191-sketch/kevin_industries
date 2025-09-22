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
                  <h2>Precision Engineering • Advanced Casting • Expert Machining</h2>
                  <p>Since 1963, we've been delivering world-class manufacturing solutions with ISO 9001:2015 certification. From precision tooling to advanced foundry operations and CNC machining, we bring your vision to life with unmatched quality and reliability.</p>
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

          {/* Creative Capabilities Section */}
          <section className="creative-capabilities">
            <div className="container">
              <div className="section-header">
                <h2>Our Manufacturing Capabilities</h2>
                <p className="section-subtitle">Three specialized capabilities working in perfect harmony to deliver exceptional manufacturing solutions tailored to your needs</p>
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
                    <h3>Precision Tooling</h3>
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
                    <h3>Advanced Casting</h3>
                    <p>State-of-the-art pressure die casting operations with precision-engineered molds and premium metal alloys. We deliver durable, high-quality components with exceptional dimensional accuracy and surface finish.</p>
                    <div className="capability-features">
                      <span className="feature-badge">Pressure Die Casting</span>
                      <span className="feature-badge">Heat Treatment</span>
                      <span className="feature-badge">Premium Alloys</span>
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
                    <h3>Precision Machining</h3>
                    <p>Advanced CNC machining services with multi-axis capabilities and precision tooling. We transform your designs into reality with meticulous attention to detail and rigorous quality control standards.</p>
                    <div className="capability-features">
                      <span className="feature-badge">CNC Machining</span>
                      <span className="feature-badge">Multi-Axis Operations</span>
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
                <h2>Manufacturing Excellence Showcase</h2>
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
          }

          .card-content > *:last-child {
            margin-top: auto;
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
            margin-bottom: 24px;
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
            gap: 6px;
            background: linear-gradient(135deg, #0ea5e9, #3b82f6);
            color: white;
            padding: 12px 24px;
            border-radius: 40px;
            text-decoration: none;
            font-weight: 700;
            font-size: 0.9rem;
            letter-spacing: 0.3px;
            text-transform: uppercase;
            transition: all 0.3s ease;
            box-shadow: 0 6px 20px rgba(14, 165, 233, 0.4);
            border: 2px solid rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(10px);
            margin-top: auto;
            align-self: flex-start;
            position: relative;
            overflow: hidden;
            cursor: pointer;
            font-family: inherit;
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

          .capability-cta:hover::before {
            left: 100%;
          }

          .capability-cta:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 30px rgba(14, 165, 233, 0.5);
            background: linear-gradient(135deg, #0284c7, #2563eb);
            border-color: rgba(255, 255, 255, 0.3);
            text-decoration: none;
            color: white;
          }

          .capability-cta:active {
            transform: translateY(-1px);
          }

          .capability-cta:focus {
            outline: none;
            box-shadow: 0 8px 25px rgba(14, 165, 233, 0.5), 0 0 0 4px rgba(14, 165, 233, 0.2);
          }

          .capabilities-footer {
            text-align: center;
          }

          .main-cta {
            display: inline-flex;
            align-items: center;
            gap: 15px;
            background: linear-gradient(135deg, #0f172a, #1e293b, #334155);
            color: white;
            padding: 28px 56px;
            border-radius: 60px;
            text-decoration: none;
            font-weight: 900;
            font-size: 1.4rem;
            letter-spacing: 1px;
            text-transform: uppercase;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 15px 40px rgba(15, 23, 42, 0.5);
            border: 3px solid rgba(255, 255, 255, 0.2);
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(10px);
            cursor: pointer;
            font-family: inherit;
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

          .main-cta:hover::before {
            left: 100%;
          }

          .main-cta:hover {
            transform: translateY(-8px) scale(1.05);
            box-shadow: 0 25px 60px rgba(15, 23, 42, 0.6);
            background: linear-gradient(135deg, #1e293b, #334155, #475569);
            border-color: rgba(14, 165, 233, 0.5);
          }

          .main-cta:active {
            transform: translateY(-4px) scale(1.02);
          }

          .main-cta:focus {
            outline: none;
            box-shadow: 0 15px 40px rgba(15, 23, 42, 0.5), 0 0 0 4px rgba(14, 165, 233, 0.2);
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
              height: 480px;
            }

            .card-content {
              padding: 35px;
            }

            .card-content h3 {
              font-size: 2rem;
            }

            .capability-cta {
              padding: 14px 28px;
              font-size: 1rem;
              letter-spacing: 0.4px;
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

            .capability-cta {
              padding: 12px 24px;
              font-size: 0.9rem;
              letter-spacing: 0.2px;
            }

            .main-cta {
              padding: 18px 36px;
              font-size: 1.1rem;
              letter-spacing: 0.4px;
          }
        }
      `}</style>
      </main>
    </Layout>
  )
}