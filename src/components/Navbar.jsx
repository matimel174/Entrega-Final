import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartWidget from './CartWidget';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">HardStore</Link>
        <div className="d-flex align-items-center">
          <Link className="nav-link text-white mx-3" to="/productos">Catálogo</Link>

          {user && user.role === 'admin' && (
            <Link className="btn btn-warning btn-sm mx-2 fw-bold" to="/admin">
              ⚙️ Panel Admin
            </Link>
          )}

          {user ? (
            <>
              <span className="text-white mx-2">Hola, {user.username}</span>
              <button
                className="btn btn-outline-light btn-sm mx-2"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link className="btn btn-outline-light btn-sm mx-2" to="/login">
              Iniciar sesión
            </Link>
          )}

          <CartWidget />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;