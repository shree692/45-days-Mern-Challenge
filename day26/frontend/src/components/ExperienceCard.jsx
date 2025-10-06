import React from "react";
import SkillsBadge from "./SkillsBadge";

function ExperienceCard({ experience, onClick, selected }) {
  const formatDate = (dateString) => {
    if (!dateString) return "Present";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div
      className={`experience-card ${selected ? "selected" : ""}`}
      onClick={() => onClick && onClick(experience)}
    >
      <h3>{experience.company}</h3>
      <p>{experience.position}</p>
      <p>
        {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
      </p>
      <div className="skills">
        {experience.technologies?.map((tech, i) => (
          <SkillsBadge key={i} skill={tech} />
        ))}
      </div>
    </div>
  );
}

export default ExperienceCard;
