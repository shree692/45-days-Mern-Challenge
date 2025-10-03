import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/projects");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
   <div className="App">
  <div className="header">
    <h1 className="title">My Projects</h1>
    <button className="refresh-btn" onClick={fetchProjects}>🔄</button>
  </div>

  {loading && <p className="loading">Loading projects...</p>}
  {error && <p className="error">{error}</p>}

  <div className="projects-list">
    {projects.map((project) => (
      <div className="project-item" key={project.id}>
        <span className="pointer">•</span>
        <div>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
        </div>
      </div>
    ))}
  </div>
</div>

  );
}

export default App;
