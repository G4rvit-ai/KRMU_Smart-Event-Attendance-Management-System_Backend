require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("FATAL ERROR: MONGODB_URI is not defined in the .env file.");
  process.exit(1); 
}

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully.");
    
    app.listen(PORT, () => {
      console.log(`Server is running securely on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1); 
  });

 