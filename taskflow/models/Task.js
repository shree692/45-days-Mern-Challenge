const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Review", "Done"],
    default: "To Do"
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium"
  },
  // 🔥 New fields
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"   // Link to User model
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team"   // Link to Team model
  }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);

