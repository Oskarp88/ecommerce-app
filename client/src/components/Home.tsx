// src/pages/Home.tsx
import React from 'react';
import Carousel from '../components/Carousel';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#ffffff', color: '#000000', marginBottom: '5rem' }}>
      <Carousel />
      <Categories />
      <FeaturedProducts />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
