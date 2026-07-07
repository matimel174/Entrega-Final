import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext'; // Sistema de login
import Layout from './components/Layout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login'; 
import Admin from './pages/Admin'; // Tu panel de administración
import ProtectedRoute from './components/ProtectedRoute'; 
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              {/* Tus rutas originales intactas */}
              <Route path="/" element={<Home />} />
              <Route path="/carrito" element={<Cart />} />
              <Route path="/productos" element={<ItemListContainer />} />
              <Route path="/productos/:idCategoria" element={<ItemListContainer />} />
              <Route path="/item/:idItem" element={<ItemDetailContainer />} />
              
              {/* Las dos pantallas nuevas para la entrega final */}
              <Route path="/login" element={<Login />} /> 
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Layout>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;