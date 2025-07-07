import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient',
    hospitalKey: ''
  });

  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (role) => {
    setForm({ ...form, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      alert('Registration successful');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ ...styles.container }}>
      <div style={{ ...styles.overlay, opacity: fadeIn ? 1 : 0, transform: fadeIn ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.6s ease' }}>
        <div style={styles.card}>
          <h2 style={styles.title}>Register</h2>

          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <div style={styles.roleContainer}>
              <button
                type="button"
                onClick={() => handleRoleSelect('doctor')}
                style={{
                  ...styles.roleButton,
                  background: form.role === 'doctor'
                    ? 'linear-gradient(to right, #4e54c8, #8f94fb)'
                    : 'white',
                  color: form.role === 'doctor' ? '#fff' : 'black',
                  fontWeight: form.role === 'doctor' ? 'bold' : 'normal',
                }}
              >
                Doctor
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect('patient')}
                style={{
                  ...styles.roleButton,
                  background: form.role === 'patient'
                    ? 'linear-gradient(to right, #4e54c8, #8f94fb)'
                    : 'white',
                  color: form.role === 'patient' ? '#fff' : 'black',
                  fontWeight: form.role === 'patient' ? 'bold' : 'normal',
                }}
              >
                Patient
              </button>
            </div>

            {form.role === 'doctor' && (
              <input
                type="text"
                name="hospitalKey"
                placeholder="Hospital Key"
                value={form.hospitalKey}
                onChange={handleChange}
                required
                style={styles.input}
              />
            )}

            <button type="submit" style={styles.submitButton}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundImage: 'url("/register_background.png")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
  },
  card: {
    backgroundColor: '#fff',
    padding: '2.5rem',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    width: '320px',
    transition: 'all 0.5s ease',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '24px',
    fontWeight: '700',
    animation: 'fadeInDown 0.6s ease',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  label: {
    fontWeight: 'bold',
    fontSize: '14px',
  },
  input: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px',
    transition: 'box-shadow 0.3s ease',
  },
  roleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
    marginBottom: '10px',
  },
  roleButton: {
    padding: '8px 20px',
    borderRadius: '20px',
    border: '1px solid #ccc',
    cursor: 'pointer',
    width: '48%',
    fontSize: '14px',
    transition: 'all 0.3s ease',
  },
  submitButton: {
    background: 'linear-gradient(to right, #4e54c8, #8f94fb)',
    color: '#fff',
    fontWeight: 'bold',
    padding: '10px',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    marginTop: '10px',
    fontSize: '16px',
    transition: 'all 0.3s ease',
  },
};

export default Register;
