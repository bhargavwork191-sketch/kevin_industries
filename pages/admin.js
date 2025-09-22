import Layout from '../components/Layout'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../contexts/AuthContext'

export default function Admin() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()
  const [galleryImages, setGalleryImages] = useState([])
  const [excellenceImages, setExcellenceImages] = useState([])
  const [carosalImages, setCarosalImages] = useState([])
  const [contactMessages, setContactMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [activeTab, setActiveTab] = useState('gallery')
  const [draggedItem, setDraggedItem] = useState(null)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [touchStartX, setTouchStartX] = useState(0)
  const [touchEndX, setTouchEndX] = useState(0)

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

  // Refresh image counts when switching tabs
  useEffect(() => {
    if (isAuthenticated && activeTab) {
      refreshImageCounts()
    }
  }, [activeTab, isAuthenticated])

  // Touch gesture handlers for mobile tab navigation
  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return
    
    const distance = touchStartX - touchEndX
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      // Swipe left - go to next tab
      const tabs = ['gallery', 'excellence', 'carosal', 'messages']
      const currentIndex = tabs.indexOf(activeTab)
      if (currentIndex < tabs.length - 1) {
        setActiveTab(tabs[currentIndex + 1])
      }
    } else if (isRightSwipe) {
      // Swipe right - go to previous tab
      const tabs = ['gallery', 'excellence', 'carosal', 'messages']
      const currentIndex = tabs.indexOf(activeTab)
      if (currentIndex > 0) {
        setActiveTab(tabs[currentIndex - 1])
      }
    }
  }

  const loadImages = async () => {
    setLoading(true)
    try {
      // Load gallery images
      const galleryResponse = await fetch('/api/admin/images?type=gallery')
      const galleryData = await galleryResponse.json()
      setGalleryImages(galleryData)

      // Load excellence images
      const excellenceResponse = await fetch('/api/admin/images?type=excellence')
      const excellenceData = await excellenceResponse.json()
      setExcellenceImages(excellenceData)

      // Load carosal images
      const carosalResponse = await fetch('/api/admin/images?type=carosal')
      const carosalData = await carosalResponse.json()
      setCarosalImages(carosalData)

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
    console.log('📁 File input changed')
    const file = event.target.files[0]
    console.log('📄 Selected file:', file)
    if (file) {
      console.log('✅ File selected, setting state')
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target.result)
      reader.readAsDataURL(file)
    } else {
      console.log('❌ No file selected')
    }
  }

  const handleUpload = async () => {
    console.log('🚀 Upload button clicked!')
    console.log('📁 Selected file:', selectedFile)
    console.log('🏷️ Active tab:', activeTab)
    
    if (!selectedFile) {
      console.log('❌ No file selected')
      return
    }

    console.log('📤 Starting upload...')
    setUploading(true)
    const formData = new FormData()
    formData.append('image', selectedFile)
    formData.append('type', activeTab)

    try {
      console.log('🌐 Sending request to /api/admin/images')
      const response = await fetch('/api/admin/images', {
        method: 'POST',
        body: formData
      })

      console.log('📡 Response status:', response.status)
      if (response.ok) {
        console.log('✅ Upload successful!')
        await loadImages()
        setSelectedFile(null)
        setImagePreview(null)
        document.getElementById('fileInput').value = ''
      } else {
        console.log('❌ Upload failed with status:', response.status)
        alert('Error uploading image')
      }
    } catch (error) {
      console.error('💥 Error uploading image:', error)
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

  // Function to refresh image counts when switching tabs
  const refreshImageCounts = async () => {
    try {
      await loadImages()
    } catch (error) {
      console.error('Error refreshing image counts:', error)
    }
  }

  const updateMessageStatus = async (messageId, status) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: messageId, status }),
      })

      if (response.ok) {
        // Update the message in the local state
        setContactMessages(prev => 
          prev.map(msg => 
            msg.id === messageId ? { ...msg, status } : msg
          )
        )
        console.log('Message status updated successfully')
      } else {
        console.error('Failed to update message status')
      }
    } catch (error) {
      console.error('Error updating message status:', error)
    }
  }

  const deleteMessage = async (messageId) => {
    if (!confirm('Are you sure you want to delete this message?')) {
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: messageId }),
      })

      if (response.ok) {
        // Remove the message from the local state
        setContactMessages(prev => prev.filter(msg => msg.id !== messageId))
        setSelectedMessage(null)
        console.log('Message deleted successfully')
      } else {
        console.error('Failed to delete message')
      }
    } catch (error) {
      console.error('Error deleting message:', error)
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

    const currentImages = activeTab === 'gallery' ? galleryImages : 
                         activeTab === 'excellence' ? excellenceImages : 
                         carosalImages

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
        if (activeTab === 'gallery') setGalleryImages(newImages)
        else if (activeTab === 'excellence') setExcellenceImages(newImages)
        else setCarosalImages(newImages)
      } catch (error) {
        console.error('Error reordering images:', error)
      }
    }
    
    setDraggedItem(null)
  }

  const getCurrentImages = () => {
    switch (activeTab) {
      case 'excellence': return excellenceImages
      case 'carosal': return carosalImages
      default: return galleryImages
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
              <div className="header-main">
                <h1>Admin Dashboard</h1>
                <p>Manage images and view contact messages</p>
              </div>
              <div className="header-stats">
                <div className="stat-card">
                  <div className="stat-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="21,15 16,10 5,21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="stat-content">
                    <span className="stat-number">{galleryImages.length}</span>
                    <span className="stat-label">Gallery</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="stat-content">
                    <span className="stat-number">{excellenceImages.length}</span>
                    <span className="stat-label">Excellence</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="stat-content">
                    <span className="stat-number">{carosalImages.length}</span>
                    <span className="stat-label">Carousel</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1469 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59531 1.99522 8.06679 2.16708 8.43376 2.48353C8.80073 2.79999 9.04004 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.89391 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5261 15.5775C21.8428 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="stat-content">
                    <span className="stat-number">{contactMessages.length}</span>
                    <span className="stat-label">Messages</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Section Navigation */}
          <div className="section-navigation">
            <div className="section-cards">
              <div 
                className={`section-card ${activeTab === 'gallery' ? 'active' : ''}`}
                onClick={() => setActiveTab('gallery')}
              >
                <div className="section-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="21,15 16,10 5,21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="section-content">
                  <h3>Gallery Images</h3>
                  <p>{galleryImages.length} images</p>
                </div>
                <div className="section-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              <div 
                className={`section-card ${activeTab === 'excellence' ? 'active' : ''}`}
                onClick={() => setActiveTab('excellence')}
              >
                <div className="section-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="section-content">
                  <h3>Excellence Images</h3>
                  <p>{excellenceImages.length} images</p>
                </div>
                <div className="section-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              <div 
                className={`section-card ${activeTab === 'carosal' ? 'active' : ''}`}
                onClick={() => setActiveTab('carosal')}
              >
                <div className="section-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="section-content">
                  <h3>Carousel Images</h3>
                  <p>{carosalImages.length} images</p>
                </div>
                <div className="section-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              <div 
                className={`section-card ${activeTab === 'messages' ? 'active' : ''}`}
                onClick={() => setActiveTab('messages')}
              >
                <div className="section-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1469 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59531 1.99522 8.06679 2.16708 8.43376 2.48353C8.80073 2.79999 9.04004 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.89391 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5261 15.5775C21.8428 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="section-content">
                  <h3>Contact Messages</h3>
                  <p>{contactMessages.length} messages</p>
                </div>
                <div className="section-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Section - Only for Image Tabs */}
          {activeTab !== 'messages' && (
            <div className="upload-section">
              <h2>
                {activeTab === 'gallery' && 'Upload New Gallery Image'}
                {activeTab === 'excellence' && 'Upload New Excellence Image'}
                {activeTab === 'carosal' && 'Upload New Carosal Image'}
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
                  style={{
                    opacity: (!selectedFile || uploading) ? 0.5 : 1,
                    cursor: (!selectedFile || uploading) ? 'not-allowed' : 'pointer'
                  }}
                >
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </button>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                  Debug: selectedFile={selectedFile ? 'Yes' : 'No'}, uploading={uploading ? 'Yes' : 'No'}
                </div>
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
                          title="Delete image"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
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
                            {new Date(message.created_at).toLocaleDateString()}
                          </span>
                          {!message.read && <span className="unread-badge">New</span>}
                        </div>
                      </div>
                      <div className="message-preview">
                        <p>{message.message.substring(0, 100)}...</p>
                      </div>
                      {message.mobile && (
                        <div className="message-phone">
                          <strong>Phone:</strong> {message.mobile}
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
                      {selectedMessage.mobile && <p>Phone: {selectedMessage.mobile}</p>}
                    </div>
                  </div>
                  <div className="message-timestamp">
                    {new Date(selectedMessage.created_at).toLocaleString()}
                  </div>
                </div>
                <div className="message-content">
                  <h5>Message:</h5>
                  <p>{selectedMessage.message}</p>
                </div>
                <div className="message-actions">
                  <div className="status-actions">
                    <label>Status:</label>
                    <select 
                      value={selectedMessage.status} 
                      onChange={(e) => updateMessageStatus(selectedMessage.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  <div className="action-buttons">
                    <button 
                      className="delete-btn"
                      onClick={() => deleteMessage(selectedMessage.id)}
                    >
                      Delete Message
                    </button>
                  </div>
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

        /* Professional Section Navigation */
        .section-navigation {
          margin-bottom: 40px;
        }

        .section-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .section-card {
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          padding: 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 16px;
          position: relative;
          overflow: hidden;
        }

        .section-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
          border-color: #0ea5e9;
        }

        .section-card.active {
          background: linear-gradient(135deg, #0ea5e9, #3b82f6);
          color: white;
          border-color: #0ea5e9;
          box-shadow: 0 8px 25px rgba(14, 165, 233, 0.3);
        }

        .section-card.active .section-icon {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .section-card.active .section-content h3,
        .section-card.active .section-content p {
          color: white;
        }

        .section-card.active .section-arrow {
          color: white;
        }

        .section-icon {
          width: 48px;
          height: 48px;
          background: #f1f5f9;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0ea5e9;
          flex-shrink: 0;
        }

        .section-content {
          flex: 1;
        }

        .section-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 4px 0;
          color: #1e293b;
        }

        .section-content p {
          font-size: 0.875rem;
          color: #64748b;
          margin: 0;
        }

        .section-arrow {
          color: #94a3b8;
          transition: transform 0.3s ease;
        }

        .section-card:hover .section-arrow {
          transform: translateX(4px);
        }

        /* Header Stats */
        .header-stats {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 12px;
          background: white;
          padding: 16px 20px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .stat-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #0ea5e9, #3b82f6);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .stat-content {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #64748b;
          font-weight: 500;
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
          padding: 8px;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 32px;
          min-height: 32px;
        }

        .delete-btn:hover {
          background: #dc2626;
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
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

        .message-actions {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid rgba(15, 23, 42, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .status-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .status-actions label {
          font-size: 14px;
          font-weight: 600;
          color: var(--nav);
        }

        .status-select {
          padding: 8px 12px;
          border: 1px solid rgba(15, 23, 42, 0.2);
          border-radius: 8px;
          font-size: 14px;
          background: white;
          color: var(--nav);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .status-select:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
        }

        .action-buttons {
          display: flex;
          gap: 12px;
        }

        .delete-btn {
          background: #ef4444;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .delete-btn:hover {
          background: #dc2626;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }

        .delete-btn:active {
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .admin-container {
            padding: 20px 16px;
          }

          .header-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
          }

          .header-stats {
            width: 100%;
            justify-content: space-between;
          }

          .stat-card {
            flex: 1;
            min-width: 0;
          }

          .section-cards {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .section-card {
            padding: 20px;
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