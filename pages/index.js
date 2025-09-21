
import Layout from '../components/Layout'
import Carousel from '../components/Carousel'

export default function Home() {
  return (
    <Layout>
      <main>
        {/* Hero Section */}
        <section className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
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

          {/* Hero content */}
          <div className="hero-inner" style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '2rem',
            flexWrap: 'wrap'
          }}>
            <div className="hero-content" style={{ maxWidth: '60%' }}>
              <span className="tag">Six Decades of Precision</span>
              <h1>Kevin Industries</h1>
              <h2 className="h1">
                Engineering Excellence in Tooling, Casting & Machining
              </h2>
              <div className="lead">
                Kevin Industries – ISO 9001:2015 Certified. Delivering reliable
                foundry solutions, advanced machining, and tool-room expertise since 1963.
              </div>
              <div className="highlights" style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                <div className="card">
                  <div className="icon">TR</div>
                  <div>
                    <strong>Tool Room Expertise</strong>
                    <div className="small">Die sets, jigs & fixtures</div>
                  </div>
                </div>
                <div className="card">
                  <div className="icon">MS</div>
                  <div>
                    <strong>Advanced Machine Shop</strong>
                    <div className="small">Precision component machining</div>
                  </div>
                </div>
                <div className="card">
                  <div className="icon">FS</div>
                  <div>
                    <strong>Reliable Foundry Solutions</strong>
                    <div className="small">Pressure die casting</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right-side carousel */}
            <div className="hero-side-carousel" style={{
              width: '35%',
              minWidth: '250px',
              zIndex: 1
            }}>
              <Carousel page="home-side" />
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

        {/* Gallery Section */}
        <section className="section">
          <h2>Snapshots of Our Precision Work</h2>
          <div className="gallery-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="gallery-item">
                <img src={`/images/gallery_${i}.svg`} alt={`Work ${i}`} />
              </div>
            ))}
          </div>
        </section>
      </main>

      <style jsx>{`
        .hero {
          min-height: 80vh;
          color: #fff;
          position: relative;
        }

        .hero-carousel :global(.swiper-slide img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-side-carousel :global(.swiper-slide img) {
          width: 100%;
          border-radius: 12px;
          box-shadow: 0 12px 30px rgba(2, 6, 23, 0.2);
        }

        @media (max-width: 1024px) {
          .hero-inner {
            flex-direction: column;
          }
          .hero-content {
            max-width: 100%;
          }
          .hero-side-carousel {
            width: 100%;
            margin-top: 16px;
          }
        }
      `}</style>
    </Layout>
  )
}