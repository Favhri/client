// client/src/components/Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Cek apakah ada token di localStorage
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setUser(JSON.parse(userData));
    } else {
      // Jika tidak ada token, user belum login
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login'); // Arahkan ke login setelah logout
  };

  return (
    <div>
      <h1>Selamat Datang!</h1>
      {user ? (
        <div>
          <p>Anda login sebagai: <strong>{user.username}</strong></p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Silakan login atau register untuk melanjutkan.</p>
        </div>
      )}
    </div>
  );
}

export default Home;