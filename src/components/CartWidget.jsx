import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartWidget = () => {
  const { totalProductos } = useCart(); // Leemos la cantidad global del carrito

  return (
    <Link to="/carrito" style={{ color: '#fff', textDecoration: 'none', position: 'relative', fontSize: '20px' }}>
      🛒
      {totalProductos > 0 && (
        <span style={{
          backgroundColor: '#ff4d4d',
          color: 'white',
          borderRadius: '50%',
          padding: '2px 7px',
          fontSize: '12px',
          fontWeight: 'bold',
          position: 'absolute',
          top: '-10px',
          right: '-10px'
        }}>
          {totalProductos}
        </span>
      )}
    </Link>
  );
};

export default CartWidget;