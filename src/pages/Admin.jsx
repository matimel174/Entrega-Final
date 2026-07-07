import React, { useState } from 'react';

const Admin = () => {
  // Estado local para los productos de la tabla de administración
  const [productos, setProductos] = useState([
    { id: "1", nombre: "Monitor Gamer 27''", precio: 350000, categoria: "monitores", stock: 10 },
    { id: "2", nombre: "Gabinete Corsair 4000D", precio: 180000, categoria: "gabinetes", stock: 5 }
  ]);

  const [editandoId, setEditandoId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaData = { nombre, precio: Number(precio), categoria, stock: Number(stock) };

    if (editandoId) {
      setProductos(productos.map(p => p.id === editandoId ? { ...p, ...nuevaData } : p));
      setEditandoId(null);
    } else {
      setProductos([...productos, { ...nuevaData, id: Date.now().toString() }]);
    }

    setNombre(''); setPrecio(''); setCategoria(''); setStock('');
  };

  const iniciarEdicion = (prod) => {
    setEditandoId(prod.id);
    setNombre(prod.nombre);
    setPrecio(prod.precio);
    setCategoria(prod.categoria);
    setStock(prod.stock);
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter(p => p.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Panel de Control - Administrador CRUD</h2>
      
      <div className="card p-4 mb-5 shadow-sm">
        <h4>{editandoId ? '🔑 Editar Producto' : '📦 Cargar Nuevo Producto'}</h4>
        <form onSubmit={handleSubmit} className="row g-3 mt-2">
          <div className="col-md-4">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>
          <div className="col-md-2">
            <label className="form-label">Precio ($)</label>
            <input type="number" className="form-control" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
          </div>
          <div className="col-md-3">
            <label className="form-label">Categoría</label>
            <input type="text" className="form-control" value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
          </div>
          <div className="col-md-2">
            <label className="form-label">Stock</label>
            <input type="number" className="form-control" value={stock} onChange={(e) => setStock(e.target.value)} required />
          </div>
          <div className="col-md-1 d-flex align-items-end">
            <button type="submit" className={`btn w-100 ${editandoId ? 'btn-warning' : 'btn-success'}`}>
              {editandoId ? 'Guardar' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>

      <h4 className="mb-3">Listado de Stock</h4>
      <div className="table-responsive">
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
                <td><small className="text-muted">{prod.id}</small></td>
                <td><strong>{prod.nombre}</strong></td>
                <td><span className="badge bg-secondary">{prod.categoria}</span></td>
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
      </div>
    </div>
  );
};

export default Admin;