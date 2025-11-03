// client/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    // Jika tidak ada token, arahkan kembali ke halaman login
    return <Navigate to="/login" replace />;
  }

  return children; // Jika ada token, tampilkan komponen (Dashboard)
}

export default ProtectedRoute;