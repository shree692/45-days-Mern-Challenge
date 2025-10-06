import React, { useState } from 'react';
import Navbar from './Navbar';
import ProjectCard from './ProjectCard';
import Login from './Login';
import './App.css';

function App() {
  const [page, setPage] = useState("home");

  const [projects, setProjects] = useState([
    { id: 1, title: "Portfolio Website", description: "Showcasing my skills, projects, and achievements.", tech: ["React", "CSS", "GitHub Pages"] },
    { id: 2, title: "E-Commerce Store", description: "Online shopping platform with cart, filters, and checkout.", tech: ["React", "Node.js", "MongoDB", "Express"] },
  ]);

  // Form state
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newTech, setNewTech] = useState("");

  const handleAddProject = (e) => {
    e.preventDefault();

    if (!newTitle || !newDescription || !newTech) return;

    const newProject = {
      id: projects.length + 1,
      title: newTitle,
      description: newDescription,
      tech: newTech.split(",").map(t => t.trim()), // convert CSV to array
    };

    setProjects([newProject, ...projects]); // add new project at top
    setNewTitle("");
    setNewDescription("");
    setNewTech("");
  };

  return (
    <div>
      <Navbar onNavigate={setPage} />

      {page === "home" && (
        <div className="home-container">
         
          <div className="app-container">
            <h2>New Project</h2>
            {/* Add Project Form */}
            <form className="add-project-form" onSubmit={handleAddProject}>
              <input 
                type="text" 
                placeholder="Project Title" 
                value={newTitle} 
                onChange={(e) => setNewTitle(e.target.value)} 
              />
              <input 
                type="text" 
                placeholder="Description" 
                value={newDescription} 
                onChange={(e) => setNewDescription(e.target.value)} 
              />
              <input 
                type="text" 
                placeholder="Tech Stack (comma separated)" 
                value={newTech} 
                onChange={(e) => setNewTech(e.target.value)} 
              />
              <button type="submit">Add Project</button>
            </form>
             <h2>📂 My Projects</h2>
            <div className="project-list">
              {projects.map((p) => (
                <ProjectCard
                  key={p.id}
                  title={p.title}
                  description={p.description}
                  tech={p.tech.join(", ")}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {page === "login" && <Login />}
    </div>
  );
}

export default App;
