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
            id: img.id || img.filename || `gallery-${index}`,
            url: img.url,
            alt: img.alt_text || img.alt || `Gallery Image ${index + 1}`,
            filename: img.filename,
            ...img
          }))
          setImages(mappedImages)
          setLoading(false)
          return
        }
      }
      
      // Fallback to original images only if no API images
      setImages(fallbackImages.map((url, index) => ({
        id: index,
        url,
        alt: `Manufacturing Process ${index + 1}`
      })))
    } catch (error) {
      console.error('Error loading images:', error)
      // Use fallback images
      setImages(fallbackImages.map((url, index) => ({
        id: index,
        url,
        alt: `Manufacturing Process ${index + 1}`
      })))
    }
    setLoading(false)
  }

  return (
    <Layout>
      <main>
        <section className="gallery-hero">
          <div className="container">
            <div className="gallery-header">
              <h1>Product Gallery</h1>
              <p className="gallery-subtitle">
                Real products showcasing our precision engineering capabilities in foundry, tool room, and casting
              </p>
            </div>
          </div>
        </section>

        <section className="gallery-section">
          <div className="container">
            {loading ? (
              <div className="loading">Loading images...</div>
            ) : (
              <div className="gallery-grid">
                {images.map((image, index) => (
                  <div 
                    key={image.id || index} 
                    className="gallery-item"
                    onClick={() => setSelectedImage(image.url)}
                  >
                    <img 
                      src={image.url} 
                      alt={image.alt_text || image.alt || `Manufacturing Process ${index + 1}`}
                      loading="lazy"
                    />
                    <div className="gallery-overlay">
                      <div className="gallery-info">
                        <h4>Precision Component #{index + 1}</h4>
                        <p>Manufactured with advanced tooling and casting techniques</p>
                        <div className="gallery-tags">
                          <span className="tag">ISO 9001:2015</span>
                          <span className="tag">Precision</span>
                          <span className="tag">Quality</span>
                        </div>
                      </div>
                      <div className="gallery-actions">
                        <button className="action-btn">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <polyline points="7,10 12,15 17,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
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
              <button className="close-btn" onClick={() => setSelectedImage(null)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <img src={selectedImage} alt="Manufacturing Process" />
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        /* Gallery Hero */
        .gallery-hero {
          background: linear-gradient(135deg, var(--nav), var(--accent));
          color: #fff;
          padding: 120px 0 80px;
          text-align: center;
        }

        .gallery-header h1 {
          font-size: 48px;
          font-weight: 800;
          margin: 0 0 24px;
          background: linear-gradient(135deg, #fff, #e2e8f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gallery-subtitle {
          font-size: 20px;
          color: #cbd5e1;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Gallery Section */
        .gallery-section {
          padding: 80px 0;
          background: var(--bg);
        }


        .loading {
          text-align: center;
          padding: 60px 20px;
          font-size: 18px;
          color: var(--muted);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
          margin-top: 48px;
        }

        .gallery-item {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: all 0.4s ease;
          background: var(--card);
          cursor: pointer;
          border: 1px solid rgba(15, 23, 42, 0.05);
        }

        .gallery-item:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: var(--shadow-xl);
          border-color: var(--accent);
        }

        .gallery-item img {
          width: 100%;
          height: 320px;
          object-fit: cover;
          transition: transform 0.4s ease;
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
          flex-direction: column;
          justify-content: space-between;
          padding: 24px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }

        .gallery-info h4 {
          color: #fff;
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 8px;
        }

        .gallery-info p {
          color: #cbd5e1;
          font-size: 14px;
          margin: 0 0 16px;
        }

        .gallery-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .tag {
          background: rgba(14, 165, 233, 0.2);
          color: #0ea5e9;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
          border: 1px solid rgba(14, 165, 233, 0.3);
        }

        .gallery-actions {
          display: flex;
          justify-content: flex-end;
        }

        .action-btn {
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #fff;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .action-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        /* Image Modal */
        .image-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
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

        .close-btn {
          position: absolute;
          top: -50px;
          right: 0;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #fff;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .gallery-header h1 {
            font-size: 36px;
          }
          
          .gallery-subtitle {
            font-size: 18px;
          }
          
          .gallery-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }
          
          .gallery-item img {
            height: 250px;
          }
        }

        @media (max-width: 480px) {
          .gallery-header h1 {
            font-size: 28px;
          }
        }
      `}</style>
    </Layout>
  )
}
