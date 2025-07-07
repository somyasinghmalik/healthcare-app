import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const token = localStorage.getItem('token');
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ doctorName: '', date: '', reason: '' });
  const [tip, setTip] = useState('');

  const predefinedDoctors = [
    { name: 'Dr. Alice Sharma - Cardiologist' },
    { name: 'Dr. Rohan Mehta - Neurologist' },
    { name: 'Dr. Priya Verma - Dermatologist' },
    { name: 'Dr. Anil Kapoor - Orthopedic' },
    { name: 'Dr. Kavita Rao - Pediatrician' },
    { name: 'Dr. Neeraj Gupta - Oncologist' },
    { name: 'Dr. Sneha Das - Gynecologist' },
    { name: 'Dr. Arjun Khanna - Psychiatrist' },
    { name: 'Dr. Meena Iyer - ENT Specialist' },
    { name: 'Dr. Vinay Singh - General Physician' }
  ];

  const fetchAppointments = async () => {
    if (!token) return;
    try {
      const res = await axios.get('http://localhost:5000/api/appointments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(res.data);
    } catch (err) {
      console.error('Error fetching appointments:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please log in again.");
      return;
    }

    if (!form.doctorName || !form.date || !form.reason) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/appointments', form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      alert('✅ Appointment booked successfully');
      setForm({ doctorName: '', date: '', reason: '' });
      fetchAppointments();
    } catch (err) {
      console.error('❌ Booking failed:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Booking failed. Please try again.');
    }
  };

  const cancelAppointment = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('❌ Appointment canceled successfully');
      fetchAppointments();  // Re-fetch appointments after cancellation
    } catch (err) {
      console.error('❌ Cancellation failed:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Cancellation failed. Please try again.');
    }
  };

  const generateHealthTip = () => {
    const tips = [
      'Stay hydrated 🥤',
      'Get 7–8 hours of sleep 😴',
      'Eat more fruits & vegetables 🍎🥦',
      'Take breaks from screens 🖥️',
      'Exercise regularly 🏃‍♂️'
    ];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTip(randomTip);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', background: '#f0f8ff', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Your Dashboard</h1>

      {/* New Appointment Section */}
      <div style={{
        background: '#e6f0ff',
        padding: '2rem',
        borderRadius: '15px',
        maxWidth: '600px',
        margin: '0 auto',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
      }}>
        <h2>📅 Book New Appointment</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
            <select name="doctorName" value={form.doctorName} onChange={handleChange} required style={{ flex: 1, padding: '10px', borderRadius: '8px' }}>
              <option value="">Select Doctor</option>
              {predefinedDoctors.map((doc, i) => (
                <option key={i} value={doc.name}>{doc.name}</option>
              ))}
            </select>
            <input type="date" name="date" value={form.date} onChange={handleChange} required style={{ flex: 1, padding: '10px', borderRadius: '8px' }} />
          </div>

          <div style={{ marginTop: '1rem' }}>
            <input
              type="text"
              name="reason"
              placeholder="e.g., Routine checkup, consultation"
              value={form.reason}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '8px' }}
            />
          </div>

          <button type="submit" style={{
            marginTop: '1.5rem',
            width: '100%',
            padding: '12px',
            background: 'linear-gradient(to right, #4f46e5, #6d28d9)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>Book Appointment</button>
        </form>
      </div>

      {/* Health Tip Section */}
      <div style={{
        background: '#fff8e1',
        padding: '1.5rem',
        borderRadius: '15px',
        margin: '2rem auto',
        maxWidth: '600px',
        textAlign: 'center'
      }}>
        <h3>ℹ️ Daily Health Tip</h3>
        <button onClick={generateHealthTip} style={{
          background: '#fca311',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '8px',
          marginTop: '1rem',
          fontWeight: 'bold',
          color: '#fff',
          cursor: 'pointer'
        }}>Generate Health Tip 🧠</button>
        {tip && (
          <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{tip}</p>
        )}
      </div>

      {/* Upcoming Appointments Section */}
      <div style={{
        background: '#e6ffe6',
        padding: '1.5rem',
        borderRadius: '15px',
        margin: '2rem auto',
        maxWidth: '600px'
      }}>
        <h3>📋 Your Upcoming Appointments</h3>
        {appointments.length === 0 ? (
          <p>No appointments yet.</p>
        ) : (
          appointments.map(appt => (
            <div key={appt._id} style={{
              background: '#fff',
              padding: '1rem',
              borderRadius: '8px',
              marginTop: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}>
              <div>
                <strong>Doctor:</strong> {appt.doctorName}<br />
                <strong>Date:</strong> {appt.date?.slice(0, 10)}<br />
                <strong>Reason:</strong> {appt.reason}
              </div>
              <button
                style={{
                  background: '#e63946',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  cursor: 'pointer'
                }}
                onClick={() => cancelAppointment(appt._id)}
              >
                Cancel
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
