// client/src/components/Navbar.jsx

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// Kita gak perlu import CSS khusus, karena style-nya udah ada di index.css

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation(); // Hook buat deteksi pindah halaman
  const navigate = useNavigate();

  // useEffect ini bakal jalan tiap kali lu pindah halaman (ganti URL)
  // Buat nge-cek status login dari localStorage
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
  }, [location]); // <-- Dijalankan ulang setiap 'location' berubah

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate('/login'); // Arahkan ke login
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
        
        {isLoggedIn && (
          <li className="nav-item"><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
        )}

        {/* === INI BAGIAN MEGA MENU BARU === */}
        <li className="nav-item has-megamenu">
          {/* Kita pakai tag <a> biasa karena ini cuma trigger hover */}
          <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
            Edukasi Bencana ▾
          </a> 
          
          {/* Ini isi Mega Menu-nya */}
          <div className="mega-menu">
            <div className="mega-menu-content">
              
              <div className="mega-menu-column">
                <h4></h4>
                <ul>
                  <li><Link to="/layanan/a">Tsunami</Link></li>
                  <li><Link to="/layanan/b">Gempa Bumi</Link></li>
                  <li><Link to="/layanan/c">Erupsi Gunung</Link></li>
                  <li><Link to="/layanan/d">Cuaca Ekstrem</Link></li>
                  <li><Link to="/layanan/d">Banjir</Link></li>
                </ul>
              </div>

              <div className="mega-menu-column">
                <h4></h4>
                <ul>
                  <li><Link to="/layanan/e">Katana</Link></li>
                  <li><Link to="/layanan/f">SPAB</Link></li>
                  <li><Link to="/layanan/G">Relawan PB</Link></li>
                </ul>
              </div>

              <div className="mega-menu-column">
                <h4>Informasi</h4>
                <p>
                  Edukasi bencana alam bertujuan untuk mengenalkan masyarakat tentang cara menghadapi dan mencegah dampak dari berbagai bencana seperti gempa bumi, banjir, tanah longsor, dan kebakaran hutan.

Melalui edukasi ini, masyarakat diharapkan tahu apa yang harus dilakukan sebelum, saat, dan setelah bencana terjadi. Dengan begitu, risiko korban dan kerugian bisa dikurangi.

Kesadaran dan pengetahuan tentang kesiapsiagaan sangat penting agar setiap orang dapat melindungi diri sendiri, keluarga, dan lingkungan sekitar saat terjadi bencana.
                </p>
              </div>

            </div>
          </div>
        </li>
        {/* === AKHIR BAGIAN MEGA MENU === */}
        
        {isLoggedIn ? (
          // === TAMPILAN JIKA SUDAH LOGIN ===
          <li className="nav-item nav-right">
            <span className="nav-user">Halo, {currentUser?.username}!</span>
            <button onClick={handleLogout} className="nav-logout-button">
              Logout
            </button>
          </li>
        ) : (
          // === TAMPILAN JIKA BELUM LOGIN ===
          <>
            <li className="nav-item nav-right"><Link to="/login" className="nav-link">Login</Link></li>
            <li className="nav-item"><Link to="/register" className="nav-link">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;