// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: '#FFA500',
        padding: '10px',
        textAlign: 'center',
        color: '#fff',
      }}
    >
      <p>&copy; 2025 Ecommerce. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
