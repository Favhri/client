// client/src/components/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css'; // Kita akan buat file CSS ini

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
      });
      setMessage(res.data.message);
      // Jika berhasil, arahkan ke halaman login
      navigate('/login');
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="register-page-container">
      <div className="register-bg-shape"></div>

      <div className="back-arrow-desktop" onClick={() => navigate(-1)}>
        &larr;
      </div>

      <div className="register-card-desktop">
        <h2 className="register-header-desktop">Sign Up</h2>
        <p className="register-subtext-desktop">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group-desktop">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <span className="input-icon-desktop">👤</span>
          </div>
          <div className="form-group-desktop">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="input-icon-desktop">🔒</span>
          </div>
          <button type="submit" className="register-button-desktop">
            Sign Up <span className="arrow-icon-desktop">&rarr;</span>
          </button>
        </form>
        
        {message && <p className={message.includes('berhasil') ? 'success-message' : 'error-message'}>{message}</p>}
      </div>
    </div>
  );
}

export default Register;