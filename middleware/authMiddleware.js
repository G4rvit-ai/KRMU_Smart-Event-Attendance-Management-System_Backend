const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access Denied: No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "SECRET_KEY");
    req.user = decoded; 
    next();
  }  
  catch (err) {
      console.log("JWT Error Details:", err.message);       
      return res.status(401).json({ message: "Invalid or expired token." });
    }
};

const isStudent = (req, res, next) => {
  if (req.user && req.user.role === 'student') {
    next();
  } 
  else {
    return res.status(403).json({ message: "Access Denied: Requires Student privileges." });
  }
};

const isFaculty = (req, res, next) => {
  if (req.user && req.user.role === 'faculty') {
    next();
  } 
  else {
    return res.status(403).json({ message: "Access Denied: Requires Faculty privileges." });
  }
};

module.exports = {
  verifyToken,
  isStudent,
  isFaculty
};
