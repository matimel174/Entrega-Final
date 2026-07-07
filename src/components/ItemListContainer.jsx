import React, { useState, useEffect } from 'react';
import ItemList from './ItemList';
import productosData from '../data/productos.json'; // O de donde saques tus productos locales

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Simulamos la carga de datos (que es la responsabilidad del Container)
    setProductos(productosData);
  }, []);

  // El Container NO dibuja las cards, se las delega a ItemList
  return <ItemList productos={productos} />;
};

export default ItemListContainer;