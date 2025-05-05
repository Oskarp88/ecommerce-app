import React, { useEffect, useState } from 'react';

const Home: React.FC = () => {
  // Estado para el índice de la imagen visible
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array con las URLs de las imágenes
  const images = [
    'https://via.placeholder.com/600x200/FFA500/FFFFFF?text=Imagen+1',
    'https://via.placeholder.com/600x200/000000/FFFFFF?text=Imagen+2',
    'https://via.placeholder.com/600x200/FFFFFF/000000?text=Imagen+3',
    'https://via.placeholder.com/600x200/FF5733/FFFFFF?text=Imagen+4',
    'https://via.placeholder.com/600x200/33FF57/FFFFFF?text=Imagen+5',
  ];

  // Cambiar la imagen cada 5 segundos
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#000000', padding: '20px' }}>
      <header style={{ backgroundColor: '#FFA500', padding: '10px', textAlign: 'center' }}>
        <h1>Bienvenido a Nuestro Ecommerce</h1>
      </header>

      {/* Carrusel de imágenes */}
      <div style={{ overflow: 'hidden', width: '100%', marginBottom: '20px' }}>
        <div
          style={{
            display: 'flex',
            transition: 'transform 1s ease-in-out',
            transform: `translateX(-${currentImageIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <div key={index} style={{ minWidth: '100%' }}>
              <img src={image} alt={`Portada ${index + 1}`} style={{ width: '100%' }} />
            </div>
          ))}
        </div>
      </div>

      <main style={{ padding: '20px' }}>
        <h2 style={{ textAlign: 'center', color: '#FFA500' }}>Explora nuestros productos</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
          {/* Aquí agregaremos tarjetas de productos */}
          <div style={{ backgroundColor: '#f5f5f5', padding: '20px', width: '30%', borderRadius: '8px' }}>
            <img src="https://via.placeholder.com/200" alt="Producto" style={{ width: '100%', borderRadius: '8px' }} />
            <h3>Producto 1</h3>
            <p>Descripción del producto</p>
            <button
              style={{
                backgroundColor: '#FFA500',
                color: '#fff',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
              }}
            >
              Agregar al carrito
            </button>
          </div>
          <div style={{ backgroundColor: '#f5f5f5', padding: '20px', width: '30%', borderRadius: '8px' }}>
            <img src="https://via.placeholder.com/200" alt="Producto" style={{ width: '100%', borderRadius: '8px' }} />
            <h3>Producto 2</h3>
            <p>Descripción del producto</p>
            <button
              style={{
                backgroundColor: '#FFA500',
                color: '#fff',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
              }}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
