import { useState, useEffect } from 'react'

export default function CompanyProfileDownload() {
  const [companyProfile, setCompanyProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        const response = await fetch('/api/company-profile')
        if (response.ok) {
          const data = await response.json()
          setCompanyProfile(data)
        }
      } catch (error) {
        console.error('Error fetching company profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCompanyProfile()
  }, [])

  if (loading) {
    return (
      <div className="company-profile-download loading">
        <div className="loading-spinner"></div>
        <span>Loading...</span>
      </div>
    )
  }

  if (!companyProfile) {
    return null // Don't show anything if no company profile is available
  }

  const handleDownload = async () => {
    setDownloading(true)
    try {
      // Fetch the file from the URL
      const response = await fetch(companyProfile.url)
      if (!response.ok) {
        throw new Error('Failed to fetch file')
      }
      
      // Get the file blob
      const blob = await response.blob()
      
      // Create a custom filename
      const customFilename = companyProfile.original_filename || 'Kevin-Industries-Company-Profile.pdf'
      
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
      window.open(companyProfile.url, '_blank')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="company-profile-download">
      <button 
        onClick={handleDownload}
        className="download-btn"
        disabled={downloading}
        title={`Download ${companyProfile.title}`}
      >
        {downloading ? (
          <>
            <div className="loading-spinner"></div>
            <span>Downloading...</span>
          </>
        ) : (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span>Download Our Company Brochure</span>
          </>
        )}
      </button>
      
      <style jsx>{`
        .company-profile-download {
          display: inline-block;
        }

        .company-profile-download.loading {
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
          background: linear-gradient(135deg, var(--accent), #3b82f6);
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 8px rgba(14, 165, 233, 0.2);
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
          box-shadow: 0 8px 25px rgba(14, 165, 233, 0.3);
          background: linear-gradient(135deg, #0284c7, #2563eb);
        }

        .download-btn:hover::before {
          left: 100%;
        }

        .download-btn:active {
          transform: translateY(0);
          box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
        }

        .download-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .download-btn:disabled:hover {
          transform: none;
          box-shadow: 0 2px 8px rgba(14, 165, 233, 0.2);
          background: linear-gradient(135deg, var(--accent), #3b82f6);
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

        .download-btn span {
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .download-btn {
            padding: 10px 16px;
            font-size: 13px;
          }

          .download-btn span {
            display: none;
          }

          .download-btn svg {
            width: 18px;
            height: 18px;
          }
        }
      `}</style>
    </div>
  )
}
