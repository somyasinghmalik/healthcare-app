const Appointment = require('../models/Appointment');

// Book appointment
exports.createAppointment = async (req, res) => {
  const { doctorName, date, reason } = req.body;

  try {
    if (!req.user || !req.user.name) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const appointment = new Appointment({
      patientName: req.user.name,
      doctorName,
      date,
      reason,
    });

    await appointment.save();
    res.status(201).json({ message: 'Appointment booked', appointment });
  } catch (err) {
    res.status(500).json({ message: 'Error booking appointment', error: err.message });
  }
};

// Get appointments (all for doctor, own for patient)
exports.getAppointments = async (req, res) => {
  try {
    if (!req.user || !req.user.role || !req.user.name) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const filter = req.user.role === 'doctor'
      ? {}
      : { patientName: req.user.name };

    const appointments = await Appointment.find(filter).sort({ date: 1 });
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching appointments', error: err.message });
  }
};

// Cancel appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.id);

    if (!appt) return res.status(404).json({ message: 'Appointment not found' });

    // Optional: Check if user is authorized to cancel
    if (req.user.role !== 'doctor' && appt.patientName !== req.user.name) {
      return res.status(403).json({ message: 'Unauthorized to cancel this appointment' });
    }

    await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Appointment canceled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error cancelling appointment', error: err.message });
  }
};
