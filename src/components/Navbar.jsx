    import React from 'react';
import { Link } from 'react-router-dom';
import CartWidget from './CartWidget';

const Navbar = () => {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#1a1a1a',
      padding: '15px 30px',
      color: '#fff'
    }}>
      {/* Logo de la tienda */}
      <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '22px', fontWeight: 'bold' }}>
        ⚡ HardStore
      </Link>

      {/* Enlaces de navegación */}
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#ccc', textDecoration: 'none', fontWeight: '500' }}>Inicio</Link>
        <Link to="/productos" style={{ color: '#ccc', textDecoration: 'none', fontWeight: '500' }}>Catálogo</Link>
        
        {/* Metemos el widget del carrito que creamos antes */}
        <CartWidget />
      </div>
    </nav>
  );
};

export default Navbar;