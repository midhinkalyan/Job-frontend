import React from "react";
import "./jobbie.css";

const JobComponent = ({ jobs, onApply }) => {
  return (
    <div className="job-list">
      {jobs.map((job) => (
        <div key={job.id} className="job-card">
          <h3>{job.title}</h3>
          <p><strong>Company:</strong> {job.company}</p>
          <p><strong>Type:</strong> {job.type}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Salary:</strong> {job.salary}</p>
          <p><strong>Description:</strong> {job.description}</p>
          <button
            onClick={() => onApply(job.id)}
            disabled={job.applied}
            className={job.applied ? "applied" : ""}
          >
            {job.applied ? "Applied" : "Apply"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default JobComponent;
