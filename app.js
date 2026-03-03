const express = require("express");
const cors = require("cors");

// 1. Create the 'app' first!
const app = express();
const eventRoutes = require("./routes/eventRoutes");

// 2. Setup global middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Setup the API routes (Now it knows what 'app' is)
app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/registrations", require("./routes/registrationRoutes"));
app.use("/api/events", eventRoutes);

// 4. Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global Error Handler Caught:", err.stack);
  res.status(500).json({ 
    success: false, 
    message: "An unexpected server error occurred." 
  });
});

module.exports = app;