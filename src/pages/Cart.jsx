import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaTrash } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito, totalPrecio } = useCart();

  const handleFinalizarCompra = () => {
    const confirmar = window.confirm(
      `¿Confirmás tu compra por un total de $${totalPrecio}?`
    );
    if (confirmar) {
      alert('¡Gracias por tu compra! En breve recibirás un email de confirmación.');
      vaciarCarrito();
    }
  };

  if (carrito.length === 0) {
    return (
      <>
        <Helmet>
          <title>HardStore | Carrito</title>
        </Helmet>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <h3>Tu carrito está vacío. ¡Agregá algún componente!</h3>
          <Link to="/productos" className="btn btn-primary mt-3">
            Ver catálogo
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>HardStore | Carrito</title>
      </Helmet>

      <div style={{ maxWidth: '600px', margin: '0 auto', marginTop: '20px' }}>
        <h2>Tu Carrito de Compras</h2>

        <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
          {carrito.map((prod) => (
            <li
              key={prod.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px',
                backgroundColor: '#fff',
                marginBottom: '10px',
                borderRadius: '5px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              }}
            >
              <span>
                <strong>{prod.nombre}</strong> (x{prod.cantidad})
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontWeight: 'bold' }}>
                  ${prod.precio * prod.cantidad}
                </span>
                <button
                  className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                  onClick={() => eliminarDelCarrito(prod.id)}
                >
                  <FaTrash /> Quitar
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '2px solid #eee',
          }}
        >
          <h4>Total: ${totalPrecio}</h4>
          <button className="btn btn-outline-secondary" onClick={vaciarCarrito}>
            Vaciar carrito
          </button>
        </div>

        <div className="text-end mt-4">
          <button className="btn btn-success btn-lg" onClick={handleFinalizarCompra}>
            Finalizar compra
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;