import React, { useState } from "react";
import WorkExperienceForm from "./components/WorkExperienceForm";
import WorkExperienceList from "./components/WorkExperienceList";
import "./App.css";

function App() {
  const [editingData, setEditingData] = useState(null);

  const handleAdd = () => window.location.reload();
  const handleUpdate = () => window.location.reload();

  return (
    <div className="app">
      <h1>Work Experience Manager</h1>
      <WorkExperienceForm
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        editingData={editingData}
        setEditingData={setEditingData}
      />
      <WorkExperienceList onEdit={setEditingData} />
    </div>
  );
}

export default App;
