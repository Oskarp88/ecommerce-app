// src/pages/About.tsx
import React from 'react';

const About: React.FC = () => {
  return (
    <div style={{ padding: '40px', backgroundColor: '#ffffff', color: '#333' , marginBottom: '4rem'}}>
      <h1 style={{ textAlign: 'center', color: '#FFA500' }}>Sobre Nosotros</h1>

      <section style={{ marginTop: '30px' }}>
        <h2 style={{ color: '#FFA500' }}>¿Quiénes somos?</h2>
        <p style={{ lineHeight: '1.6' }}>
          Somos una tienda online comprometida en ofrecer a nuestros clientes una experiencia de compra única y satisfactoria.
          Desde nuestros inicios en 2025, nos hemos enfocado en seleccionar productos de calidad y brindar un servicio
          excepcional para convertirnos en tu ecommerce de confianza.
        </p>
      </section>

      <section style={{ marginTop: '30px' }}>
        <h2 style={{ color: '#FFA500' }}>Nuestra Misión</h2>
        <p style={{ lineHeight: '1.6' }}>
          Facilitar el acceso a productos de excelente calidad, al mejor precio, con envíos rápidos y atención personalizada. Queremos
          que cada cliente se sienta valorado y satisfecho con cada compra.
        </p>
      </section>

      <section style={{ marginTop: '30px' }}>
        <h2 style={{ color: '#FFA500' }}>Nuestra Visión</h2>
        <p style={{ lineHeight: '1.6' }}>
          Convertirnos en el ecommerce líder en nuestra región, reconocido por nuestra variedad de productos, calidad de servicio y compromiso con el cliente.
        </p>
      </section>

      <section style={{ marginTop: '30px' }}>
        <h2 style={{ color: '#FFA500' }}>Nuestros Valores</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li>✔️ Compromiso con la calidad</li>
          <li>✔️ Honestidad y transparencia</li>
          <li>✔️ Atención al cliente personalizada</li>
          <li>✔️ Innovación constante</li>
          <li>✔️ Pasión por lo que hacemos</li>
        </ul>
      </section>

      <section style={{ marginTop: '30px' }}>
        <h2 style={{ color: '#FFA500' }}>Contáctanos</h2>
        <p style={{ lineHeight: '1.6' }}>
          📧 Email: contacto@ecommerce.com <br />
          📞 Teléfono: +52 55 1234 5678 <br />
          📍 Dirección: Av. Principal 123, Cartagena de indias
        </p>
      </section>
    </div>
  );
};

export default About;
