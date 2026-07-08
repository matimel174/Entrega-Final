import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const guardado = localStorage.getItem('hardstore_user');
    return guardado ? JSON.parse(guardado) : null;
  });

  const login = (username, password) => {
    if (username.toLowerCase() === 'admin' && password === '1234') {
      const nuevoUsuario = { username: 'Admin', role: 'admin' };
      setUser(nuevoUsuario);
      localStorage.setItem('hardstore_user', JSON.stringify(nuevoUsuario));
      return { success: true };
    } else if (username && password) {
      const nuevoUsuario = { username: username, role: 'client' };
      setUser(nuevoUsuario);
      localStorage.setItem('hardstore_user', JSON.stringify(nuevoUsuario));
      return { success: true };
    }
    return { success: false, message: 'Credenciales inválidas' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hardstore_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);