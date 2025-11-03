// client/src/components/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Buat CSS baru untuk Home

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(user));
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  }, []);

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Selamat Datang di Aplikasi Kami!</h1>
        {isLoggedIn ? (
          <div>
            <p className="welcome-message">Halo, <strong>{currentUser.username}</strong>! Anda sudah login.</p>
            <p>Silakan kunjungi <Link to="/dashboard" className="home-link">Dashboard</Link> Anda.</p>
          </div>
        ) : (
          <div>
            <p className="welcome-message">Silakan <Link to="/login" className="home-link">Login</Link> atau <Link to="/register" className="home-link">Register</Link> untuk memulai.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;