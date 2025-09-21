import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper';
import { useEffect, useState } from 'react';

export default function Carousel({ page = 'carousel' }) {
  const [imgs, setImgs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback images for different pages
  const fallbackImages = {
    carousel: [
      '/product_images/WhatsApp Image 2025-09-16 at 9.06.03 PM.jpeg',
      '/product_images/WhatsApp Image 2025-09-16 at 9.06.09 PM (1).jpeg',
      '/product_images/WhatsApp Image 2025-09-16 at 9.06.09 PM (2).jpeg',
      '/product_images/WhatsApp Image 2025-09-16 at 9.06.09 PM (4).jpeg',
      '/product_images/WhatsApp Image 2025-09-16 at 9.06.22 PM.jpeg'
    ],
    'home-side': [
      '/product_images/WhatsApp Image 2025-09-16 at 9.06.59 PM (1).jpeg',
      '/product_images/WhatsApp Image 2025-09-16 at 9.07.00 PM (1).jpeg',
      '/product_images/WhatsApp Image 2025-09-16 at 9.12.27 PM (1).jpeg'
    ]
  };

  useEffect(() => {
    const loadImages = async () => {
      try {
        // Try to load from admin API first
        const response = await fetch(`/api/admin/images?page=${page}`);
        if (response.ok) {
          const adminImages = await response.json();
          if (adminImages.length > 0) {
            setImgs(adminImages.map(img => ({
              id: img.id,
              image_url: img.url,
              alt: img.alt
            })));
            setLoading(false);
            return;
          }
        }
        
        // Fallback to static images
        const fallback = fallbackImages[page] || fallbackImages.carousel;
        setImgs(fallback.map((url, index) => ({
          id: `fallback-${index}`,
          image_url: url,
          alt: `Manufacturing Process ${index + 1}`
        })));
      } catch (error) {
        console.error('Error loading carousel images:', error);
        // Use fallback images
        const fallback = fallbackImages[page] || fallbackImages.carousel;
        setImgs(fallback.map((url, index) => ({
          id: `fallback-${index}`,
          image_url: url,
          alt: `Manufacturing Process ${index + 1}`
        })));
      }
      setLoading(false);
    };

    loadImages();
  }, [page]);

  if (loading) {
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

  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation
      autoplay={{ delay: 4000 }}
      loop={imgs.length > 1}
      style={{ width: '100%', height: '100%' }}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 1 },
        1024: { slidesPerView: 1 },
      }}
    >
      {imgs.map((img) => (
        <SwiperSlide key={img.id}>
          <img
            src={img.image_url}
            alt={img.alt || 'slide'}
            style={{ 
              width: '100%', 
              height: '100%', 
              borderRadius: 12,
              objectFit: 'cover'
            }}
            loading="lazy"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
