import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';

export default function Carousel({ page = 'carousel' }) {
  const [imgs, setImgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fallback images for demo purposes
  const getFallbackImages = (page) => {
    const fallbacks = {
      home: [
        { id: 'fallback-1', image_url: '/images/hero.jpg', alt: 'Manufacturing Excellence' },
        { id: 'fallback-2', image_url: '/images/hero.svg', alt: 'Precision Engineering' }
      ],
      carousel: [
        { id: 'fallback-1', image_url: '/images/hero.jpg', alt: 'Manufacturing Excellence' },
        { id: 'fallback-2', image_url: '/images/hero.svg', alt: 'Precision Engineering' }
      ]
    };
    return fallbacks[page] || [];
  };

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        console.log('🔄 Loading carosal images for carousel...');
        
        // Load from API with carosal type filter
        const response = await fetch(`/api/images?type=carosal`);
        console.log('📡 Carosal API response status:', response.status);
        
        if (response.ok) {
          const apiImages = await response.json();
          console.log('📦 Carosal API response data:', apiImages);
          
          if (apiImages && Array.isArray(apiImages) && apiImages.length > 0) {
            const mappedImages = apiImages.map((img, index) => ({
              id: img.id || img.filename || `carosal-${index}`,
              image_url: img.url,
              alt: img.alt_text || img.alt || 'Carosal Image'
            }));
            console.log('✅ Mapped carosal images:', mappedImages);
            setImgs(mappedImages);
            setLoading(false);
          } else {
            console.log('⚠️ No carosal images found, using fallback');
            setImgs(getFallbackImages(page));
            setLoading(false);
          }
        } else {
          console.log('❌ Carosal API failed with status:', response.status);
          setImgs(getFallbackImages(page));
          setLoading(false);
        }
      } catch (error) {
        console.error('💥 Error loading carosal images:', error);
        setImgs(getFallbackImages(page));
        setLoading(false);
      }
    };

    loadImages();
  }, [page]);

  useEffect(() => {
    if (imgs.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % imgs.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [imgs.length]);

  console.log('🎨 Carousel render - imgs:', imgs, 'loading:', loading, 'imgs.length:', imgs.length);

  if (loading) {
    console.log('⏳ Showing loading state');
    return (
      <div className="carousel-loading">
        <div className="loading-spinner"></div>
        <p>Loading images...</p>
        <style jsx>{`
          .carousel-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 300px;
            color: var(--muted);
          }
          
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #e2e8f0;
            border-top: 4px solid var(--accent);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 16px;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!imgs.length) {
    return (
      <div className="carousel-empty">
        <p>No images available</p>
        <style jsx>{`
          .carousel-empty {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 300px;
            color: var(--muted);
            background: var(--bg);
            border-radius: 12px;
            border: 2px dashed #e2e8f0;
          }
        `}</style>
      </div>
    );
  }

  // If no images, show a placeholder
  if (!imgs || imgs.length === 0) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '1.5rem',
        fontWeight: '600'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏭</div>
          <div>Kevin Industries</div>
          <div style={{ fontSize: '1rem', opacity: 0.8, marginTop: '0.5rem' }}>
            Precision Engineering Excellence
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {imgs.map((img, index) => (
        <div
          key={img.id || index}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: index === currentSlide ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
            zIndex: index === currentSlide ? 1 : 0
          }}
        >
          <img
            src={img.image_url}
            alt={img.alt || `Carousel Image ${index + 1}`}
            style={{ 
              width: '100%', 
              height: '100%', 
              borderRadius: 12,
              objectFit: 'cover'
            }}
            loading="lazy"
            onError={(e) => {
              console.error('Image load error:', e)
              e.target.style.display = 'none'
            }}
          />
        </div>
      ))}
      
      {/* Navigation dots */}
      {imgs.length > 1 && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          zIndex: 2
        }}>
          {imgs.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: index === currentSlide ? '#fff' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
