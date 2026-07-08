import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const Admin = () => {
  const [productos, setProductos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [stock, setStock] = useState('');

  const productosRef = collection(db, "productos");

  const obtenerProductos = async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await getDocs(productosRef);
      setProductos(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("Error al obtener productos:", error);
      setError("No se pudieron cargar los productos. Intentá de nuevo más tarde.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setError(null);
    const nuevaData = {
      nombre,
      precio: Number(precio),
      categoria,
      stock: Number(stock)
    };

    try {
      if (editandoId) {
        await updateDoc(doc(db, "productos", editandoId), nuevaData);
        setEditandoId(null);
      } else {
        await addDoc(productosRef, nuevaData);
      }

      setNombre(''); setPrecio(''); setCategoria(''); setStock('');
      obtenerProductos();
    } catch (error) {
      console.error("Error al guardar en Firebase:", error);
      setError("Ocurrió un error al guardar el producto.");
    } finally {
      setEnviando(false);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await deleteDoc(doc(db, "productos", id));
      obtenerProductos();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      setError("Ocurrió un error al eliminar el producto.");
    }
  };

  const iniciarEdicion = (prod) => {
    setEditandoId(prod.id);
    setNombre(prod.nombre);
    setPrecio(prod.precio);
    setCategoria(prod.categoria);
    setStock(prod.stock);
  };

  return (
    <>
      <Helmet>
        <title>HardStore | Administración</title>
      </Helmet>

      <div className="container mt-4">
        <h2 className="mb-4 text-center">Panel de Control - Administrador</h2>

        {error && (
          <div className="alert alert-danger alert-dismissible" role="alert">
            {error}
            <button type="button" className="btn-close" onClick={() => setError(null)}></button>
          </div>
        )}

        <div className="card p-4 mb-5 shadow-sm">
          <h4>{editandoId ? 'Editar Producto' : 'Cargar Nuevo Producto'}</h4>
          <form onSubmit={handleSubmit} className="row g-3 mt-2">
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </div>
            <div className="col-md-2">
              <input type="number" className="form-control" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
            </div>
            <div className="col-md-3">
              <input type="text" className="form-control" placeholder="Categoría" value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
            </div>
            <div className="col-md-2">
              <input type="number" className="form-control" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} required />
            </div>
            <div className="col-md-1">
              <button type="submit" className={`btn w-100 ${editandoId ? 'btn-warning' : 'btn-success'}`} disabled={enviando}>
                {enviando ? '...' : (editandoId ? 'Guardar' : 'Agregar')}
              </button>
            </div>
          </form>
        </div>

        {cargando ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((prod) => (
                <tr key={prod.id}>
                  <td><small className="text-muted">{prod.id.slice(0, 5)}...</small></td>
                  <td>{prod.nombre}</td>
                  <td>{prod.categoria}</td>
                  <td>${prod.precio}</td>
                  <td>{prod.stock} u.</td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => iniciarEdicion(prod)}>Editar</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarProducto(prod.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Admin;