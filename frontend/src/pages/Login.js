import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../pages/Login.css';
import girlImage from './girl-thinking.png';
import hospitalImage from './Hospital_image.png';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      alert('Login successful');
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-page" style={{ backgroundImage: `url(${hospitalImage})` }}>
      <header className="login-header">
        <h1 className="login-logo">Healthcare App</h1>
        <nav className="login-nav">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/doctors">Doctors</Link>
        </nav>
      </header>

      <div className={`login-card ${animate ? 'show' : ''}`}>
        <h2>Welcome Back!</h2>
        <form onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="your.email@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="********"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>
        <p className="login-text">
          Don’t have an account? <Link to="/register" className="register-link">Register here</Link>
        </p>
      </div>

      <div className="contact-wrapper">
        <img src={girlImage} alt="Thinking Girl" className="girl-image" />
        <div className="contact-box">
          <p>📞 +91 995853XXXX</p>
          <p>📧 hospitalsample@gmail.com</p>
        </div>
      </div>

      <footer className="login-footer">
        © 2025 Healthcare App. All rights reserved.
      </footer>
    </div>
  );
}

export default Login;
