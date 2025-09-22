import Layout from '../components/Layout'
import { useState, useEffect } from 'react'

export default function Processes() {
  const [activeProcess, setActiveProcess] = useState(null)

  const capabilities = [
    {
      id: 'tool-room',
      title: 'Tool Room',
      description: 'Design, Make Die sets, maintenance of dies, develop tools, jigs and fixtures for different applications',
      image: '/web_images/k_img6.jpeg',
      icon: '🔧',
      sequence: 1
    },
    {
      id: 'foundry-casting',
      title: 'Foundry/Casting',
      description: 'Pressure Die castings and initial casting operations',
      image: '/web_images/k_img8.jpeg',
      icon: '🏭',
      sequence: 2
    },
    {
      id: 'machine-shop',
      title: 'Machine Shop',
      description: 'Machining of components as per drawing or samples',
      image: '/web_images/k_img1.jpg',
      icon: '⚙️',
      sequence: 3
    }
  ]

  const processSteps = [
    {
      id: 'die-design',
      title: 'Die Design/Develop Die Set',
      description: 'Creating precise die designs and developing complete die sets for production',
      image: '/web_images/k_img6.jpeg',
      position: 'start',
      sequence: 1
    },
    {
      id: 'pressure-die-casting',
      title: 'Pressure Die Casting & Heat Treatment',
      description: 'High-pressure metal casting process with integrated heat treatment for optimal material properties and precision components',
      image: '/web_images/k_img5.jpg',
      position: 'main',
      sequence: 2
    },
    {
      id: 'machining',
      title: 'Machining',
      description: 'Precision machining of cast components to exact specifications',
      image: '/web_images/k_img13.jpeg',
      position: 'main',
      sequence: 3
    },
    {
      id: 'multi-tooling',
      title: 'Multi Tooling/Multi Spindle Machines',
      description: 'Advanced multi-tooling operations for complex component manufacturing',
      image: '/web_images/k_img18.jpg',
      position: 'main',
      sequence: 4
    },
    {
      id: 'inspection-testing',
      title: 'Inspection / Testing',
      description: 'Comprehensive quality control and testing of finished components',
      image: '/web_images/k_img 11.jpeg',
      position: 'main',
      sequence: 5
    },
    {
      id: 'packaging',
      title: 'Packaging',
      description: 'Secure packaging of finished components for safe transportation',
      image: '/web_images/j_img19.jpg',
      position: 'end',
      sequence: 6
    },
    {
      id: 'dispatch',
      title: 'Dispatch',
      description: 'Final dispatch of packaged components to customers',
      image: '/web_images/k_img20.jpg',
      position: 'end',
      sequence: 7
    }
  ]

  return (
    <Layout>
      <main>
        <div className="processes-container">
          {/* Hero Section */}
          <section className="process-hero">
            <div className="container">
              <div className="hero-content">
                <h1>Our Manufacturing Processes</h1>
                <p className="hero-subtitle">Precision manufacturing excellence through advanced processes and cutting-edge technology</p>
                <div className="hero-stats">
                  <div className="stat-item">
                    <div className="stat-number">7</div>
                    <div className="stat-label">Process Steps</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">100%</div>
                    <div className="stat-label">Quality Control</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">ISO 9001</div>
                    <div className="stat-label">Certified</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Capabilities Section */}
          <section className="capabilities-section">
            <div className="container">
              <div className="section-header">
                <h2>Our Core Capabilities</h2>
                <p className="section-subtitle">Three specialized divisions working in perfect harmony</p>
              </div>
              <div className="capabilities-grid">
                {capabilities.map((capability) => (
                  <div key={capability.id} className="capability-card">
                    <div className="capability-icon">{capability.icon}</div>
                    <div className="capability-content">
                      <h3>{capability.title}</h3>
                      <p>{capability.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Process Timeline */}
          <section className="process-timeline-section">
            <div className="container">
              <div className="section-header">
                <h2>Manufacturing Process Flow</h2>
                <p className="section-subtitle">From design to delivery - our complete manufacturing journey</p>
              </div>
              
              <div className="timeline-container">
                {processSteps.map((step, index) => (
                  <div key={step.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                    <div className="timeline-content">
                      <div className="timeline-image">
                        <img src={step.image} alt={step.title} />
                        <div className="timeline-number">{step.sequence}</div>
                      </div>
                      <div className="timeline-text">
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                        <div className="timeline-features">
                          {step.title.includes('Casting') && (
                            <>
                              <span className="feature-badge">Heat Treatment</span>
                              <span className="feature-badge">Pressure Casting</span>
                              <span className="feature-badge">Quality Control</span>
                            </>
                          )}
                          {step.title.includes('Design') && (
                            <>
                              <span className="feature-badge">CAD Design</span>
                              <span className="feature-badge">Die Development</span>
                              <span className="feature-badge">Precision Tools</span>
                            </>
                          )}
                          {step.title.includes('Machining') && (
                            <>
                              <span className="feature-badge">CNC Machining</span>
                              <span className="feature-badge">Precision Tools</span>
                              <span className="feature-badge">Precision Finishing</span>
                            </>
                          )}
                          {step.title.includes('Multi Tooling') && (
                            <>
                              <span className="feature-badge">Multi-Spindle Operations</span>
                              <span className="feature-badge">Simultaneous Machining</span>
                              <span className="feature-badge">Complex Components</span>
                            </>
                          )}
                          {step.title.includes('Inspection') && (
                            <>
                              <span className="feature-badge">Dimensional Check</span>
                              <span className="feature-badge">Material Testing</span>
                              <span className="feature-badge">Quality Assurance</span>
                            </>
                          )}
                          {step.title.includes('Packaging') && (
                            <>
                              <span className="feature-badge">Secure Packaging</span>
                              <span className="feature-badge">Protective Materials</span>
                              <span className="feature-badge">Labeling</span>
                            </>
                          )}
                          {step.title.includes('Dispatch') && (
                            <>
                              <span className="feature-badge">Global Shipping</span>
                              <span className="feature-badge">Tracking</span>
                              <span className="feature-badge">Delivery</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    {index < processSteps.length - 1 && (
                      <div className="timeline-connector">
                        <div className="connector-line"></div>
                        <div className="connector-arrow">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Process Metrics */}
          <section className="metrics-section">
            <div className="container">
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-icon">⚙️</div>
                  <div className="metric-content">
                    <div className="metric-number">7</div>
                    <div className="metric-label">Process Steps</div>
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-icon">✅</div>
                  <div className="metric-content">
                    <div className="metric-number">100%</div>
                    <div className="metric-label">Quality Control</div>
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-icon">🏅</div>
                  <div className="metric-content">
                    <div className="metric-number">ISO 9001</div>
                    <div className="metric-label">Certified</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <style jsx>{`
          .processes-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
          }

          /* Hero Section */
          .process-hero {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
            color: white;
            padding: 100px 0;
            text-align: center;
            position: relative;
            overflow: hidden;
          }

          .process-hero::before {
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

          /* Capabilities Section */
          .capabilities-section {
            padding: 100px 0;
            background: white;
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
            font-size: 1.125rem;
            color: #64748b;
            margin: 0;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }

          .capabilities-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 32px;
          }

          .capability-card {
            background: white;
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            border: 1px solid #e2e8f0;
            transition: all 0.3s ease;
          }

          .capability-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          }

          .capability-icon {
            font-size: 4rem;
            margin-bottom: 24px;
          }

          .capability-content h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #0f172a;
            margin: 0 0 16px 0;
          }

          .capability-content p {
            font-size: 1rem;
            color: #64748b;
            line-height: 1.6;
            margin: 0;
          }

          /* Process Timeline Section */
          .process-timeline-section {
            padding: 100px 0;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          }

          .timeline-container {
            position: relative;
            max-width: 1000px;
            margin: 0 auto;
          }

          .timeline-container::before {
            content: '';
            position: absolute;
            left: 50%;
            top: 0;
            bottom: 0;
            width: 4px;
            background: linear-gradient(180deg, #0ea5e9 0%, #3b82f6 100%);
            transform: translateX(-50%);
            border-radius: 2px;
          }

          .timeline-item {
            position: relative;
            margin-bottom: 80px;
            width: 100%;
          }

          .timeline-item.left .timeline-content {
            flex-direction: row;
            text-align: left;
          }

          .timeline-item.right .timeline-content {
            flex-direction: row-reverse;
            text-align: right;
          }

          .timeline-content {
            display: flex;
            align-items: center;
            gap: 32px;
            background: white;
            border-radius: 20px;
            padding: 32px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            border: 1px solid #e2e8f0;
            transition: all 0.3s ease;
            position: relative;
          }

          .timeline-content:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          }

          .timeline-image {
            position: relative;
            flex-shrink: 0;
          }

          .timeline-image img {
            width: 200px;
            height: 150px;
            object-fit: cover;
            border-radius: 16px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          }

          .timeline-number {
            position: absolute;
            top: 50%;
            right: -20px;
            transform: translateY(-50%);
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #0ea5e9, #3b82f6);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1.125rem;
            box-shadow: 0 4px 15px rgba(14, 165, 233, 0.4);
          }

          .timeline-text {
            flex: 1;
          }

          .timeline-text h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #0f172a;
            margin: 0 0 12px 0;
          }

          .timeline-text p {
            font-size: 1rem;
            color: #64748b;
            line-height: 1.6;
            margin: 0 0 20px 0;
          }

          .timeline-features {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 16px;
          }

          .timeline-item.left .timeline-features {
            justify-content: flex-start;
          }

          .timeline-item.right .timeline-features {
            justify-content: flex-end;
          }

          .feature-badge {
            background: linear-gradient(135deg, #0ea5e9, #3b82f6);
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.875rem;
            font-weight: 600;
          }

          .timeline-connector {
            position: absolute;
            left: 50%;
            top: 100%;
            transform: translateX(-50%);
            z-index: 2;
          }

          .connector-line {
            width: 4px;
            height: 40px;
            background: linear-gradient(180deg, #0ea5e9, #3b82f6);
            border-radius: 2px;
          }

          .connector-arrow {
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            width: 24px;
            height: 24px;
            background: #0ea5e9;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
          }

          /* Metrics Section */
          .metrics-section {
            padding: 100px 0;
            background: white;
          }

          .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 32px;
          }

          .metric-card {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            border: 1px solid #e2e8f0;
            transition: all 0.3s ease;
          }

          .metric-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          }

          .metric-icon {
            font-size: 3rem;
            margin-bottom: 20px;
          }

          .metric-content {
            text-align: center;
          }

          .metric-number {
            font-size: 2.5rem;
            font-weight: 800;
            color: #0ea5e9;
            margin: 0 0 8px 0;
          }

          .metric-label {
            font-size: 1rem;
            color: #64748b;
            font-weight: 600;
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .hero-content h1 {
              font-size: 2.5rem;
            }

            .hero-stats {
              gap: 24px;
            }

            .capabilities-grid {
              grid-template-columns: 1fr;
            }

            .timeline-container::before {
              left: 20px;
            }

            .timeline-item.left .timeline-content,
            .timeline-item.right .timeline-content {
              flex-direction: column;
              text-align: center;
              margin-left: 40px;
            }

            .timeline-image img {
              width: 150px;
              height: 120px;
            }

            .timeline-number {
              top: -12px;
              right: -12px;
              transform: none;
            }

            .timeline-features {
              margin-top: 12px;
              justify-content: center;
            }

            .timeline-connector {
              left: 20px;
            }
          }

          @media (max-width: 480px) {
            .hero-content h1 {
              font-size: 2rem;
            }

            .timeline-item.left .timeline-content,
            .timeline-item.right .timeline-content {
              margin-left: 20px;
            }

            .timeline-image img {
              width: 120px;
              height: 100px;
            }

            .timeline-number {
              top: -12px;
              right: -12px;
              transform: none;
              width: 32px;
              height: 32px;
              font-size: 1rem;
            }

            .timeline-features {
              margin-top: 8px;
              justify-content: center;
            }

            .feature-badge {
              font-size: 0.75rem;
              padding: 4px 8px;
            }
          }
        `}</style>
      </main>
    </Layout>
  )
}