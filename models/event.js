const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true 
  },
  description: {
    type: String,
    trim: true
  },
  date: { 
    type: Date, 
    required: true 
  },
  time: { 
    type: String, 
    required: true 
  },
  venue: {
    type: String,
    required: true 
  },
  capacity: {
    type: Number,
    default: null 
  },
  registeredStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" 
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true 
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model("Event", eventSchema);