const express = require("express");
const Team = require("../models/Team");
const User = require("../models/User");
const router = express.Router();

// ✅ Create Team
router.post("/", async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Get All Teams (with members populated)
router.get("/", async (req, res) => {
  try {
    const teams = await Team.find().populate("members");
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get Team by ID
router.get("/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate("members");
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add Member to Team
router.post("/:id/members", async (req, res) => {
  try {
    const { userId } = req.body;
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });

    // check if user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // add user if not already in team
    if (!team.members.includes(userId)) {
      team.members.push(userId);
      await team.save();
    }

    res.json(await team.populate("members"));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Remove Member from Team
router.delete("/:id/members/:userId", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });

    team.members = team.members.filter(
      memberId => memberId.toString() !== req.params.userId
    );
    await team.save();

    res.json(await team.populate("members"));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update Team
router.put("/:id", async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete Team
router.delete("/:id", async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.json({ message: "Team deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
