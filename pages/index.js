
// import Layout from '../components/Layout'
// import Carousel from '../components/Carousel'

// export default function Home() {
//   return (
//     <Layout>
//       <main>
//         {/* Hero Section */}
//         <section className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
//           {/* Background carousel */}
//           <div className="hero-carousel" style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             zIndex: 0
//           }}>
//             <Carousel page="home" />
//           </div>

//           {/* Hero content */}
//           <div className="hero-inner" style={{
//             position: 'relative',
//             zIndex: 1,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             padding: '2rem',
//             flexWrap: 'wrap'
//           }}>
//             <div className="hero-content" style={{ maxWidth: '60%' }}>
//               <span className="tag">Six Decades of Precision</span>
//               <h1>Kevin Industries</h1>
//               <h2 className="h1">
//                 Engineering Excellence in Tooling, Casting & Machining
//               </h2>
//               <div className="lead">
//                 Kevin Industries – ISO 9001:2015 Certified. Delivering reliable
//                 foundry solutions, advanced machining, and tool-room expertise since 1963.
//               </div>
//               <div className="highlights" style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
//                 <div className="card">
//                   <div className="icon">TR</div>
//                   <div>
//                     <strong>Tool Room Expertise</strong>
//                     <div className="small">Die sets, jigs & fixtures</div>
//                   </div>
//                 </div>
//                 <div className="card">
//                   <div className="icon">MS</div>
//                   <div>
//                     <strong>Advanced Machine Shop</strong>
//                     <div className="small">Precision component machining</div>
//                   </div>
//                 </div>
//                 <div className="card">
//                   <div className="icon">FS</div>
//                   <div>
//                     <strong>Reliable Foundry Solutions</strong>
//                     <div className="small">Pressure die casting</div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right-side carousel */}
//             <div className="hero-side-carousel" style={{
//               width: '35%',
//               minWidth: '250px',
//               zIndex: 1
//             }}>
//               <Carousel page="home-side" />
//             </div>
//           </div>
//         </section>

//         {/* Capabilities Section */}
//         <section className="section">
//           <div className="section-header">
//             <h2>Our Capabilities</h2>
//             <div className="small">ISO 9001:2015 Certified – Rajkot, Gujarat</div>
//           </div>
//           <div className="grid">
//             <div className="div-card">
//               <h3>Tool Room</h3>
//               <p className="small">
//                 Die sets, jigs, fixtures and tool development supporting high-precision
//                 production.
//               </p>
//             </div>
//             <div className="div-card">
//               <h3>Machine Shop</h3>
//               <p className="small">
//                 Component machining to drawings and samples with strict tolerance control.
//               </p>
//             </div>
//             <div className="div-card">
//               <h3>Foundry</h3>
//               <p className="small">Pressure die casting for durable, repeatable components.</p>
//             </div>
//           </div>
//         </section>

//         {/* Gallery Section */}
//         <section className="section">
//           <h2>Snapshots of Our Precision Work</h2>
//           <div className="gallery-grid">
//             {[1, 2, 3, 4, 5, 6].map((i) => (
//               <div key={i} className="gallery-item">
//                 <img src={`/images/gallery_${i}.svg`} alt={`Work ${i}`} />
//               </div>
//             ))}
//           </div>
//         </section>
//       </main>

//       <style jsx>{`
//         .hero {
//           min-height: 80vh;
//           color: #fff;
//           position: relative;
//         }

//         .hero-carousel :global(.swiper-slide img) {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }

//         .hero-side-carousel :global(.swiper-slide img) {
//           width: 100%;
//           border-radius: 12px;
//           box-shadow: 0 12px 30px rgba(2, 6, 23, 0.2);
//         }

//         @media (max-width: 1024px) {
//           .hero-inner {
//             flex-direction: column;
//           }
//           .hero-content {
//             max-width: 100%;
//           }
//           .hero-side-carousel {
//             width: 100%;
//             margin-top: 16px;
//           }
//         }
//       `}</style>
//     </Layout>
//   )
// }
import Layout from '../components/Layout'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

// Dynamic import for Swiper carousel (no SSR)
const Carousel = dynamic(() => import('../components/Carousel'), { ssr: false })

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [carouselImages, setCarouselImages] = useState([])
  const [manufacturingImages, setManufacturingImages] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Fallback images if no admin images are available
  const fallbackCarouselImages = [
    '/product_images/WhatsApp Image 2025-09-16 at 9.06.03 PM.jpeg', // High quality casting
    '/product_images/WhatsApp Image 2025-09-16 at 9.06.09 PM (1).jpeg', // Precision components
    '/product_images/WhatsApp Image 2025-09-16 at 9.06.09 PM (2).jpeg', // Manufacturing process
    '/product_images/WhatsApp Image 2025-09-16 at 9.06.09 PM (4).jpeg', // Tool room work
    '/product_images/WhatsApp Image 2025-09-16 at 9.06.22 PM.jpeg' // Foundry casting
  ]

  const fallbackManufacturingImages = [
    '/product_images/WhatsApp Image 2025-09-16 at 9.06.59 PM (1).jpeg', // Machined parts
    '/product_images/WhatsApp Image 2025-09-16 at 9.07.00 PM (1).jpeg', // Precision tools
    '/product_images/WhatsApp Image 2025-09-16 at 9.12.27 PM (1).jpeg', // Quality components
    '/product_images/WhatsApp Image 2025-09-16 at 9.12.28 PM (2).jpeg', // Manufacturing setup
    '/product_images/WhatsApp Image 2025-09-16 at 9.12.28 PM (4).jpeg', // Final products
    '/product_images/WhatsApp Image 2025-09-16 at 9.12.28 PM (5).jpeg' // Quality control
  ]

  // Load carousel images
  useEffect(() => {
    loadCarouselImages()
    loadManufacturingImages()
  }, [])

  const loadCarouselImages = async () => {
    try {
      // Try to load from admin API first
      const response = await fetch('/api/admin/images?page=carousel')
      if (response.ok) {
        const adminImages = await response.json()
        if (adminImages.length > 0) {
          setCarouselImages(adminImages.map(img => img.url))
          return
        }
      }
      
      // Fallback to original images
      setCarouselImages(fallbackCarouselImages)
    } catch (error) {
      console.error('Error loading carousel images:', error)
      // Use fallback images
      setCarouselImages(fallbackCarouselImages)
    }
  }

  const loadManufacturingImages = async () => {
    try {
      // Try to load from admin API first
      const response = await fetch('/api/admin/images?page=manufacturing')
      if (response.ok) {
        const adminImages = await response.json()
        if (adminImages.length > 0) {
          setManufacturingImages(adminImages.map(img => img.url))
          setLoading(false)
          return
        }
      }
      
      // Fallback to original images
      setManufacturingImages(fallbackManufacturingImages)
    } catch (error) {
      console.error('Error loading manufacturing images:', error)
      // Use fallback images
      setManufacturingImages(fallbackManufacturingImages)
    }
    setLoading(false)
  }

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    if (carouselImages.length === 0) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [carouselImages.length])

  return (
    <Layout>
      <main>
        {/* Hero Section with Elegant Carousel */}
        <section className="hero">
          {/* Hero content */}
          <div className="hero-content">
            <div className="hero-text">
              <span className="hero-tag">Six Decades of Precision</span>
              <h1 className="hero-title">Kevin Industries</h1>
              <h2 className="hero-subtitle">
                Engineering Excellence in Foundry, Tool Room & Casting
              </h2>
              <p className="hero-description">
                ISO 9001:2015 Certified. Delivering reliable foundry solutions, 
                advanced tool room expertise, and precision casting since 1963.
              </p>
              
              {/* Capability highlights with icons */}
              <div className="capability-highlights">
                <div className="capability-card">
                  <div className="capability-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    </svg>
              </div>
                  <div className="capability-content">
                    <h3>Foundry Solutions</h3>
                    <p>Pressure die casting excellence</p>
                  </div>
                </div>
                
                <div className="capability-card">
                  <div className="capability-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className="capability-content">
                    <h3>Precision Casting</h3>
                    <p>Advanced machining solutions</p>
                  </div>
                </div>
                
                <div className="capability-card">
                  <div className="capability-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                      <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
                      <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className="capability-content">
                    <h3>Tool Room Expertise</h3>
                    <p>Die sets, jigs & fixtures</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Elegant Carousel Section */}
          <div className="carousel-section">
            {loading ? (
              <div className="carousel-loading">
                <div className="loading-spinner"></div>
                <p>Loading carousel images...</p>
              </div>
            ) : (
              <>
                <div className="carousel-container">
                  <button 
                    className="carousel-arrow carousel-arrow-left"
                    onClick={() => setCurrentImageIndex(prev => prev === 0 ? carouselImages.length - 1 : prev - 1)}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  
                  <div className="carousel-image-container">
                    <img 
                      src={carouselImages[currentImageIndex]} 
                      alt={`Manufacturing Process ${currentImageIndex + 1}`}
                      className="carousel-image"
                    />
                    <div className="carousel-overlay">
                      <div className="carousel-info">
                        <h4>Precision Component #{currentImageIndex + 1}</h4>
                        <p>Manufactured with advanced tooling and casting techniques</p>
                </div>
              </div>
            </div>

                  <button 
                    className="carousel-arrow carousel-arrow-right"
                    onClick={() => setCurrentImageIndex(prev => prev === carouselImages.length - 1 ? 0 : prev + 1)}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
            </div>

                <div className="carousel-indicators">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
            </div>
              </>
            )}
          </div>
        </section>

        {/* Capabilities Section - Updated Chronology */}
        <section className="capabilities-section">
          <div className="container">
          <div className="section-header">
              <h2>Our Manufacturing Capabilities</h2>
              <p className="section-subtitle">ISO 9001:2015 Certified – Rajkot, Gujarat</p>
            </div>
            
            <div className="capabilities-grid">
              <div className="capability-item">
                <div className="capability-icon-large">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Foundry Solutions</h3>
                <p>Advanced pressure die casting with precision molds and high-quality metal alloys for durable, repeatable components.</p>
                <ul className="capability-features">
                  <li>Pressure Die Casting</li>
                  <li>Metal Alloys</li>
                  <li>Precision Molds</li>
                  <li>Quality Control</li>
                </ul>
              </div>
              
              <div className="capability-item">
                <div className="capability-icon-large">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3>Precision Casting</h3>
                <p>Component machining to drawings and samples with strict tolerance control and advanced finishing processes.</p>
                <ul className="capability-features">
                  <li>Component Machining</li>
                  <li>Strict Tolerances</li>
                  <li>Surface Finishing</li>
                  <li>Quality Assurance</li>
                </ul>
              </div>
              
              <div className="capability-item">
                <div className="capability-icon-large">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
                    <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3>Tool Room Expertise</h3>
                <p>Die sets, jigs, fixtures and tool development supporting high-precision production with advanced machining capabilities.</p>
                <ul className="capability-features">
                  <li>Die Sets & Jigs</li>
                  <li>Custom Fixtures</li>
                  <li>Tool Development</li>
                  <li>Precision Machining</li>
                </ul>
            </div>
            </div>
          </div>
        </section>

        {/* Gallery Section with Real Product Images */}
        <section className="gallery-section">
          <div className="container">
            <div className="section-header">
              <h2>Our Manufacturing Excellence</h2>
              <p className="section-subtitle">Real products showcasing our precision engineering capabilities</p>
            </div>
          <div className="gallery-grid">
              {manufacturingImages.map((image, index) => (
                <div key={index} className="gallery-item">
                  <img 
                    src={image} 
                    alt={`Manufacturing Process ${index + 1}`}
                    loading="lazy"
                  />
                  <div className="gallery-overlay">
                    <div className="gallery-info">
                      <h4>Precision Component #{index + 1}</h4>
                      <p>Manufactured with advanced tooling and casting techniques</p>
                    </div>
                  </div>
              </div>
            ))}
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        /* Hero Section Styles */
        .hero {
          min-height: 80vh;
          position: relative;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, var(--nav), var(--accent));
          color: #fff;
          margin-top: 80px;
          padding: 60px 0;
        }

        .hero-content {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        /* Elegant Carousel Section */
        .carousel-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .carousel-container {
          position: relative;
          width: 100%;
          max-width: 700px;
          height: 500px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          background: var(--card);
          margin: 0 auto;
        }

        .carousel-image-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .carousel-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .carousel-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          padding: 24px;
          color: #fff;
        }

        .carousel-info h4 {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 8px;
        }

        .carousel-info p {
          font-size: 14px;
          margin: 0;
          opacity: 0.9;
        }

        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.9);
          border: none;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 2;
          color: var(--nav);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .carousel-arrow:hover {
          background: #fff;
          transform: translateY(-50%) scale(1.1);
        }

        .carousel-arrow-left {
          left: 16px;
        }

        .carousel-arrow-right {
          right: 16px;
        }

        .carousel-indicators {
          display: flex;
          gap: 12px;
          margin-top: 16px;
        }

        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.5);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: #fff;
          border-color: #fff;
        }

        .carousel-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 400px;
          color: #fff;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top: 4px solid #fff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .hero-text {
          max-width: 600px;
          color: #fff;
        }

        .hero-tag {
          display: inline-block;
          background: rgba(14, 165, 233, 0.2);
          color: #0ea5e9;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 24px;
          border: 1px solid rgba(14, 165, 233, 0.3);
        }

        .hero-title {
          font-size: 48px;
          font-weight: 800;
          margin: 0 0 16px;
          line-height: 1.1;
          background: linear-gradient(135deg, #fff, #e2e8f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 24px;
          font-weight: 600;
          margin: 0 0 24px;
          color: #e2e8f0;
          line-height: 1.3;
        }

        .hero-description {
          font-size: 18px;
          line-height: 1.6;
          color: #cbd5e1;
          margin: 0 0 40px;
          max-width: 500px;
        }

        .capability-highlights {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }

        .capability-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          min-width: 280px;
          transition: all 0.3s ease;
        }

        .capability-card:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-4px);
        }

        .capability-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, #0ea5e9, #f59e0b);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          flex-shrink: 0;
        }

        .capability-content h3 {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 4px;
          color: #fff;
        }

        .capability-content p {
          font-size: 14px;
          color: #cbd5e1;
          margin: 0;
        }

        /* Capabilities Section */
        .capabilities-section {
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
        }

        .capabilities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 40px;
        }

        .capability-item {
          background: var(--card);
          border-radius: 20px;
          padding: 40px;
          text-align: center;
          box-shadow: var(--shadow);
          transition: all 0.3s ease;
          border: 1px solid rgba(15, 23, 42, 0.05);
        }

        .capability-item:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
        }

        .capability-icon-large {
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

        .capability-item h3 {
          font-size: 24px;
          font-weight: 700;
          color: var(--nav);
          margin: 0 0 16px;
        }

        .capability-item p {
          font-size: 16px;
          color: var(--muted);
          line-height: 1.6;
          margin: 0 0 24px;
        }

        .capability-features {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .capability-features li {
          background: var(--bg);
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          color: var(--nav);
          text-align: center;
        }

        /* Gallery Section */
        .gallery-section {
          padding: 80px 0;
          background: var(--bg);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .gallery-item {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: all 0.3s ease;
          background: var(--card);
        }

        .gallery-item:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
        }

        .gallery-item img {
          width: 100%;
          height: 250px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .gallery-item:hover img {
          transform: scale(1.05);
        }

        .gallery-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.4));
          display: flex;
          align-items: flex-end;
          padding: 24px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }

        .gallery-info h4 {
          color: #fff;
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 8px;
        }

        .gallery-info p {
          color: #cbd5e1;
          font-size: 14px;
          margin: 0;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
          }

          .hero-title {
            font-size: 40px;
          }
          
          .hero-subtitle {
            font-size: 20px;
          }
          
          .capability-highlights {
            flex-direction: column;
          }
          
          .capability-card {
            min-width: auto;
          }

          .carousel-container {
            max-width: 500px;
            height: 400px;
          }
        }

        @media (max-width: 768px) {
          .hero {
            min-height: 70vh;
            padding: 40px 0;
          }
          
          .hero-title {
            font-size: 32px;
          }
          
          .hero-subtitle {
            font-size: 18px;
          }
          
          .hero-description {
            font-size: 16px;
          }
          
          .capabilities-grid {
            grid-template-columns: 1fr;
          }
          
          .gallery-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }
          
          .capability-features {
            grid-template-columns: 1fr;
          }

          .carousel-container {
            max-width: 400px;
            height: 350px;
          }

          .carousel-arrow {
            width: 40px;
            height: 40px;
          }
        }

        @media (max-width: 480px) {
          .hero-content {
            padding: 0 16px;
            gap: 30px;
          }
          
          .hero-title {
            font-size: 28px;
          }
          
          .section-header h2 {
            font-size: 28px;
          }
          
          .capability-item {
            padding: 24px;
          }

          .carousel-container {
            max-width: 350px;
            height: 300px;
          }

          .carousel-arrow {
            width: 36px;
            height: 36px;
          }

          .carousel-arrow-left {
            left: 8px;
          }

          .carousel-arrow-right {
            right: 8px;
          }
        }
      `}</style>
    </Layout>
  )
}
