import React from "react";
import ExperienceCard from "./ExperienceCard";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

function ExperienceList({ experiences, loading, error, onExperienceClick }) {
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
  if (experiences.length === 0) return <p>No experiences found.</p>;

  return (
    <div className="experiences-grid">
      {experiences.map((exp) => (
        <ExperienceCard
          key={exp._id}
          experience={exp}
          onClick={onExperienceClick}
        />
      ))}
    </div>
  );
}

export default ExperienceList;
