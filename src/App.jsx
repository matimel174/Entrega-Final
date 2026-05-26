import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Ruta de la pantalla de inicio */}
            <Route path="/" element={<Home />} />
            
            {/* Ruta del carrito de compras */}
            <Route path="/carrito" element={<Cart />} />
            
            {/* Ruta para ver todo el catálogo */}
            <Route path="/productos" element={<ItemListContainer />} />
            
            {/* Ruta para filtrar por categoría (Monitores, Gabinetes, etc.) */}
            <Route path="/productos/:idCategoria" element={<ItemListContainer />} />
            
            {/* Ruta para ver el detalle de un solo producto */}
            <Route path="/item/:idItem" element={<ItemDetailContainer />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;