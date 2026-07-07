import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css' // <-- NUEVO: Agregamos Bootstrap acá arriba
// import './index.css' // <-- Al comentarlo con // evitamos que los estilos de Vite rompan el diseño

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)