const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("🔐 Incoming auth header:", authHeader); // Debug log

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    console.log("🪙 Extracted Token:", token); // Debug log

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("✅ Token verified. Decoded user:", decoded); // Debug log

      req.user = decoded;
      next();
    } catch (err) {
      console.error("❌ Token verification failed:", err.message); // Debug log
      return res.status(401).json({ message: "Token is invalid" });
    }
  } else {
    console.warn("⚠️ No token provided in request"); // Debug log
    return res.status(401).json({ message: "No token provided" });
  }
};

module.exports = protect;
