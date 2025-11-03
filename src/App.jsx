// client/src/App.jsx

// Hapus useState dan useEffect dari sini
import React from 'react'; 
// Hapus Link juga, karena udah di Navbar.jsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Dashboard from './components/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Navbar from './components/Navbar.jsx'; // <-- 1. IMPORT KOMPONEN BARU

import './index.css';

// Komponen wrapper untuk mengakses hook 'useLocation'
function AppContent() {
  const location = useLocation(); 

  // State isLoggedIn dan currentUser udah GAK ADA di sini,
  // udah pindah semua ke Navbar.jsx

  // Logic ini tetap di sini, buat nentuin kapan navbar muncul
  const pagesWithoutNav = ['/login', '/register'];
  const shouldShowNav = !pagesWithoutNav.includes(location.pathname);

  return (
    <div>
      {/* 2. GANTI SEMUA BLOK <nav> DENGAN INI */}
      {shouldShowNav && <Navbar />}
      
      {/* Konten utama */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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

// Komponen App utama (ini biarin aja)
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;