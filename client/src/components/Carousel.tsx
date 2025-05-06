import React from 'react';
import { Carousel } from 'react-bootstrap';

const CarouselComponent: React.FC = () => {
  const images = [
    'https://images.samsung.com/is/image/samsung/assets/es/offer/2025-04-appdays/PCD-Header-PC-SHOP-APP-10.jpg?imwidth=1366',
    'https://www.shutterstock.com/image-illustration/running-sport-shoes-banner-horizontal-260nw-1063090937.jpg',
    'https://i.pinimg.com/736x/9a/13/dc/9a13dc79ca4368d6c87acb2e52cadf9d.jpg',
    'https://static.helpjuice.com/helpjuice_production/uploads/upload/image/7553/direct/1654029567853-Banners%20ejemplo.jpg',
    'https://www.shutterstock.com/image-photo/group-successful-confident-business-people-600nw-2044374842.jpg',
  ];

  return (
    <Carousel fade interval={5000}>
      {images.map((img, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={img}
            alt={`Slide ${index + 1}`}
            style={{ height: '20rem', objectFit: 'cover' }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
