// src/components/FeaturedProducts.tsx
import React from 'react';

const FeaturedProducts: React.FC = () => {
  return (
    <section style={{ padding: '40px 0' }}>
      <h2 style={{ textAlign: 'center', color: '#FFA500' }}>Productos más vendidos</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ backgroundColor: '#f5f5f5', padding: '20px', width: '30%', borderRadius: '8px' }}>
          <img src="https://via.placeholder.com/200" alt="Producto más vendido" />
          <h3>Producto A</h3>
          <p>Descripción corta</p>
          <button
            style={{
              backgroundColor: '#FFA500',
              color: '#fff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            Ver Producto
          </button>
        </div>
        <div style={{ backgroundColor: '#f5f5f5', padding: '20px', width: '30%', borderRadius: '8px' }}>
          <img src="https://via.placeholder.com/200" alt="Producto más vendido" />
          <h3>Producto B</h3>
          <p>Descripción corta</p>
          <button
            style={{
              backgroundColor: '#FFA500',
              color: '#fff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            Ver Producto
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
