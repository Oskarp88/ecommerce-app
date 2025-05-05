import React from 'react';

const Header: React.FC = () => {
  return (
    <header style={{ backgroundColor: '#FF6600', color: 'white', padding: '10px 0' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
        <div>
          <h1>E-Commerce</h1>
        </div>
        <div>
          <ul style={{ display: 'flex', listStyleType: 'none' }}>
            <li style={{ margin: '0 15px' }}><a href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</a></li>
            <li style={{ margin: '0 15px' }}><a href="/shop" style={{ color: 'white', textDecoration: 'none' }}>Shop</a></li>
            <li style={{ margin: '0 15px' }}><a href="/about" style={{ color: 'white', textDecoration: 'none' }}>About</a></li>
            <li style={{ margin: '0 15px' }}><a href="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
