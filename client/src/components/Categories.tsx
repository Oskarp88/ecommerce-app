// src/components/Categories.tsx
import React from 'react';

const Categories: React.FC = () => {
  return (
    <section style={{ padding: '40px 0' }}>
      <h2 style={{ textAlign: 'center', color: '#FFA500' }}>Categorías</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ textAlign: 'center', width: '20%' }}>
          <img src="https://via.placeholder.com/100" alt="Electrónica" />
          <h4>Electrónica</h4>
        </div>
        <div style={{ textAlign: 'center', width: '20%' }}>
          <img src="https://via.placeholder.com/100" alt="Moda" />
          <h4>Moda</h4>
        </div>
        <div style={{ textAlign: 'center', width: '20%' }}>
          <img src="https://via.placeholder.com/100" alt="Hogar" />
          <h4>Hogar</h4>
        </div>
      </div>
    </section>
  );
};

export default Categories;
