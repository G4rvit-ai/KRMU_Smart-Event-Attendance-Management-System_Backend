const express = require("express");
const router = express.Router();

const { createEvent, getAllEvents } = require("../controllers/eventController");
const { verifyToken, isFaculty } = require("../middleware/authMiddleware");

router.post("/create", verifyToken, isFaculty, createEvent);
router.get("/all", getAllEvents);
module.exports = router;