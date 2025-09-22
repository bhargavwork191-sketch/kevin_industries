import Layout from '../components/Layout'
import { useEffect, useState } from 'react'

export default function Gallery() {
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fallback images if no admin images are available
  const fallbackImages = [
    '/product_images/WhatsApp Image 2025-09-16 at 9.06.02 PM (1).jpeg',
    '/product_images/WhatsApp Image 2025-09-16 at 9.06.02 PM.jpeg',
    '/product_images/WhatsApp Image 2025-09-16 at 9.06.03 PM.jpeg',
    '/product_images/WhatsApp Image 2025-09-16 at 9.06.09 PM (1).jpeg',
    '/product_images/WhatsApp Image 2025-09-16 at 9.06.09 PM (2).jpeg',
    '/product_images/WhatsApp Image 2025-09-16 at 9.06.09 PM (3).jpeg',
    '/product_images/WhatsApp Image 2025-09-16 at 9.06.09 PM (4).jpeg',
    '/product_images/WhatsApp Image 2025-09-16 at 9.06.09 PM (5).jpeg',
    '/product_images/WhatsApp Image 2025-09-16 at 9.06.09 PM.jpeg',
    '/product_images/WhatsApp Image 2025-09-16 at 9.06.22 PM.jpeg',
    '/product_images/WhatsApp Image 2025-09-16 at 9.06.59 PM (1).jpeg',
    '/product_images/WhatsApp Image 2025-09-16 at 9.06.59 PM.jpeg',
    '/product_images/WhatsApp Image 2025-09-16 at 9.07.00 PM (1).jpeg',
    '/product_images/WhatsApp Image 2025-09-16 at 9.07.00 PM (2).jpeg',
    '/product_images/WhatsApp Image 2025-09-16 at 9.07.00 PM.jpeg',
    '/product_images/WhatsApp Image 2025-09-16 at 9.12.27 PM (1).jpeg',
    '/product_images/WhatsApp Image 2025-09-16 at 9.12.27 PM (2).jpeg',
    '/product_images/WhatsApp Image 2025-09-16 at 9.12.27 PM.jpeg',
    '/product_images/WhatsApp Image 2025-09-16 at 9.12.28 PM (1).jpeg',
    '/product_images/WhatsApp Image 2025-09-16 at 9.12.28 PM (2).jpeg',
    '/product_images/WhatsApp Image 2025-09-16 at 9.12.28 PM (3).jpeg',
    '/product_images/WhatsApp Image 2025-09-16 at 9.12.28 PM (4).jpeg',
    '/product_images/WhatsApp Image 2025-09-16 at 9.12.28 PM (5).jpeg',
    '/product_images/WhatsApp Image 2025-09-16 at 9.12.28 PM.jpeg',
    '/product_images/WhatsApp Image 2025-09-16 at 9.17.16 PM.jpeg'
  ]

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    try {
      // Try to load from public API first - specifically for gallery
      const response = await fetch('/api/images?type=gallery')
      if (response.ok) {
        const apiImages = await response.json()
        if (apiImages.length > 0) {
          // Map the data to ensure proper structure
          const mappedImages = apiImages.map((img, index) => ({
            id: img.id || `gallery-${index}`,
            src: img.url || img.src || img,
            alt: img.alt || `Manufacturing Process ${index + 1}`,
            title: img.title || `Product Image ${index + 1}`
          }))
          setImages(mappedImages)
        } else {
          // Fallback to static images
          const fallbackMapped = fallbackImages.map((img, index) => ({
            id: `fallback-${index}`,
            src: img,
            alt: `Manufacturing Process ${index + 1}`,
            title: `Product Image ${index + 1}`
          }))
          setImages(fallbackMapped)
        }
      } else {
        // Fallback to static images
        const fallbackMapped = fallbackImages.map((img, index) => ({
          id: `fallback-${index}`,
          src: img,
          alt: `Manufacturing Process ${index + 1}`,
          title: `Product Image ${index + 1}`
        }))
        setImages(fallbackMapped)
      }
    } catch (error) {
      console.error('Error loading images:', error)
      // Fallback to static images
      const fallbackMapped = fallbackImages.map((img, index) => ({
        id: `fallback-${index}`,
        src: img,
        alt: `Manufacturing Process ${index + 1}`,
        title: `Product Image ${index + 1}`
      }))
      setImages(fallbackMapped)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <main>
        <div className="gallery-container">
          {/* Hero Section */}
          <section className="gallery-hero">
            <div className="container">
              <div className="hero-content">
                <h1>Product Gallery</h1>
                <p className="hero-subtitle">
                  Real products showcasing our precision engineering capabilities in foundry, tool room, and casting
                </p>
                <div className="gallery-stats">
                  <div className="stat-item">
                    <div className="stat-number">{images.length}</div>
                    <div className="stat-label">Products</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">3</div>
                    <div className="stat-label">Divisions</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">100%</div>
                    <div className="stat-label">Quality</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Gallery Section */}
          <section className="gallery-section">
            <div className="container">
              {loading ? (
                <div className="loading-state">
                  <div className="loading-spinner"></div>
                  <p>Loading gallery...</p>
                </div>
              ) : (
                <div className="gallery-grid">
                  {images.map((image, index) => (
                    <div 
                      key={image.id} 
                      className="gallery-item"
                      onClick={() => setSelectedImage(image.src)}
                    >
                      <div className="image-container">
                        <img 
                          src={image.src} 
                          alt={image.alt}
                          loading="lazy"
                        />
                        <div className="image-overlay">
                          <div className="overlay-content">
                            <h3>{image.title}</h3>
                            <p>Click to view</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Image Modal */}
          {selectedImage && (
            <div className="image-modal" onClick={() => setSelectedImage(null)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button 
                  className="close-button"
                  onClick={() => setSelectedImage(null)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                <img src={selectedImage} alt="Manufacturing Process" />
              </div>
            </div>
          )}
        </div>

        <style jsx>{`
          .gallery-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
          }

          /* Hero Section */
          .gallery-hero {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
            color: white;
            padding: 100px 0;
            text-align: center;
            position: relative;
            overflow: hidden;
          }

          .gallery-hero::before {
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
            line-height: 1.6;
          }

          .gallery-stats {
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

          /* Gallery Section */
          .gallery-section {
            padding: 100px 0;
            background: white;
          }

          .loading-state {
            text-align: center;
            padding: 80px 0;
          }

          .loading-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid #e2e8f0;
            border-top: 4px solid #0ea5e9;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 24px;
          }

          .gallery-item {
            cursor: pointer;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            background: white;
          }

          .gallery-item:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          }

          .image-container {
            position: relative;
            width: 100%;
            height: 250px;
            overflow: hidden;
          }

          .gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
          }

          .gallery-item:hover img {
            transform: scale(1.05);
          }

          .image-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .gallery-item:hover .image-overlay {
            opacity: 1;
          }

          .overlay-content {
            text-align: center;
            color: white;
          }

          .overlay-content h3 {
            font-size: 1.25rem;
            font-weight: 700;
            margin: 0 0 8px 0;
          }

          .overlay-content p {
            font-size: 0.875rem;
            margin: 0;
            opacity: 0.9;
          }

          /* Image Modal */
          .image-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 20px;
          }

          .modal-content {
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
          }

          .modal-content img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 12px;
          }

          .close-button {
            position: absolute;
            top: -40px;
            right: 0;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background 0.3s ease;
          }

          .close-button:hover {
            background: rgba(255, 255, 255, 0.2);
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .hero-content h1 {
              font-size: 2.5rem;
            }

            .gallery-stats {
              gap: 24px;
            }

            .gallery-grid {
              grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
              gap: 16px;
            }

            .image-container {
              height: 200px;
            }
          }

          @media (max-width: 480px) {
            .hero-content h1 {
              font-size: 2rem;
            }

            .gallery-grid {
              grid-template-columns: 1fr;
            }

            .image-container {
              height: 180px;
            }
          }
        `}</style>
      </main>
    </Layout>
  )
}