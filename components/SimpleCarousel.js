import { useState, useEffect } from 'react';

export default function SimpleCarousel({ page = 'carousel' }) {
  const [imgs, setImgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log('SimpleCarousel useEffect running');
    
    // Simulate loading and set some test images
    setTimeout(() => {
      console.log('Setting test images');
      setImgs([
        {
          id: 'test-1',
          image_url: '/images/hero.jpg',
          alt: 'Test Image 1'
        },
        {
          id: 'test-2', 
          image_url: '/images/hero.svg',
          alt: 'Test Image 2'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (!mounted) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '300px',
        background: '#f0f0f0',
        borderRadius: '8px'
      }}>
        <p>Initializing...</p>
      </div>
    );
  }

  console.log('SimpleCarousel render - loading:', loading, 'imgs:', imgs);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '300px',
        background: '#f0f0f0',
        borderRadius: '8px'
      }}>
        <p>Loading carousel...</p>
      </div>
    );
  }

  if (!imgs.length) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '300px',
        background: '#f0f0f0',
        borderRadius: '8px'
      }}>
        <p>No images available</p>
      </div>
    );
  }

  return (
    <div style={{ height: '300px', background: '#e0e0e0', borderRadius: '8px', padding: '20px' }}>
      <h3>Carousel Images ({imgs.length})</h3>
      {imgs.map((img) => (
        <div key={img.id} style={{ margin: '10px 0' }}>
          <img 
            src={img.image_url} 
            alt={img.alt}
            style={{ width: '100px', height: '60px', objectFit: 'cover', marginRight: '10px' }}
          />
          <span>{img.alt}</span>
        </div>
      ))}
    </div>
  );
}
