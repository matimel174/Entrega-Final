import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ItemList from './ItemList';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const PRODUCTOS_POR_PAGINA = 4;

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        const lista = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setProductos(lista);
      } catch (error) {
        console.error("Error al traer productos:", error);
      } finally {
        setLoading(false);
      }
    };
    obtenerProductos();
  }, []);

  if (loading) {
    return (
      <>
        <Helmet>
          <title>HardStore | Catálogo</title>
        </Helmet>
        <div className="text-center mt-5"><h3>Cargando...</h3></div>
      </>
    );
  }

  if (!productos || productos.length === 0) {
    return (
      <>
        <Helmet>
          <title>HardStore | Catálogo</title>
        </Helmet>
        <div className="text-center mt-5">No hay productos.</div>
      </>
    );
  }

  const productosFiltrados = productos.filter((prod) =>
    prod.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalPaginas = Math.ceil(productosFiltrados.length / PRODUCTOS_POR_PAGINA);
  const indiceInicio = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;
  const productosPaginados = productosFiltrados.slice(
    indiceInicio,
    indiceInicio + PRODUCTOS_POR_PAGINA
  );

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPaginaActual(1);
  };

  return (
    <>
      <Helmet>
        <title>HardStore | Catálogo</title>
        <meta name="description" content="Explorá el catálogo completo de componentes y hardware gamer de HardStore." />
      </Helmet>

      <div className="container mt-4">
        <div className="mb-4" style={{ maxWidth: '400px', margin: '0 auto 2rem' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar producto por nombre..."
            value={busqueda}
            onChange={handleBusqueda}
          />
        </div>

        {productosFiltrados.length === 0 ? (
          <div className="text-center mt-5">
            <h5>No se encontraron productos que coincidan con "{busqueda}"</h5>
          </div>
        ) : (
          <>
            <ItemList productos={productosPaginados} />

            {totalPaginas > 1 && (
              <nav className="d-flex justify-content-center mt-4">
                <ul className="pagination">
                  <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setPaginaActual((p) => p - 1)}
                    >
                      Anterior
                    </button>
                  </li>

                  {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
                    <li
                      key={num}
                      className={`page-item ${paginaActual === num ? 'active' : ''}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setPaginaActual(num)}
                      >
                        {num}
                      </button>
                    </li>
                  ))}

                  <li className={`page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setPaginaActual((p) => p + 1)}
                    >
                      Siguiente
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ItemListContainer;