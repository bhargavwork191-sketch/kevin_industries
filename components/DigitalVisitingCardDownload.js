import { useState, useEffect } from 'react'

export default function DigitalVisitingCardDownload() {
  const [visitingCard, setVisitingCard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    const fetchVisitingCard = async () => {
      try {
        const response = await fetch('/api/digital-visiting-card')
        if (response.ok) {
          const data = await response.json()
          setVisitingCard(data)
        }
      } catch (error) {
        console.error('Error fetching digital visiting card:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVisitingCard()
  }, [])

  if (loading) {
    return (
      <div className="digital-visiting-card-download loading">
        <div className="loading-spinner"></div>
        <span>Loading...</span>
      </div>
    )
  }

  if (!visitingCard) {
    return null // Don't show anything if no visiting card is available
  }

  const handleDownload = async () => {
    setDownloading(true)
    try {
      // Fetch the file from the URL
      const response = await fetch(visitingCard.url)
      if (!response.ok) {
        throw new Error('Failed to fetch file')
      }
      
      // Get the file blob
      const blob = await response.blob()
      
      // Create a custom filename
      const customFilename = visitingCard.filename || 'Kevin-Industries-Digital-Visiting-Card.pdf'
      
      // Create a blob URL and download
      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = customFilename
      link.style.display = 'none'
      
      // Trigger download
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Clean up the blob URL
      window.URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error('Error downloading file:', error)
      // Fallback to opening in new tab if download fails
      window.open(visitingCard.url, '_blank')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="digital-visiting-card-download">
      <button 
        onClick={handleDownload}
        className="download-btn"
        disabled={downloading}
        title={`Download ${visitingCard.title}`}
      >
        {downloading ? (
          <>
            <div className="loading-spinner"></div>
            <span className="download-text">Downloading...</span>
          </>
        ) : (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span className="download-text desktop-text">Download Digital Visiting Card</span>
            <span className="download-text mobile-text">Download</span>
          </>
        )}
      </button>
      
      <style jsx>{`
        .digital-visiting-card-download {
          display: inline-block;
        }

        .digital-visiting-card-download.loading {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--muted);
          font-size: 14px;
        }

        .loading-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid #e2e8f0;
          border-top: 2px solid var(--accent);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .download-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #f97316, #fb923c);
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 8px rgba(249, 115, 22, 0.2);
          text-decoration: none;
          position: relative;
          overflow: hidden;
        }

        .download-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .download-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(249, 115, 22, 0.3);
          background: linear-gradient(135deg, #ea580c, #f97316);
        }

        .download-btn:hover::before {
          left: 100%;
        }

        .download-btn:active {
          transform: translateY(0);
          box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
        }

        .download-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .download-btn:disabled:hover {
          transform: none;
          box-shadow: 0 2px 8px rgba(249, 115, 22, 0.2);
          background: linear-gradient(135deg, #f97316, #fb923c);
        }

        .download-btn .loading-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .download-btn svg {
          flex-shrink: 0;
        }

        .download-text {
          white-space: nowrap;
        }

        .mobile-text {
          display: none;
        }

        .desktop-text {
          display: inline;
        }

        @media (max-width: 768px) {
          .download-btn {
            padding: 10px 16px;
            font-size: 13px;
          }

          .mobile-text {
            display: inline;
          }

          .desktop-text {
            display: none;
          }

          .download-btn svg {
            width: 16px;
            height: 16px;
          }
        }
      `}</style>
    </div>
  )
}
