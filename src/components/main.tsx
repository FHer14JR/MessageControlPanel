import React from 'react';
import { createRoot } from 'react-dom/client';
import AdminDashboard from './AdminDashboard';
import PublicRequestForm from './componets/PublicRequestForm';
import './index.css';

// Esta función decide qué mostrar según la URL
const App = () => {
  const isAdmin = window.location.pathname === '/admin';
  return isAdmin ? <AdminDashboard /> : <PublicRequestForm />;
};

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('No se encontró el elemento root');

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);