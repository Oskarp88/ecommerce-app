import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: '#333',
        color: 'white',
        padding: '20px 0',
        textAlign: 'center',
        marginTop: 'auto', // Esto asegura que el footer se quede al fondo
      }}
    >
      <p>© 2025 E-Commerce. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
