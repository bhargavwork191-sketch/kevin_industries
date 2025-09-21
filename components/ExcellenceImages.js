import { useState, useEffect } from 'react'

export default function ExcellenceImages({ 
  className = '',
  ...props 
}) {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    try {
      setLoading(true)
      console.log('🔄 Loading excellence images...')
      
      const response = await fetch('/api/images?type=excellence')
      console.log('📡 Excellence API response status:', response.status)
      
      if (!response.ok) {
        console.warn('Failed to fetch excellence images, using empty state')
        setImages([])
        return
      }
      
      const data = await response.json()
      console.log('📦 Excellence API response data:', data)
      // Map the data to ensure proper structure
      const mappedImages = (data || []).map((img, index) => ({
        id: img.id || img.filename || `excellence-${index}`,
        url: img.url,
        alt_text: img.alt_text || `Excellence Image ${index + 1}`,
        filename: img.filename,
        ...img
      }))
      console.log('✅ Mapped excellence images:', mappedImages)
      setImages(mappedImages)
    } catch (err) {
      console.error('💥 Error loading excellence images:', err)
      setImages([])
    } finally {
      setLoading(false)
    }
  }


  if (loading) {
    return (
      <div className={`excellence-loading ${className}`}>
        <div className="loading-spinner"></div>
        <style jsx>{`
          .excellence-loading {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 60px 20px;
            background: var(--bg);
            border-radius: 12px;
          }
          
          .loading-spinner {
            width: 32px;
            height: 32px;
            border: 3px solid #e2e8f0;
            border-top: 3px solid var(--accent);
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
    return (
      <div className={`excellence-empty ${className}`}>
        <div className="empty-placeholder">
          <div className="empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 12l2 2 4-4"/>
              <path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h18z"/>
              <path d="M3 12v6c0 .552.448 1 1 1h16c.552 0 1-.448 1-1v-6"/>
            </svg>
          </div>
          <h3>Excellence in Manufacturing</h3>
          <p>Our precision work speaks for itself</p>
        </div>
        <style jsx>{`
          .excellence-empty {
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--bg);
            border: 2px dashed rgba(15, 23, 42, 0.1);
            border-radius: 12px;
            min-height: 200px;
            padding: 40px;
          }
          
          .empty-placeholder {
            text-align: center;
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

  return (
    <div className={`excellence-images ${className}`}>
      <div className="excellence-grid">
        {images.map((image, index) => (
          <div key={image.id || image.filename} className="excellence-item">
            <img
              src={image.url}
              alt={image.alt_text || `Excellence ${index + 1}`}
              style={{ 
                width: '100%', 
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '8px'
              }}
              {...props}
            />
            <div className="excellence-overlay">
              <h4>{image.alt_text || `Excellence ${index + 1}`}</h4>
              <p>Precision Manufacturing</p>
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .excellence-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          margin-top: 32px;
        }

        .excellence-item {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: all 0.3s ease;
          background: var(--card);
          cursor: pointer;
          border: 1px solid rgba(15, 23, 42, 0.05);
        }

        .excellence-item:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: var(--shadow-xl);
          border-color: var(--accent);
        }

        .excellence-item img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .excellence-item:hover img {
          transform: scale(1.05);
        }

        .excellence-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          color: white;
          padding: 20px;
          transform: translateY(100%);
          transition: transform 0.3s ease;
        }

        .excellence-item:hover .excellence-overlay {
          transform: translateY(0);
        }

        .excellence-overlay h4 {
          margin: 0 0 4px;
          font-size: 16px;
          font-weight: 600;
        }

        .excellence-overlay p {
          margin: 0;
          font-size: 14px;
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .excellence-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
          }
          
          .excellence-item img {
            height: 150px;
          }
        }
      `}</style>
    </div>
  )
}
