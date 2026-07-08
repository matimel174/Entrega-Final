import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { CartContext } from '../context/CartContext';

const ItemDetailContainer = () => {
  const { idItem } = useParams();
  const { agregarAlCarrito } = useContext(CartContext);
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerProducto = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "productos", idItem);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProducto({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error al obtener:", error);
      } finally {
        setLoading(false);
      }
    };

    if (idItem) obtenerProducto();
  }, [idItem]);

  if (loading) return <div className="text-center mt-5"><h3>Cargando detalles...</h3></div>;

  return (
    <div className="container mt-5">
      {producto ? (
        <div className="card p-4 shadow">
          <h2>{producto.nombre}</h2>
          <hr />
          <p><strong>Categoría:</strong> {producto.categoria}</p>
          <p><strong>Precio:</strong> ${producto.precio}</p>
          <p><strong>Stock disponible:</strong> {producto.stock} unidades</p>
          
          <button 
            className="btn btn-success btn-lg w-100"
            onClick={() => agregarAlCarrito(producto, 1)}
          >
            Agregar al carrito
          </button>
        </div>
      ) : (
        <div className="alert alert-danger">Producto no encontrado.</div>
      )}
    </div>
  );
};

export default ItemDetailContainer;