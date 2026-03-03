const Event = require("../models/event");

exports.createEvent = async (req, res) => {
  try {
    const { title, date, time, venue, capacity } = req.body;

    if (!title || !date || !time || !venue) {
      return res.status(400).json({ message: "Please provide title, date, time, and venue." });
    }

    const newEvent = await Event.create({
      title,
      date,
      time,
      venue,
      capacity: capacity || 50,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Event created successfully!",
      event: newEvent
    });

  } 
  catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Server error during event creation." });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();

    res.status(200).json({
      success: true,
      count: events.length,
      events: events
    });

  } 
  catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server error while fetching events." });
  }
};
