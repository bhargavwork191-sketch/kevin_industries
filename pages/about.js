import Layout from '../components/Layout'
import CompanyProfileDownload from '../components/CompanyProfileDownload'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function About() {
  const [imgs, setImgs] = useState([])

  useEffect(() => {
    fetch('/api/images?page=about')
      .then(res => res.json())
      .then(data => setImgs(data))
  }, [])

  return (
    <Layout>
      <main>
        <div className="about-container">
          {/* Hero Section */}
          <section className="about-hero">
            <div className="container">
              <div className="hero-content">
                <h1>About Kevin Industries</h1>
                <p className="hero-subtitle">Precision manufacturing excellence since our founding, delivering world-class components through advanced technology and unwavering commitment to quality.</p>
                <div className="hero-stats">
                  <div className="stat-item">
                    <div className="stat-number">60+</div>
                    <div className="stat-label">Years Experience</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">100%</div>
                    <div className="stat-label">Quality Focus</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">ISO 9001</div>
                    <div className="stat-label">Certified</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Company Overview */}
          <section className="company-overview">
            <div className="container">
              <div className="overview-content">
                <div className="overview-text">
                  <h2>Manufacturing Excellence</h2>
                  <p>Kevin Industries stands at the forefront of precision manufacturing, combining decades of expertise with cutting-edge technology to deliver exceptional components for industries worldwide.</p>
                  <p>Our commitment to quality, innovation, and customer satisfaction drives every aspect of our operations, ensuring that each component meets the highest standards of precision and reliability.</p>
                  <div className="overview-features">
                    <div className="feature-item">
                      <div className="feature-icon">🎯</div>
                      <div className="feature-text">
                        <h4>Precision Focus</h4>
                        <p>Exact specifications and tight tolerances</p>
                      </div>
                    </div>
                    <div className="feature-item">
                      <div className="feature-icon">⚡</div>
                      <div className="feature-text">
                        <h4>Advanced Technology</h4>
                        <p>State-of-the-art machinery and processes</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="overview-image">
                  <img src="/web_images/k_img4.jpeg" alt="Manufacturing Excellence" />
                </div>
              </div>
            </div>
          </section>


          {/* Process Flow */}
          <section className="process-flow-section">
            <div className="container">
              <div className="section-header">
                <h2>Our Manufacturing Journey</h2>
                <p className="section-subtitle">From design to delivery - a seamless workflow ensuring quality at every step</p>
              </div>
              
              <div className="flow-container">
                <div className="process-flow-diagram">
                  <div className="flow-step">
                    <div className="step-icon">🔧</div>
                    <div className="step-content">
                      <h3>Die Design & Development</h3>
                      <p>Creating precise die designs and developing complete die sets</p>
                    </div>
                  </div>
                  
                  <div className="flow-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                  
                  <div className="flow-step">
                    <div className="step-icon">🏭</div>
                    <div className="step-content">
                      <h3>Pressure Die Casting & Heat Treatment</h3>
                      <p>High-pressure casting with integrated heat treatment</p>
                    </div>
                  </div>
                  
                  <div className="flow-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                  
                  <div className="flow-step">
                    <div className="step-icon">⚙️</div>
                    <div className="step-content">
                      <h3>Precision Machining</h3>
                      <p>Advanced CNC machining and multi-tooling operations</p>
                    </div>
                  </div>
                  
                  <div className="flow-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                  
                  <div className="flow-step">
                    <div className="step-icon">✅</div>
                    <div className="step-content">
                      <h3>Quality Control & Testing</h3>
                      <p>Comprehensive inspection and testing</p>
                    </div>
                  </div>
                  
                  <div className="flow-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                  
                  <div className="flow-step">
                    <div className="step-icon">📦</div>
                    <div className="step-content">
                      <h3>Packaging & Dispatch</h3>
                      <p>Secure packaging and global dispatch</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Company Brochure Section */}
          <section className="brochure-section">
            <div className="container">
              <div className="brochure-content">
                <div className="brochure-text">
                  <h2>Our Company Profile</h2>
                  <p>Explore our comprehensive company brochure featuring our manufacturing capabilities, quality certifications, and industry expertise.</p>
                </div>
                <div className="brochure-action">
                  <CompanyProfileDownload />
                </div>
              </div>
            </div>
          </section>

          {/* Quality & Certifications */}
          <section className="quality-section">
            <div className="container">
              <div className="quality-content">
                <div className="quality-text">
                  <h2>Quality & Certifications</h2>
                  <p>We maintain the highest standards of quality through rigorous processes and international certifications.</p>
                  <div className="certifications">
                    <div className="cert-item">
                      <div className="cert-icon">🏅</div>
                      <div className="cert-text">
                        <h4>ISO 9001:2015</h4>
                        <p>Quality Management System</p>
                      </div>
                    </div>
                    <div className="cert-item">
                      <div className="cert-icon">✅</div>
                      <div className="cert-text">
                        <h4>100% Quality Control</h4>
                        <p>Every component inspected</p>
                      </div>
                    </div>
                    <div className="cert-item">
                      <div className="cert-icon">🔬</div>
                      <div className="cert-text">
                        <h4>Material Testing</h4>
                        <p>Comprehensive testing protocols</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="quality-image">
                  <img src="/web_images/k_img5.jpeg" alt="Quality Control" />
                </div>
              </div>
            </div>
          </section>
        </div>

        <style jsx>{`
          .about-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
          }

          /* Hero Section */
          .about-hero {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
            color: white;
            padding: 100px 0;
            text-align: center;
            position: relative;
            overflow: hidden;
          }

          .about-hero::before {
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
            max-width: 800px;
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

          /* Company Overview */
          .company-overview {
            padding: 100px 0;
            background: white;
          }

          .overview-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 64px;
            align-items: center;
          }

          .overview-text h2 {
            font-size: 2.5rem;
            font-weight: 700;
            color: #0f172a;
            margin: 0 0 24px 0;
          }

          .overview-text p {
            font-size: 1.125rem;
            color: #64748b;
            line-height: 1.6;
            margin: 0 0 20px 0;
          }

          .overview-features {
            margin-top: 32px;
          }

          .feature-item {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 20px;
          }

          .feature-icon {
            font-size: 2rem;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #0ea5e9, #3b82f6);
            border-radius: 12px;
          }

          .feature-text h4 {
            font-size: 1.125rem;
            font-weight: 600;
            color: #0f172a;
            margin: 0 0 4px 0;
          }

          .feature-text p {
            font-size: 0.875rem;
            color: #64748b;
            margin: 0;
          }

          .overview-image img {
            width: 100%;
            height: 400px;
            object-fit: cover;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          }

          /* Process Flow Section */
          .process-flow-section {
            padding: 100px 0;
            background: white;
          }

          .flow-container {
            max-width: 1200px;
            margin: 0 auto;
          }

          .process-flow-diagram {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 16px;
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            border: 1px solid #e2e8f0;
          }

          .flow-step {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border-radius: 16px;
            padding: 24px;
            text-align: center;
            border: 1px solid #e2e8f0;
            transition: all 0.3s ease;
            flex: 1;
            min-width: 180px;
            position: relative;
          }

          .flow-step:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            border-color: #0ea5e9;
          }

          .step-icon {
            font-size: 2rem;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #0ea5e9, #3b82f6);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 16px;
            box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
          }

          .step-content h3 {
            font-size: 1.125rem;
            font-weight: 700;
            color: #0f172a;
            margin: 0 0 8px 0;
            line-height: 1.3;
          }

          .step-content p {
            font-size: 0.875rem;
            color: #64748b;
            line-height: 1.4;
            margin: 0;
          }

          .flow-arrow {
            color: #0ea5e9;
            flex-shrink: 0;
            background: white;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(14, 165, 233, 0.2);
          }


          /* Quality Section */
          .quality-section {
            padding: 100px 0;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          }

          .quality-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 64px;
            align-items: center;
          }

          .quality-text h2 {
            font-size: 2.5rem;
            font-weight: 700;
            color: #0f172a;
            margin: 0 0 24px 0;
          }

          .quality-text p {
            font-size: 1.125rem;
            color: #64748b;
            line-height: 1.6;
            margin: 0 0 32px 0;
          }

          .certifications {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .cert-item {
            display: flex;
            align-items: center;
            gap: 16px;
            background: white;
            padding: 20px;
            border-radius: 16px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          }

          .cert-icon {
            font-size: 2rem;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #0ea5e9, #3b82f6);
            border-radius: 12px;
          }

          .cert-text h4 {
            font-size: 1.125rem;
            font-weight: 600;
            color: #0f172a;
            margin: 0 0 4px 0;
          }

          .cert-text p {
            font-size: 0.875rem;
            color: #64748b;
            margin: 0;
          }

          .quality-image img {
            width: 100%;
            height: 400px;
            object-fit: cover;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .hero-content h1 {
              font-size: 2.5rem;
            }

            .hero-stats {
              gap: 24px;
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

            .overview-content,
            .quality-content {
              grid-template-columns: 1fr;
              gap: 32px;
            }

            .process-flow-diagram {
              flex-direction: column;
              padding: 24px;
            }

            .flow-arrow {
              transform: rotate(90deg);
            }
          }

          @media (max-width: 480px) {
            .hero-content h1 {
              font-size: 2rem;
            }

            .flow-step {
              padding: 24px;
            }
          }
        `}</style>
      </main>
    </Layout>
  )
}