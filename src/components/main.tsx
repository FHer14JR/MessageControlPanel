import React from 'react';
import { createRoot } from 'react-dom/client';
// CORRECCIÓN: Ajustar la ruta para apuntar a la carpeta components
import AdminDashboard from './components/AdminDashboard'; 
import './index.css'; 

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <AdminDashboard />
    </React.StrictMode>
  );
}