// src/components/Newsletter.tsx
import React from 'react';

const Newsletter: React.FC = () => {
  return (
    <section style={{ padding: '40px 0', backgroundColor: '#f5f5f5' }}>
      <h2 style={{ textAlign: 'center', color: '#FFA500' }}>Suscríbete a nuestro boletín</h2>
      <form style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <input
          type="email"
          placeholder="Ingresa tu correo electrónico"
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '300px',
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#FFA500',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Suscribirse
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
