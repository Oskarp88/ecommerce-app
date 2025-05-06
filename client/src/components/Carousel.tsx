// src/components/Carousel.tsx
import React, { useEffect, useState } from 'react';

const Carousel: React.FC = () => {
  const images = [
    'https://images.samsung.com/is/image/samsung/assets/es/offer/2025-04-appdays/PCD-Header-PC-SHOP-APP-10.jpg?imwidth=1366',
    'https://www.shutterstock.com/image-illustration/running-sport-shoes-banner-horizontal-260nw-1063090937.jpg',
    'https://i.pinimg.com/736x/9a/13/dc/9a13dc79ca4368d6c87acb2e52cadf9d.jpg',
    'https://static.helpjuice.com/helpjuice_production/uploads/upload/image/7553/direct/1654029567853-Banners%20ejemplo.jpg',
    'https://www.shutterstock.com/image-photo/group-successful-confident-business-people-600nw-2044374842.jpg',
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <img src={images[currentImage]} alt="Carrusel" style={{ width: '100%', height: '20rem' }} />
    </div>
  );
};

export default Carousel;
