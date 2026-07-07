import React from 'react';
import { Link } from 'react-router-dom';
import CartWidget from './CartWidget';
import { useAuth } from '../context/AuthContext'; // <-- NUEVO: Traemos la autenticación

const Navbar = () => {
  const { user, logout } = useAuth(); // <-- NUEVO: Obtenemos el usuario y la función de cerrar sesión

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
        
        {/* NUEVO: Si el usuario es administrador, le mostramos el link al panel */}
        {user && user.role === 'admin' && (
          <Link to="/admin" style={{ color: '#ffc107', textDecoration: 'none', fontWeight: 'bold' }}>⚙️ Admin</Link>
        )}

        {/* NUEVO: Botón dinámico de Login / Logout */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#87ceeb', fontSize: '14px' }}>Hola, {user.username}</span>
            <button 
              onClick={logout} 
              className="btn btn-sm btn-outline-danger"
              style={{ padding: '2px 8px', fontSize: '13px' }}
            >
              Salir
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn btn-sm btn-primary" style={{ color: '#fff', textDecoration: 'none' }}>
            Ingresar
          </Link>
        )}
        
        {/* Widget del carrito */}
        <CartWidget />
      </div>
    </nav>
  );
};

export default Navbar;