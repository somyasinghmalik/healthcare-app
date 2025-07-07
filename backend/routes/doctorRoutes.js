const express = require('express');
const router = express.Router();
const User = require('../models/User');
const protect = require('../middleware/authMiddleware');

// GET /api/doctors — Get all doctors
router.get('/', protect, async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' }, 'name email'); // Return only name and email
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching doctors', error: err });
  }
});

module.exports = router;
