// client/src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username, // Asumsi 'username' di backend bisa menerima email/username
        password,
      });
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      setMessage(res.data.message);
      navigate('/dashboard'); 
      window.location.reload(); 

    } catch (error) {
      setMessage(error.response.data.message || 'Login gagal.');
    }
  };

  return (
    <div className="login-page-container">
      {/* Background Shape */}
      <div className="login-bg-shape"></div>

      {/* Back Arrow (bisa disimulasikan atau pakai icon library) */}
      <div className="back-arrow-desktop" onClick={() => navigate(-1)}>
        &larr; {/* Panah kiri */}
      </div>

      <div className="login-card-desktop">
        <h2 className="login-header-desktop">Login</h2>
        <p className="login-subtext-desktop">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group-desktop">
            {/* Menggunakan "Name or email" seperti di gambar */}
            <input
              type="text"
              placeholder="Name or email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group-desktop">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Ikon Gembok (kita pakai teks sederhana dulu) */}
            <span className="input-icon-desktop">🔒</span>
          </div>
          <button type="submit" className="login-button-desktop">
            Sign In <span className="arrow-icon-desktop">&rarr;</span> {/* Panah kanan */}
          </button>
        </form>

        {/* Separator dan Social Login Icons */}
        <div className="social-login-separator">Or Sign In with</div>
        <div className="social-icons-desktop">
          {/* Placeholder untuk ikon sosial media */}
          <div className="social-icon-btn-desktop"></div> {/* Apple */}
          <div className="social-icon-btn-desktop">G</div> {/* Google */}
          <div className="social-icon-btn-desktop">f</div> {/* Facebook */}
          <div className="social-icon-btn-desktop">W</div> {/* WhatsApp */}
        </div>
        
        {message && <p className={message.includes('berhasil') ? 'success-message' : 'error-message'}>{message}</p>}
      </div>
    </div>
  );
}

export default Login;