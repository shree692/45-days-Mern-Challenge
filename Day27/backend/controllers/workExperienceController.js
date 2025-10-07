import WorkExperience from "../models/WorkExperience.js";

// 🟢 GET all experiences
export const getExperiences = async (req, res) => {
  try {
    const experiences = await WorkExperience.find().sort({ createdAt: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// 🟡 CREATE new experience
export const createExperience = async (req, res) => {
  try {
    const newExperience = new WorkExperience(req.body);
    const saved = await newExperience.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 🔵 UPDATE existing experience
export const updateExperience = async (req, res) => {
  try {
    const updated = await WorkExperience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not Found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 🔴 DELETE experience
export const deleteExperience = async (req, res) => {
  try {
    const deleted = await WorkExperience.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not Found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
