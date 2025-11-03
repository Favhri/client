// client/src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Dashboard from './components/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import './index.css'; // Import CSS global

// Komponen wrapper untuk mengakses hook 'useLocation'
function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Dapatkan lokasi (path) halaman saat ini
  const location = useLocation(); 

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
  }, [location]); // dependency 'location' agar state update saat pindah halaman

  // Halaman-halaman yang TIDAK akan menampilkan navbar
  const pagesWithoutNav = ['/login', '/register'];
  const shouldShowNav = !pagesWithoutNav.includes(location.pathname);

  return (
    <div>
      {/* Tampilkan navbar HANYA jika 'shouldShowNav' bernilai true */}
      {shouldShowNav && (
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
            {isLoggedIn ? (
              <>
                <li className="nav-item"><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
                <li className="nav-item nav-right">
                  <span className="nav-user">Halo, {currentUser?.username}!</span>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item nav-right"><Link to="/login" className="nav-link">Login</Link></li>
                <li className="nav-item"><Link to="/register" className="nav-link">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      )}
      
      {/* Konten utama */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Rute yang diproteksi */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </div>
  );
}

// Komponen App utama
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;