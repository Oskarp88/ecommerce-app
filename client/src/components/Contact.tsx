// src/pages/Contact.tsx
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div style={{ padding: '40px', backgroundColor: '#ffffff', color: '#333', marginBottom: '4rem'}}>
      <h1 style={{ textAlign: 'center', color: '#FFA500' }}>Contáctanos</h1>

      <section style={{ marginTop: '30px', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ color: '#FFA500' }}>Envíanos un mensaje</h2>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          <input
            type="text"
            placeholder="Tu nombre"
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px'
            }}
          />
          <input
            type="email"
            placeholder="Tu correo electrónico"
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px'
            }}
          />
          <textarea
            placeholder="Escribe tu mensaje aquí"
            rows={5}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px'
            }}
          ></textarea>
          <button
            type="submit"
            style={{
              backgroundColor: '#FFA500',
              color: '#fff',
              padding: '12px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Enviar mensaje
          </button>
        </form>
      </section>

      <section style={{ marginTop: '50px', textAlign: 'center' }}>
        <h2 style={{ color: '#FFA500' }}>Información de contacto</h2>
        <p style={{ lineHeight: '1.8' }}>
          📧 Email: contacto@ecommerce.com <br />
          📞 Teléfono: +52 55 1234 5678 <br />
          📍 Dirección: Av. Principal 123, Cartagena de indias
        </p>
      </section>
    </div>
  );
};

export default Contact;
