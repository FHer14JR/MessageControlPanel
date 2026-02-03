import React from 'react';
import { createRoot } from 'react-dom/client';
import AdminDashboard from '../AdminDashboard'; 
import '../index.css'; 

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <AdminDashboard />
    </React.StrictMode>
  );
}