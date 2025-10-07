import React, { useEffect, useState } from "react";
import API from "../api/api";
import { FaEdit, FaTrash } from "react-icons/fa";

function WorkExperienceList({ onEdit }) {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchExperiences = async () => {
    setLoading(true);
    const res = await API.get("/");
    setExperiences(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this experience?")) return;
    await API.delete(`/${id}`);
    fetchExperiences();
  };

  return (
    <div className="list-container">
      <h2>All Work Experiences</h2>
      {loading ? (
        <p>Loading...</p>
      ) : experiences.length === 0 ? (
        <p>No work experience found.</p>
      ) : (
        experiences.map((exp) => (
          <div key={exp._id} className="card">
            <h3>{exp.company}</h3>
            <p><strong>Position:</strong> {exp.position}</p>
            <p>
              {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}
            </p>
            <p>{exp.description}</p>
            <p><strong>Skills:</strong> {exp.skills}</p>
            <p><strong>Tech:</strong> {exp.technologies}</p>

            <div className="actions">
              <button onClick={() => onEdit(exp)}><FaEdit /> Edit</button>
              <button onClick={() => handleDelete(exp._id)}><FaTrash /> Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default WorkExperienceList;
