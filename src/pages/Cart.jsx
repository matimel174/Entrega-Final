import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart } = useCart();

  if (cart.length === 0) {
    return <h3 style={{ textAlign: 'center' }}>Tu carrito está vacío. ¡Agregá algún componente!</h3>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Tu Carrito de Compras</h2>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
        {cart.map((prod) => (
          <li key={prod.id} style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '15px', backgroundColor: '#fff',
            marginBottom: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <span><strong>{prod.nombre}</strong> (x{prod.cantidad})</span>
            <span style={{ fontWeight: 'bold' }}>${prod.precio * prod.cantidad}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;