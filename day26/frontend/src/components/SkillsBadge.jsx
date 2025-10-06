import React from "react";

function SkillsBadge({ skill, featured = false }) {
  const isFeatured =
    featured || ["React", "JavaScript", "Node.js", "TypeScript"].includes(skill);

  return (
    <span className={`skill-badge ${isFeatured ? "featured" : ""}`}>
      {skill}
    </span>
  );
}

export default SkillsBadge;
