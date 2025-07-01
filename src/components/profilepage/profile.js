// src/components/Profile.js
import React, { Component } from "react";
import "./profile.css";
import Header from "../header/header";
class Profile extends Component {
  state = {
    appliedJobs: [],
    username: "",
  };

  componentDidMount() {
    const username = localStorage.getItem("userName");
    if (username) {
      fetch(`http://localhost:8080/api/user-jobs/${username}`)
        .then((res) => res.json())
        .then((data) => this.setState({ appliedJobs: data, username }))
        .catch((err) => console.error("Error fetching applied jobs:", err));
    }
  }

  handleWithdraw = (jobId) => {
    fetch(`http://localhost:8080/api/withdraw/${jobId}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedJobs = this.state.appliedJobs.filter((job) => job.id !== jobId);
        this.setState({ appliedJobs: updatedJobs });
        alert("Job withdrawn successfully.");
      })
      .catch((err) => console.error("Error withdrawing job:", err));
  };

  render() {
    const { appliedJobs, username } = this.state;

    return (
      <div className="profile-page">
         <Header />
        <h2>{username}'s Applied Jobs</h2>
        {appliedJobs.length === 0 ? (
          <p>No jobs applied yet.</p>
        ) : (
          <div className="applied-jobs-list">
            {appliedJobs.map((job) => (
              <div className="job-card" key={job.id}>
                <h3>{job.title}</h3>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Type:</strong> {job.type}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> {job.salary}</p>
                <p><strong>Description:</strong> {job.description}</p>
                <button onClick={() => this.handleWithdraw(job.id)}>Withdraw</button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
