import { useState, useEffect } from 'react'

export default function DynamicImage({ 
  page = 'gallery', 
  section = null, 
  alt = 'Image', 
  className = '', 
  width = 300, 
  height = 200,
  priority = false,
  fallback = null,
  ...props 
}) {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    loadImages()
  }, [page, section])

  const loadImages = async () => {
    try {
      setLoading(true)
      setError(false)
      
      const params = new URLSearchParams({ page })
      if (section) params.append('section', section)
      
      const response = await fetch(`/api/images?${params}`)
      
      if (!response.ok) {
        console.warn('Failed to fetch images, using empty state')
        setImages([])
        return
      }
      
      const data = await response.json()
      setImages(data || [])
    } catch (err) {
      console.error('Error loading images:', err)
      setImages([])
      setError(false) // Don't set error to true, just show empty state
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className={`dynamic-image-loading ${className}`} style={{ width, height }}>
        <div className="loading-spinner"></div>
        <style jsx>{`
          .dynamic-image-loading {
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--bg);
            border-radius: 8px;
            border: 1px solid rgba(15, 23, 42, 0.1);
          }
          
          .loading-spinner {
            width: 24px;
            height: 24px;
            border: 2px solid #e2e8f0;
            border-top: 2px solid var(--accent);
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  if (images.length === 0) {
    if (fallback) {
      return fallback
    }
    
    // Show demo images for home gallery section
    if (page === 'home' && section === 'gallery') {
      const demoImages = [
        { id: 'demo-1', url: '/images/gallery_1.svg', alt_text: 'Precision Work 1' },
        { id: 'demo-2', url: '/images/gallery_2.svg', alt_text: 'Precision Work 2' },
        { id: 'demo-3', url: '/images/gallery_3.svg', alt_text: 'Precision Work 3' },
        { id: 'demo-4', url: '/images/gallery_4.svg', alt_text: 'Precision Work 4' },
        { id: 'demo-5', url: '/images/gallery_5.svg', alt_text: 'Precision Work 5' },
        { id: 'demo-6', url: '/images/gallery_6.svg', alt_text: 'Precision Work 6' }
      ];
      
      return (
        <div className={`dynamic-image-multiple ${className}`}>
          <div className="gallery-grid">
            {demoImages.map((image, index) => (
              <div key={image.id} className="gallery-item">
                <img
                  src={image.url}
                  alt={image.alt_text}
                  style={{ 
                    width: '100%', 
                    height: 'auto',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                  {...props}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Show empty placeholder for other cases
    return (
      <div className={`dynamic-image-empty ${className}`} style={{ width, height }}>
        <div className="empty-placeholder">
          <div className="empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21,15 16,10 5,21"/>
            </svg>
          </div>
          <h3>No Images Available</h3>
          <p>Images will appear here once they are uploaded through the admin panel.</p>
        </div>
        <style jsx>{`
          .dynamic-image-empty {
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--bg);
            border: 2px dashed rgba(15, 23, 42, 0.1);
            border-radius: 12px;
            min-height: 200px;
          }
          
          .empty-placeholder {
            text-align: center;
            padding: 32px;
            color: var(--muted);
          }
          
          .empty-icon {
            margin-bottom: 16px;
            color: rgba(15, 23, 42, 0.3);
          }
          
          .empty-placeholder h3 {
            margin: 0 0 8px;
            font-size: 18px;
            font-weight: 600;
            color: var(--text);
          }
          
          .empty-placeholder p {
            margin: 0;
            font-size: 14px;
            line-height: 1.5;
          }
        `}</style>
      </div>
    )
  }

  // For single image display
  if (images.length === 1) {
    const image = images[0]
    return (
      <div className={`dynamic-image-single ${className}`}>
        <img
          src={image.url}
          alt={image.alt_text || alt}
          style={{ 
            width: '100%', 
            height: 'auto',
            objectFit: 'cover',
            borderRadius: '8px'
          }}
          {...props}
        />
      </div>
    )
  }

  // For multiple images (carousel/gallery)
  return (
    <div className={`dynamic-image-multiple ${className}`}>
      {className === 'home-gallery' ? (
        <div className="gallery-grid">
          {images.map((image, index) => (
            <div key={image.id} className="gallery-item">
              <img
                src={image.url}
                alt={image.alt_text || `${alt} ${index + 1}`}
                style={{ 
                  width: '100%', 
                  height: 'auto',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
                {...props}
              />
            </div>
          ))}
        </div>
      ) : (
        images.map((image, index) => (
          <div key={image.id} className="image-item">
            <img
              src={image.url}
              alt={image.alt_text || `${alt} ${index + 1}`}
              style={{ 
                width: '100%', 
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '8px'
              }}
              {...props}
            />
          </div>
        ))
      )}
    </div>
  )
}
