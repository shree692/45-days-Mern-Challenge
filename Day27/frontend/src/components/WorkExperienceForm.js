import React, { useState } from "react";
import API from "../api/api";
import { FaSpinner } from "react-icons/fa";

function WorkExperienceForm({ onAdd, onUpdate, editingData, setEditingData }) {
  const [formData, setFormData] = useState({
    company: editingData?.company || "",
    position: editingData?.position || "",
    startDate: editingData?.startDate || "",
    endDate: editingData?.endDate || "",
    isCurrent: editingData?.isCurrent || false,
    description: editingData?.description || "",
    skills: editingData?.skills || "",
    technologies: editingData?.technologies || "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (editingData) {
        const res = await API.put(`/${editingData._id}`, formData);
        onUpdate(res.data);
        setMessage("Work experience updated successfully!");
      } else {
        const res = await API.post("/", formData);
        onAdd(res.data);
        setMessage("Work experience added successfully!");
      }
      setFormData({
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        description: "",
        skills: "",
        technologies: "",
      });
      setEditingData(null);
    } catch (err) {
      setMessage("Error: " + (err.response?.data?.message || "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>{editingData ? "Edit Work Experience" : "Add Work Experience"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={formData.position}
          onChange={handleChange}
          required
        />
        <div className="date-section">
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
          {!formData.isCurrent && (
            <>
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </>
          )}
        </div>
        <label>
          <input
            type="checkbox"
            name="isCurrent"
            checked={formData.isCurrent}
            onChange={handleChange}
          />{" "}
          Current Role
        </label>

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
        />

        <input
          type="text"
          name="technologies"
          placeholder="Technologies (comma separated)"
          value={formData.technologies}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? <FaSpinner className="spin" /> : editingData ? "Update" : "Add"}
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default WorkExperienceForm;
