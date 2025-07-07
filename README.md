
# 🏥 Healthcare Appointment Booking System

A full-stack MERN (MongoDB, Express, React, Node.js) application for booking and managing doctor appointments with JWT-based authentication.

---

## 🚀 Features

- 👨‍⚕️ Doctor and Patient Role Support
- 🔐 JWT-based Authentication (Login/Register)
- 📅 Book Appointments
- ❌ Cancel Appointments
- 🧠 Health Tips Generator (Frontend)
- 🎨 Responsive UI with background image, animations and contact popup

---

## 🛠️ Technologies Used

- **Frontend**: React.js, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Inline Styles + Custom CSS

---

## 📁 Folder Structure

```
/frontend/
  /src/
    /pages/
      - Login.js
      - Register.js
      - Dashboard.js
    - App.js
    - index.js

/backend/
  /controllers/
    - authController.js
    - appointmentController.js
  /routes/
    - authRoutes.js
    - appointmentRoutes.js
    - doctorRoutes.js
  /models/
    - User.js
    - Appointment.js
  /middleware/
    - authMiddleware.js
  - server.js

.env
```

---

## ⚙️ Setup Instructions

### Backend

```bash
cd backend
npm install
touch .env
# Add the following variables to .env
# MONGO_URI=your_mongodb_uri
# JWT_SECRET=your_jwt_secret
node server.js
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🔑 Notes

- Make sure to configure `.env` in the backend with your MongoDB URI and JWT secret.
- Ensure CORS is properly set if frontend and backend are on different ports.
- You can test user roles by manually inserting doctors or modifying registration logic.

---

## 🙏 Acknowledgements

This project is designed for educational purposes and built with ❤️ by Priyanshu.
