import React, { createContext, useState, useContext } from 'react';

// 1. Creamos el contexto
const CartContext = createContext();

// 2. Creamos el proveedor del estado
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Función para agregar un ítem al carrito
  const addToCart = (item, quantity) => {
    const itemInCart = cart.find((prod) => prod.id === item.id);
    
    if (itemInCart) {
      // Si ya existía, le sumamos la cantidad nueva
      setCart(cart.map((prod) => 
        prod.id === item.id ? { ...prod, cantidad: prod.cantidad + quantity } : prod
      ));
    } else {
      // Si es nuevo, lo metemos al array con su cantidad inicial
      setCart([...cart, { ...item, cantidad: quantity }]);
    }
  };

  // Calculamos la cantidad total de productos para el contador del Navbar
  const totalProductos = cart.reduce((acc, prod) => acc + prod.cantidad, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, totalProductos }}>
      {children}
    </CartContext.Provider>
  );
};

// 3. Atajo (Hook personalizado) para usar el carrito fácil en cualquier componente
export const useCart = () => useContext(CartContext);