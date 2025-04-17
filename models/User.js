const mongoose = require('mongoose');

// User Schema for Patient/Doctor
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  role: {
    type: String,
    enum: ['patient', 'doctor'],
    required: [true, 'Role is required']
  }
}, {
  timestamps: true // adds createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);
module.exports = User;
