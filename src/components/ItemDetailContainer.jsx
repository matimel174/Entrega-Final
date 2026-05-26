import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ItemDetailContainer = () => {
  const [producto, setProducto] = useState(null);
  const { idItem } = useParams();
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('/src/data/productos.json')
      .then((res) => res.json())
      .then((data) => {
        const encontrado = data.find(prod => prod.id === parseInt(idItem));
        setProducto(encontrado);
      })
      .catch((err) => console.error("Error al cargar el detalle:", err));
  }, [idItem]);

  if (!producto) return <p style={{ textAlign: 'center', padding: '20px' }}>Cargando especificaciones del componente...</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <Link to="/productos" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>← Volver al catálogo</Link>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <img src={producto.imagen} alt={producto.nombre} style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '4px' }} />
      </div>
      <h2 style={{ marginTop: '20px', color: '#222' }}>{producto.nombre}</h2>
      <p style={{ color: '#666', margin: '15px 0', lineHeight: '1.5' }}>
        Componente de alta gama seleccionado y optimizado para máxima compatibilidad con setups de gaming y refrigeración avanzada.
      </p>
      <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>${producto.precio}</p>
      
      <button 
        onClick={() => addToCart(producto, 1)}
        style={{
          width: '100%', marginTop: '20px', padding: '12px', backgroundColor: '#007bff',
          color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer'
        }}
      >
        Añadir al Carrito
      </button>
    </div>
  );
};

export default ItemDetailContainer;