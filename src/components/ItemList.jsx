import React from 'react';
import { Link } from 'react-router-dom';

const ItemList = ({ productos }) => {
  return (
    <div className="container my-5">
      <div className="row g-4">
        {productos.map((prod) => (
          <div key={prod.id} className="col-12 col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title fw-bold">{prod.nombre}</h5>
                  <span className="badge bg-secondary mb-2">{prod.categoria}</span>
                  <p className="card-text text-muted">Stock: {prod.stock} u.</p>
                </div>
                <div className="mt-3">
                  <h4 className="text-dark fw-bold">${prod.precio}</h4>
                  <Link to={`/item/${prod.id}`} className="btn btn-primary w-100 mt-2">
                    Ver Detalle
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;