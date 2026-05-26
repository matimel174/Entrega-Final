import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Menú superior fijo */}
      <Navbar />

      {/* Zona dinámica donde se va a renderizar cada página del e-commerce */}
      <main style={{ flex: 1, padding: '40px', backgroundColor: '#f5f5f5' }}>
        {children}
      </main>

      {/* Footer fijo con los datos del equipo (Requerimiento #1.3) */}
      <footer style={{
        backgroundColor: '#111',
        color: '#aaa',
        padding: '20px',
        textAlign: 'center',
        fontSize: '14px',
        borderTop: '3px solid #333'
      }}>
        <p>&copy; 2026 HardStore - Todos los derechos reservados.</p>
        <p style={{ marginTop: '5px', color: '#fff' }}>
          <strong>Grupo de Entrega:</strong> Matias Melgarejo
        </p>
      </footer>
    </div>
  );
};

export default Layout;