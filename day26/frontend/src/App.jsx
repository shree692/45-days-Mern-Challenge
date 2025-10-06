import React, { useState, useEffect, useCallback } from "react";
import ExperienceList from "./components/ExperienceList";
import "./styles/experience.css";

function App() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const fetchExperiences = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5001/api/experiences");
      if (!res.ok) throw new Error("Failed to fetch data");
      const result = await res.json();
      setExperiences(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  return (
    <div className="app-container">
      <h1>Work Experience Dashboard</h1>
      <ExperienceList
        experiences={experiences}
        loading={loading}
        error={error}
        onExperienceClick={setSelectedExperience}
      />

      {selectedExperience && (
        <div className="details-section">
          <h2>{selectedExperience.company}</h2>
          <p>{selectedExperience.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
