import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const { idCategoria } = useParams();
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('/src/data/productos.json')
      .then((res) => res.json())
      .then((data) => {
        if (idCategoria) {
          const productosFiltrados = data.filter(prod => prod.categoria === idCategoria);
          setProductos(productosFiltrados);
        } else {
          setProductos(data);
        }
      })
      .catch((err) => console.error("Error al cargar los productos:", err));
  }, [idCategoria]);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333', textTransform: 'capitalize' }}>
        {idCategoria ? `Categoría: ${idCategoria}` : 'Catálogo de Componentes'}
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '25px'
      }}>
        {productos.map((prod) => (
          <div key={prod.id} style={{
            backgroundColor: '#fff', padding: '20px', borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)', textAlign: 'center'
          }}>
            <img src={prod.imagen} alt={prod.nombre} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} />
            
            {/* El nombre del producto ahora es un link que te lleva al detalle */}
            <Link to={`/item/${prod.id}`} style={{ textDecoration: 'none' }}>
              <h3 style={{ fontSize: '16px', margin: '15px 0 10px 0', height: '40px', overflow: 'hidden', color: '#222', cursor: 'pointer' }}>
                {prod.nombre}
              </h3>
            </Link>

            <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#007bff', marginBottom: '15px' }}>${prod.precio}</p>
            
            <button 
              onClick={() => addToCart(prod, 1)}
              style={{
                width: '100%', padding: '10px', backgroundColor: '#28a745',
                color: '#fff', border: 'none', borderRadius: '5px',
                fontWeight: 'bold', cursor: 'pointer'
              }}
            >
              Agregar al Carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemListContainer;