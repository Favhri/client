// client/src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Import CSS untuk Dashboard

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Ini seharusnya ditangani oleh ProtectedRoute, tapi sebagai fallback
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload(); // Refresh agar navbar update
  };

  if (!user) {
    return <div>Loading...</div>; // Tampilan loading
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2>Selamat Datang di Dashboard, {user.username}!</h2>
        <p>Ini adalah halaman yang dilindungi. Hanya user yang login yang bisa melihatnya.</p>
        
        <div className="user-info">
          <h3>Detail User:</h3>
          <p>ID: {user.id}</p>
          <p>Username: {user.username}</p>
        </div>

        <button onClick={handleLogout} className="dashboard-logout-button">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;