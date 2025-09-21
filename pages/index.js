
import Layout from '../components/Layout'
import Carousel from '../components/Carousel'
import ExcellenceImages from '../components/ExcellenceImages.js'

export default function Home() {
  return (
    <Layout>
      <main>
        {/* Hero Section */}
        <section className="hero" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
          {/* Background carousel */}
          <div className="hero-carousel" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0
          }}>
            <Carousel page="home" />
          </div>

          {/* Hero content overlay */}
          <div className="hero-overlay" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
            zIndex: 1
          }}></div>

          {/* Hero content */}
          <div className="hero-inner" style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem 2rem',
            minHeight: '100vh',
            textAlign: 'center'
          }}>
            <div className="hero-content" style={{ maxWidth: '900px', color: '#fff' }}>
              <span className="tag" style={{ 
                display: 'inline-block',
                background: 'rgba(59, 130, 246, 0.1)',
                color: '#60a5fa',
                padding: '0.5rem 1rem',
                borderRadius: '50px',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '1rem',
                border: '1px solid rgba(59, 130, 246, 0.2)'
              }}>
                Six Decades of Precision
              </span>
              <h1 style={{ 
                fontSize: '4rem', 
                fontWeight: '800', 
                margin: '0 0 1rem 0',
                background: 'linear-gradient(135deg, #fff 0%, #e2e8f0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: '1.1'
              }}>
                Kevin Industries
              </h1>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '400', 
                margin: '0 0 2rem 0',
                color: '#cbd5e1',
                lineHeight: '1.6'
              }}>
                Engineering Excellence in Tooling, Casting & Machining
              </h2>
              <div style={{ 
                fontSize: '1.125rem', 
                color: '#e2e8f0', 
                marginBottom: '3rem',
                lineHeight: '1.7'
              }}>
                Kevin Industries – ISO 9001:2015 Certified. Delivering reliable
                foundry solutions, advanced machining, and tool-room expertise since 1963.
              </div>
              <div className="highlights" style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
                marginTop: '2rem'
              }}>
                <div className="card" style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  textAlign: 'left',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem',
                    marginBottom: '0.75rem'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: '700',
                      fontSize: '1.25rem'
                    }}>TR</div>
                    <div>
                      <strong style={{ color: '#fff', fontSize: '1.125rem' }}>Tool Room Expertise</strong>
                      <div style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>Die sets, jigs & fixtures</div>
                    </div>
                  </div>
                </div>
                <div className="card" style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  textAlign: 'left',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem',
                    marginBottom: '0.75rem'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: '700',
                      fontSize: '1.25rem'
                    }}>MS</div>
                    <div>
                      <strong style={{ color: '#fff', fontSize: '1.125rem' }}>Advanced Machine Shop</strong>
                      <div style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>Precision component machining</div>
                    </div>
                  </div>
                </div>
                <div className="card" style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  textAlign: 'left',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem',
                    marginBottom: '0.75rem'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: '700',
                      fontSize: '1.25rem'
                    }}>FS</div>
                    <div>
                      <strong style={{ color: '#fff', fontSize: '1.125rem' }}>Reliable Foundry Solutions</strong>
                      <div style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>Pressure die casting</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="section">
          <div className="section-header">
            <h2>Our Capabilities</h2>
            <div className="small">ISO 9001:2015 Certified – Rajkot, Gujarat</div>
          </div>
          <div className="grid">
            <div className="div-card">
              <h3>Tool Room</h3>
              <p className="small">
                Die sets, jigs, fixtures and tool development supporting high-precision
                production.
              </p>
            </div>
            <div className="div-card">
              <h3>Machine Shop</h3>
              <p className="small">
                Component machining to drawings and samples with strict tolerance control.
              </p>
            </div>
            <div className="div-card">
              <h3>Foundry</h3>
              <p className="small">Pressure die casting for durable, repeatable components.</p>
            </div>
          </div>
        </section>

        {/* Excellence Section */}
        <section className="section" style={{ 
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          padding: '6rem 0'
        }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ 
                fontSize: '3rem', 
                fontWeight: '800', 
                color: '#1e293b',
                margin: '0 0 1rem 0',
                background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Excellence in Manufacturing
              </h2>
              <div style={{ 
                fontSize: '1.25rem', 
                color: '#64748b',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>
                Showcasing our precision work and quality standards that have defined our industry leadership for six decades
              </div>
            </div>
            <ExcellenceImages />
          </div>
        </section>
      </main>

      <style jsx>{`
        .hero {
          min-height: 100vh;
          color: #fff;
          position: relative;
        }

        .hero-carousel :global(.swiper-slide img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-carousel :global(.swiper) {
          height: 100vh;
        }

        .hero-carousel :global(.swiper-slide) {
          height: 100vh;
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
          .hero-inner {
            padding: 2rem 1rem;
          }
          
          .hero-content h1 {
            font-size: 2.5rem !important;
          }
          
          .hero-content h2 {
            font-size: 1.25rem !important;
          }
          
          .highlights {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }

        @media (max-width: 480px) {
          .hero-content h1 {
            font-size: 2rem !important;
          }
          
          .hero-content h2 {
            font-size: 1.125rem !important;
          }
        }
      `}</style>
    </Layout>
  )
}