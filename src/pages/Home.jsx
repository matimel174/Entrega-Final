import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>¡Bienvenidos a HardStore! 🎮</h2>
      <p style={{ color: '#666', margin: '20px 0' }}>La mejor tienda de hardware de PC y componentes ARGB.</p>
      <Link to="/productos" style={{
        padding: '10px 20px', backgroundColor: '#007bff', color: '#fff',
        textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold'
      }}>
        Ver Catálogo de Productos
      </Link>
    </div>
  );
};

export default Home;