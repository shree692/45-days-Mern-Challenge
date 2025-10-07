import mongoose from "mongoose";

const workExperienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    position: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String },
    current: { type: Boolean, default: false },
    description: { type: String },
    skills: { type: [String] },
    technologies: { type: [String] },
  },
  { timestamps: true }
);

const WorkExperience = mongoose.model("WorkExperience", workExperienceSchema);

export default WorkExperience;
