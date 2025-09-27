const mongoose = require('mongoose');
const techSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: String
});
module.exports = mongoose.model('Technology', techSchema);