const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); 

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true,
    
  },
  role: { 
    type: String, 
    enum: ["student", "faculty"], 
    required: true 
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6 
  }
}, {
  timestamps: true 
});


userSchema.pre("save", async function () {
  // If the password wasn't changed, just stop and let Mongoose continue automatically
  if (!this.isModified("password")) {
    return;
  }
  
  // Scramble the password securely
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
