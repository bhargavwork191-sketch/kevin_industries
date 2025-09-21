import Layout from '../components/Layout'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../contexts/AuthContext'

export default function Admin() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()
  const [images, setImages] = useState([])
  const [carouselImages, setCarouselImages] = useState([])
  const [manufacturingImages, setManufacturingImages] = useState([])
  const [contactMessages, setContactMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [activeTab, setActiveTab] = useState('gallery')
  const [draggedItem, setDraggedItem] = useState(null)
  const [selectedMessage, setSelectedMessage] = useState(null)

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/')
    }
  }, [isLoading, isAuthenticated, router])

  // Load existing images
  useEffect(() => {
    if (isAuthenticated) {
      loadImages()
    }
  }, [isAuthenticated])

  const loadImages = async () => {
    setLoading(true)
    try {
      // Load gallery images
      const galleryResponse = await fetch('/api/admin/images?page=gallery')
      const galleryData = await galleryResponse.json()
      setImages(galleryData)

      // Load carousel images
      const carouselResponse = await fetch('/api/admin/images?page=carousel')
      const carouselData = await carouselResponse.json()
      setCarouselImages(carouselData)

      // Load manufacturing images
      const manufacturingResponse = await fetch('/api/admin/images?page=manufacturing')
      const manufacturingData = await manufacturingResponse.json()
      setManufacturingImages(manufacturingData)

      // Load contact messages
      const messagesResponse = await fetch('/api/contact')
      const messagesData = await messagesResponse.json()
      setContactMessages(messagesData)
    } catch (error) {
      console.error('Error loading data:', error)
    }
    setLoading(false)
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setUploading(true)
    const formData = new FormData()
    formData.append('image', selectedFile)
    formData.append('page', activeTab)

    try {
      const response = await fetch('/api/admin/images', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        await loadImages()
        setSelectedFile(null)
        setImagePreview(null)
        document.getElementById('fileInput').value = ''
      } else {
        alert('Error uploading image')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error uploading image')
    }
    setUploading(false)
  }

  const handleDelete = async (imageId) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      const response = await fetch(`/api/admin/images?id=${imageId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await loadImages()
      } else {
        alert('Error deleting image')
      }
    } catch (error) {
      console.error('Error deleting image:', error)
      alert('Error deleting image')
    }
  }

  const handleDragStart = (e, item) => {
    setDraggedItem(item)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = async (e, targetIndex) => {
    e.preventDefault()
    if (!draggedItem) return

    const currentImages = activeTab === 'gallery' ? images : 
                         activeTab === 'carousel' ? carouselImages : 
                         manufacturingImages

    const newImages = [...currentImages]
    const draggedIndex = newImages.findIndex(img => img.id === draggedItem.id)
    
    if (draggedIndex !== targetIndex) {
      // Remove dragged item
      const [removed] = newImages.splice(draggedIndex, 1)
      // Insert at new position
      newImages.splice(targetIndex, 0, removed)
      
      // Update order in database
      try {
        await fetch('/api/admin/images/reorder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            page: activeTab, 
            images: newImages.map((img, index) => ({ id: img.id, order: index }))
          })
        })
        
        // Update local state
        if (activeTab === 'gallery') setImages(newImages)
        else if (activeTab === 'carousel') setCarouselImages(newImages)
        else setManufacturingImages(newImages)
      } catch (error) {
        console.error('Error reordering images:', error)
      }
    }
    
    setDraggedItem(null)
  }

  const getCurrentImages = () => {
    switch (activeTab) {
      case 'carousel': return carouselImages
      case 'manufacturing': return manufacturingImages
      default: return images
    }
  }

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <Layout>
        <main>
          <div className="admin-container">
            <div className="loading-screen">
              <div className="loading-spinner"></div>
              <p>Checking authentication...</p>
            </div>
          </div>
        </main>
      </Layout>
    )
  }

  // Show login redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <Layout>
        <main>
          <div className="admin-container">
            <div className="auth-error">
              <h2>Access Denied</h2>
              <p>Please log in to access the admin dashboard.</p>
              <button onClick={() => router.push('/admin-login')} className="login-redirect-btn">
                Go to Login
              </button>
            </div>
          </div>
        </main>
      </Layout>
    )
  }

  return (
    <Layout>
      <main>
        <div className="admin-container">
          <div className="admin-header">
            <div className="header-content">
              <div>
                <h1>Admin Dashboard</h1>
                <p>Manage images and view contact messages</p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="tab-navigation">
            <button 
              className={`tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
              onClick={() => setActiveTab('gallery')}
            >
              Gallery Images
            </button>
            <button 
              className={`tab-btn ${activeTab === 'carousel' ? 'active' : ''}`}
              onClick={() => setActiveTab('carousel')}
            >
              Carousel Images
            </button>
            <button 
              className={`tab-btn ${activeTab === 'manufacturing' ? 'active' : ''}`}
              onClick={() => setActiveTab('manufacturing')}
            >
              Manufacturing Excellence
            </button>
            <button 
              className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
              onClick={() => setActiveTab('messages')}
            >
              Contact Messages ({contactMessages.length})
            </button>
          </div>

          {/* Upload Section - Only for Image Tabs */}
          {activeTab !== 'messages' && (
            <div className="upload-section">
              <h2>
                {activeTab === 'gallery' && 'Upload New Gallery Image'}
                {activeTab === 'carousel' && 'Upload New Carousel Image'}
                {activeTab === 'manufacturing' && 'Upload New Manufacturing Excellence Image'}
              </h2>
              <div className="upload-form">
                <div className="file-input-wrapper">
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="file-input"
                  />
                  <label htmlFor="fileInput" className="file-input-label">
                    Choose Image
                  </label>
                </div>
                
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Preview" />
                  </div>
                )}
                
                <button
                  onClick={handleUpload}
                  disabled={!selectedFile || uploading}
                  className="upload-btn"
                >
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </button>
              </div>
            </div>
          )}

          {/* Images Grid with Drag & Drop */}
          {activeTab !== 'messages' && (
            <div className="images-section">
              <h2>Current {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Images ({getCurrentImages().length})</h2>
              <p className="drag-hint">💡 Drag and drop images to reorder them</p>
              {loading ? (
                <div className="loading">Loading images...</div>
              ) : (
                <div className="images-grid">
                  {getCurrentImages().map((image, index) => (
                    <div 
                      key={image.id || index} 
                      className="image-card"
                      draggable
                      onDragStart={(e) => handleDragStart(e, image)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, index)}
                    >
                      <div className="drag-handle">⋮⋮</div>
                      <img src={image.url} alt={image.alt || `Image ${index + 1}`} />
                      <div className="image-actions">
                        <span className="order-number">{index + 1}</span>
                        <button
                          onClick={() => handleDelete(image.id || index)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Contact Messages Section */}
          {activeTab === 'messages' && (
            <div className="messages-section">
              <h2>Contact Messages ({contactMessages.length})</h2>
              {loading ? (
                <div className="loading">Loading messages...</div>
              ) : contactMessages.length === 0 ? (
                <div className="no-messages">
                  <p>No contact messages yet.</p>
                </div>
              ) : (
                <div className="messages-list">
                  {contactMessages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`message-card ${!message.read ? 'unread' : ''}`}
                      onClick={() => setSelectedMessage(message)}
                    >
                      <div className="message-header">
                        <div className="message-sender">
                          <div className="sender-avatar">
                            {message.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="sender-info">
                            <h4>{message.name}</h4>
                            <p>{message.email}</p>
                          </div>
                        </div>
                        <div className="message-meta">
                          <span className="message-time">
                            {new Date(message.timestamp).toLocaleDateString()}
                          </span>
                          {!message.read && <span className="unread-badge">New</span>}
                        </div>
                      </div>
                      <div className="message-preview">
                        <p>{message.message.substring(0, 100)}...</p>
                      </div>
                      {message.phone && (
                        <div className="message-phone">
                          <strong>Phone:</strong> {message.phone}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Message Popup Modal */}
        {selectedMessage && (
          <div className="message-modal" onClick={() => setSelectedMessage(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Contact Message</h3>
                <button 
                  className="close-btn" 
                  onClick={() => setSelectedMessage(null)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className="modal-body">
                <div className="message-details">
                  <div className="sender-section">
                    <div className="sender-avatar-large">
                      {selectedMessage.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="sender-details">
                      <h4>{selectedMessage.name}</h4>
                      <p>{selectedMessage.email}</p>
                      {selectedMessage.phone && <p>Phone: {selectedMessage.phone}</p>}
                    </div>
                  </div>
                  <div className="message-timestamp">
                    {new Date(selectedMessage.timestamp).toLocaleString()}
                  </div>
                </div>
                <div className="message-content">
                  <h5>Message:</h5>
                  <p>{selectedMessage.message}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        .admin-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .admin-header {
          margin-bottom: 40px;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .admin-header h1 {
          font-size: 36px;
          font-weight: 700;
          color: var(--nav);
          margin: 0 0 16px;
        }

        .logout-btn {
          background: #dc2626;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .logout-btn:hover {
          background: #b91c1c;
          transform: translateY(-2px);
        }

        .loading-screen {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          text-align: center;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e2e8f0;
          border-top: 4px solid #0ea5e9;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .auth-error {
          text-align: center;
          padding: 3rem 2rem;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 12px;
          max-width: 400px;
          margin: 2rem auto;
        }

        .auth-error h2 {
          color: #dc2626;
          margin-bottom: 1rem;
        }

        .auth-error p {
          color: #64748b;
          margin-bottom: 2rem;
        }

        .login-redirect-btn {
          background: #0ea5e9;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .login-redirect-btn:hover {
          background: #0284c7;
          transform: translateY(-2px);
        }

        .admin-header p {
          font-size: 18px;
          color: var(--muted);
          margin: 0;
        }

        /* Tab Navigation */
        .tab-navigation {
          display: flex;
          gap: 8px;
          margin-bottom: 32px;
          border-bottom: 2px solid var(--bg);
        }

        .tab-btn {
          padding: 12px 24px;
          background: transparent;
          border: none;
          border-bottom: 3px solid transparent;
          color: var(--muted);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: 8px 8px 0 0;
        }

        .tab-btn:hover {
          color: var(--nav);
          background: var(--bg);
        }

        .tab-btn.active {
          color: var(--accent);
          border-bottom-color: var(--accent);
          background: var(--bg);
        }

        .upload-section {
          background: var(--card);
          border-radius: 16px;
          padding: 32px;
          margin-bottom: 40px;
          box-shadow: var(--shadow);
        }

        .upload-section h2 {
          font-size: 24px;
          font-weight: 600;
          color: var(--nav);
          margin: 0 0 24px;
        }

        .upload-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .file-input-wrapper {
          position: relative;
        }

        .file-input {
          display: none;
        }

        .file-input-label {
          display: inline-block;
          padding: 12px 24px;
          background: var(--accent);
          color: white;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .file-input-label:hover {
          background: var(--accent2);
          transform: translateY(-2px);
        }

        .image-preview {
          max-width: 300px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: var(--shadow);
        }

        .image-preview img {
          width: 100%;
          height: auto;
          display: block;
        }

        .upload-btn {
          padding: 12px 24px;
          background: var(--accent3);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          max-width: 200px;
        }

        .upload-btn:hover:not(:disabled) {
          background: #059669;
          transform: translateY(-2px);
        }

        .upload-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .images-section {
          background: var(--card);
          border-radius: 16px;
          padding: 32px;
          box-shadow: var(--shadow);
        }

        .images-section h2 {
          font-size: 24px;
          font-weight: 600;
          color: var(--nav);
          margin: 0 0 8px;
        }

        .drag-hint {
          color: var(--muted);
          font-size: 14px;
          margin: 0 0 24px;
          font-style: italic;
        }

        .loading {
          text-align: center;
          padding: 40px;
          color: var(--muted);
          font-size: 18px;
        }

        .images-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }

        .image-card {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: all 0.3s ease;
          cursor: move;
        }

        .image-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .image-card:active {
          transform: scale(0.98);
        }

        .drag-handle {
          position: absolute;
          top: 8px;
          left: 8px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
          cursor: grab;
          z-index: 2;
        }

        .drag-handle:active {
          cursor: grabbing;
        }

        .image-card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .image-actions {
          position: absolute;
          top: 8px;
          right: 8px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: flex-end;
        }

        .order-number {
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
        }

        .delete-btn {
          padding: 6px 12px;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .delete-btn:hover {
          background: #dc2626;
          transform: scale(1.05);
        }

        /* Messages Section Styles */
        .messages-section {
          background: var(--card);
          border-radius: 16px;
          padding: 32px;
          box-shadow: var(--shadow);
        }

        .messages-section h2 {
          font-size: 24px;
          font-weight: 600;
          color: var(--nav);
          margin: 0 0 24px;
        }

        .no-messages {
          text-align: center;
          padding: 40px;
          color: var(--muted);
          font-size: 18px;
        }

        .messages-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .message-card {
          background: #fff;
          border: 1px solid rgba(15, 23, 42, 0.1);
          border-radius: 12px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .message-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
          border-color: var(--accent);
        }

        .message-card.unread {
          border-left: 4px solid var(--accent);
          background: rgba(14, 165, 233, 0.02);
        }

        .message-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .message-sender {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .sender-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 16px;
        }

        .sender-info h4 {
          font-size: 16px;
          font-weight: 600;
          color: var(--nav);
          margin: 0 0 4px;
        }

        .sender-info p {
          font-size: 14px;
          color: var(--muted);
          margin: 0;
        }

        .message-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }

        .message-time {
          font-size: 12px;
          color: var(--muted);
        }

        .unread-badge {
          background: var(--accent);
          color: #fff;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .message-preview {
          margin-bottom: 8px;
        }

        .message-preview p {
          font-size: 14px;
          color: var(--muted);
          margin: 0;
          line-height: 1.5;
        }

        .message-phone {
          font-size: 12px;
          color: var(--muted);
          margin-top: 8px;
        }

        /* Message Modal Styles */
        .message-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background: #fff;
          border-radius: 16px;
          max-width: 600px;
          width: 100%;
          max-height: 80vh;
          overflow: hidden;
          box-shadow: var(--shadow-xl);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid rgba(15, 23, 42, 0.1);
        }

        .modal-header h3 {
          font-size: 20px;
          font-weight: 600;
          color: var(--nav);
          margin: 0;
        }

        .close-btn {
          background: none;
          border: none;
          color: var(--muted);
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .close-btn:hover {
          background: rgba(15, 23, 42, 0.1);
          color: var(--nav);
        }

        .modal-body {
          padding: 24px;
          max-height: 60vh;
          overflow-y: auto;
        }

        .message-details {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(15, 23, 42, 0.1);
        }

        .sender-section {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .sender-avatar-large {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 24px;
        }

        .sender-details h4 {
          font-size: 18px;
          font-weight: 600;
          color: var(--nav);
          margin: 0 0 4px;
        }

        .sender-details p {
          font-size: 14px;
          color: var(--muted);
          margin: 0;
        }

        .message-timestamp {
          font-size: 12px;
          color: var(--muted);
          text-align: right;
        }

        .message-content h5 {
          font-size: 16px;
          font-weight: 600;
          color: var(--nav);
          margin: 0 0 12px;
        }

        .message-content p {
          font-size: 14px;
          color: var(--nav);
          line-height: 1.6;
          margin: 0;
          white-space: pre-wrap;
        }

        @media (max-width: 768px) {
          .admin-container {
            padding: 20px 16px;
          }

          .upload-section,
          .images-section {
            padding: 24px;
          }

          .images-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 16px;
          }
        }
      `}</style>
    </Layout>
  )
}