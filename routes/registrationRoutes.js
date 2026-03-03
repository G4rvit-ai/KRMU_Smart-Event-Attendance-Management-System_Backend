const express = require("express");
const router = express.Router();

const { verifyToken, isStudent, isFaculty } = require("../middleware/authMiddleware");
const { registerForEvent, getMyRegistrations, updateAttendance } = require("../controllers/registrationController");

router.post("/register", verifyToken, isStudent, registerForEvent);
router.get("/my-registrations", verifyToken, getMyRegistrations);
module.exports = router;

router.put("/update-attendance/:id", verifyToken, isFaculty, updateAttendance);
