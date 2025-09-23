const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  avatar: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isVerified: { type: Boolean, default: false },
  profile: {
    bio: String,
    website: String,
    socialLinks: Object,
  },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
