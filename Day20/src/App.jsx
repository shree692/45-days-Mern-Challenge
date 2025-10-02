import React from "react";
import ProjectCard from "./components/ProjectCard";
import "./styles/ProjectCard.css";

function App() {
  const projects = [
    {
      title: "Blog Platform",
      description: "A full-stack MERN blog app with authentication and search."
    },
    {
      title: "Weather App",
      description: "Real-time weather dashboard using external APIs."
    },
    {
      title: "Fashionista",
      description: "E-commerce fashion site with React frontend + backend auth."
    },
    {
      title: "Portfolio Website",
      description: "Animated portfolio showcasing projects and skills."
    }
  ];

  return (
    <div className="card-container">
      {projects.map((project, index) => (
        <ProjectCard 
          key={index} 
          title={project.title} 
          description={project.description} 
        />
      ))}
    </div>
  );
}

export default App;
