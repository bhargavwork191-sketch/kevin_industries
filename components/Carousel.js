import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper';
import { useEffect, useState } from 'react';

export default function Carousel({ page = 'home' }) {
  const [imgs, setImgs] = useState([]);

  useEffect(() => {
    fetch('/api/images?page=' + page)
      .then((r) => r.json())
      .then((d) => setImgs(d || []));
  }, [page]);

  if (!imgs.length) return <div className="carousel-empty">No images</div>;

  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation
      autoplay={{ delay: 3000 }}
      loop
      style={{ width: '100%' }}
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
            style={{ width: '100%', height: 'auto', borderRadius: 12 }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
