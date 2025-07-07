const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json()); // Required for POST body parsing

// ✅ Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// ✅ Middleware to protect sensitive routes
const protect = require('./middleware/authMiddleware');

// ✅ Appointment Routes (protected)
const appointmentRoutes = require('./routes/appointmentRoutes');
app.use('/api/appointments', protect, appointmentRoutes);

// ✅ Doctor Routes (if you have any doctor-specific endpoints)
const doctorRoutes = require('./routes/doctorRoutes');
app.use('/api/doctors', protect, doctorRoutes);

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('✅ API is running...');
});

// ✅ Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});
