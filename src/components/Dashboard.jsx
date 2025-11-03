// client/src/components/Dashboard.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Import CSS-nya

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Cek user sudah login atau belum
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Jika belum login, tendang ke login
    }
  }, [navigate]);

  return (
    // 1. Ini kontainer utama yang punya 'border' oranye
    <div className="dashboard-layout-container">
      
      {/* 2. Gambar pertama (yang udah ada) */}
      <div className="dashboard-image-item image-1"></div>

      {/* 3. Gambar kedua (BARU) */}
      <div className="dashboard-image-item image-2"></div>

      {/* 4. Gambar ketiga (BARU) */}
      <div className="dashboard-image-item image-3"></div>

    </div>
  );
}

export default Dashboard;