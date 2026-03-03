const Registration = require("../models/Registration");
const Event = require("../models/event");

exports.registerForEvent = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({ message: "Event ID is required." });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    if (new Date(event.date) < new Date()) {
      return res.status(400).json({ message: "Registration closed. This event has already passed." });
    }

    if (event.capacity && event.registeredStudents && event.registeredStudents.length >= event.capacity) {
      return res.status(400).json({ message: "Event is at full capacity." });
    }

    const existing = await Registration.findOne({
      student: studentId,
      event: eventId
    });

    if (existing) {
      return res.status(400).json({
        message: "You are already registered for this event."
      });
    }

    const registration = await Registration.create({
      student: studentId,
      event: eventId
    });

    if (!event.registeredStudents) {
      event.registeredStudents = [];
    }
    event.registeredStudents.push(studentId);
    await event.save();

    res.status(201).json({
      message: "Registration successful",
      registration
    });
    
  } catch (error) {
    console.error("Error in registerForEvent:", error); 
    res.status(500).json({ message: "An internal server error occurred during registration." });
  }
};

exports.getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ student: req.user.id })
      .populate("event");

    res.status(200).json({
      success: true,
      count: registrations.length,
      registrations: registrations
    });

  } catch (error) {
    console.error("Error fetching user registrations:", error);
    res.status(500).json({ message: "Server error while fetching registrations." });
  }
};

exports.updateAttendance = async (req, res) => {
  try {
    const { status } = req.body;
    const registrationId = req.params.id; 

    if (!["Present", "Absent", "Pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status. Use Present, Absent, or Pending." });
    }

    const updatedRegistration = await Registration.findByIdAndUpdate(
      registrationId,
      { attendanceStatus: status },
      { new: true } 
    );

    if (!updatedRegistration) {
      return res.status(404).json({ message: "Registration not found." });
    }

    res.status(200).json({
      message: "Attendance updated successfully!",
      registration: updatedRegistration
    });

  } 
  catch (error) {
    console.error("Error updating attendance:", error);
    res.status(500).json({ message: "Server error while updating attendance." });
  }
};
