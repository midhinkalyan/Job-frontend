// src/components/Home.js
import React, { Component } from "react";
import Header from "../header/header";
import JobComponent from "../jobby_components/jobbie";
import "./home.css";

class Home extends Component {
  state = {
    selectedLocations: [],
    selectedSalaries: [],
    selectedRoles: [],
    searchText: "",
    jobs: [], // Initially empty, will fill in componentDidMount
    filteredJobs: [],
  };

  componentDidMount() {
    // Load static jobs into state
    const jobs = [
  {
    id: 1, title: "React Developer", company: "TechPlus", type: "Frontend", location: "Hyderabad", salary: "₹6 - ₹10 LPA", description: "Build dynamic UIs using ReactJS.", applied: false
  },
  {
    id: 2, title: "Java Developer", company: "CodeBase", type: "Backend", location: "Bangalore", salary: "₹8 - ₹12 LPA", description: "Develop backend services with Spring Boot.", applied: false
  },
  {
    id: 3, title: "Full Stack Developer", company: "DevCo", type: "Fullstack", location: "Remote", salary: "₹10 - ₹15 LPA", description: "Manage both frontend and backend logic.", applied: false
  },
  {
    id: 4, title: "UI Designer", company: "DesignHub", type: "Frontend", location: "Chennai", salary: "₹5 - ₹8 LPA", description: "Create intuitive and appealing user interfaces.", applied: false
  },
  {
    id: 5, title: "Node.js Developer", company: "APILogic", type: "Backend", location: "Pune", salary: "₹7 - ₹11 LPA", description: "Develop scalable Node.js APIs.", applied: false
  },
  {
    id: 6, title: "Angular Developer", company: "FrontendLab", type: "Frontend", location: "Delhi", salary: "₹6.5 - ₹9 LPA", description: "Single-page app development with Angular.", applied: false
  },
  {
    id: 7, title: "Python Developer", company: "DataWorks", type: "Backend", location: "Kolkata", salary: "₹9 - ₹13 LPA", description: "Build APIs and apps using Django/Flask.", applied: false
  },
  {
    id: 8, title: "Mobile App Developer", company: "AppStreet", type: "Fullstack", location: "Mumbai", salary: "₹10 - ₹14 LPA", description: "Cross-platform app development with React Native.", applied: false
  },
  {
    id: 9, title: "DevOps Engineer", company: "CloudNova", type: "Backend", location: "Remote", salary: "₹11 - ₹16 LPA", description: "CI/CD and infrastructure automation.", applied: false
  },
  {
    id: 10, title: "Vue.js Developer", company: "WebAce", type: "Frontend", location: "Ahmedabad", salary: "₹6 - ₹9 LPA", description: "Build SPAs using Vue.js and Vuex.", applied: false
  },
  {
    id: 11, title: "Django Developer", company: "Pythonic", type: "Backend", location: "Hyderabad", salary: "₹8 - ₹12 LPA", description: "Backends using Django and PostgreSQL.", applied: false
  },
  {
    id: 12, title: "System Analyst", company: "TechMatrix", type: "Backend", location: "Noida", salary: "₹9 - ₹13 LPA", description: "Analyze and optimize business systems.", applied: false
  },
  {
    id: 13, title: "Junior React Developer", company: "ByteForge", type: "Frontend", location: "Pune", salary: "₹4 - ₹7 LPA", description: "Support frontend development in React.", applied: false
  },
  {
    id: 14, title: "Senior Full Stack Dev", company: "InnoTech", type: "Fullstack", location: "Bangalore", salary: "₹14 - ₹20 LPA", description: "Lead full stack team (React + Node).", applied: false
  },
  {
    id: 15, title: "QA Engineer", company: "Testify", type: "Backend", location: "Chennai", salary: "₹5 - ₹9 LPA", description: "Write and automate test cases.", applied: false
  },
  {
    id: 16, title: "UX Designer", company: "DesignNova", type: "Frontend", location: "Mumbai", salary: "₹6 - ₹9 LPA", description: "Create smooth user journeys and mockups.", applied: false
  },
  {
    id: 17, title: "Intern - Java", company: "CodeInterns", type: "Backend", location: "Hyderabad", salary: "₹2 - ₹3 LPA", description: "Work on Spring Boot and APIs.", applied: false
  },
  {
    id: 18, title: "Cloud Engineer", company: "SkyTech", type: "Backend", location: "Remote", salary: "₹10 - ₹15 LPA", description: "AWS/GCP infrastructure management.", applied: false
  },
  {
    id: 19, title: "UI Intern", company: "DesignKick", type: "Frontend", location: "Bangalore", salary: "₹2.5 - ₹4 LPA", description: "Assist in UI designs and wireframes.", applied: false
  },
  {
    id: 20, title: "Tech Support Engineer", company: "HelpFix", type: "Backend", location: "Chennai", salary: "₹4 - ₹6 LPA", description: "Backend support and incident resolution.", applied: false
  }
]
;
    this.setState({ jobs, filteredJobs: jobs });
  }

  handleCheckboxChange = (e, category) => {
    const { checked, value } = e.target;
    const selected = [...this.state[category]];

    if (checked) selected.push(value);
    else selected.splice(selected.indexOf(value), 1);

    this.setState({ [category]: selected }, this.applyFilters);
  };

  applyFilters = () => {
    const { jobs, selectedLocations, selectedSalaries, selectedRoles, searchText } = this.state;

    const filtered = jobs.filter((job) => {
      const matchLocation = selectedLocations.length === 0 || selectedLocations.includes(job.location);
      const matchSalary = selectedSalaries.length === 0 || selectedSalaries.includes(job.salary);
      const matchRole = selectedRoles.length === 0 || selectedRoles.includes(job.type);
      const matchSearch = job.title.toLowerCase().includes(searchText.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchText.toLowerCase());

      return matchLocation && matchSalary && matchRole && matchSearch;
    });

    this.setState({ filteredJobs: filtered });
  };

 handleApply = (jobId) => {
  const username = localStorage.getItem("userName");
  if (!username) {
    alert("Session expired. Please log in again.");
    window.location.href = "/";
    return;
  }

  const job = this.state.jobs.find((job) => job.id === jobId);
  if (!job) return;

  const updatedJob = {
    title: job.title,
    company: job.company,
    type: job.type,
    location: job.location,
    salary: job.salary,
    description: job.description,
  };

  // Update UI
  this.setState((prevState) => ({
    jobs: prevState.jobs.map((j) =>
      j.id === jobId ? { ...j, applied: true } : j
    ),
    filteredJobs: prevState.filteredJobs.map((j) =>
      j.id === jobId ? { ...j, applied: true } : j
    ),
  }));

  // Send to backend
  fetch(`http://localhost:8080/api/apply/${username}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedJob),
  })
    .then((res) => {
      if (res.ok) alert("Job Applied!");
      else alert("Failed to apply job");
    })
    .catch(() => alert("Error while applying job"));
};

  render() {
    const { selectedLocations, selectedSalaries, selectedRoles, searchText, filteredJobs } = this.state;
    const locations = ["Hyderabad", "Bangalore", "Remote", "Mumbai", "Chennai"];
    const salaries = ["₹5 - ₹8 LPA", "₹6 - ₹10 LPA", "₹7 - ₹11 LPA", "₹8 - ₹12 LPA", "₹10 - ₹15 LPA"];
    const roles = ["Frontend", "Backend", "Fullstack", "UI Designer"];

    return (
      <div>
        <Header />
        <div className="home-body">
          <div className="left-panel">
            <h3>Filter By</h3>
            <input
              type="text"
              placeholder="Search job title or company"
              value={searchText}
              onChange={(e) => this.setState({ searchText: e.target.value }, this.applyFilters)}
            />

            <h4>Location</h4>
            {locations.map((loc) => (
              <label key={loc}>
                <input
                  type="checkbox"
                  value={loc}
                  checked={selectedLocations.includes(loc)}
                  onChange={(e) => this.handleCheckboxChange(e, "selectedLocations")}
                />
                {loc}
              </label>
            ))}

            <h4>Salary</h4>
            {salaries.map((sal) => (
              <label key={sal}>
                <input
                  type="checkbox"
                  value={sal}
                  checked={selectedSalaries.includes(sal)}
                  onChange={(e) => this.handleCheckboxChange(e, "selectedSalaries")}
                />
                {sal}
              </label>
            ))}

            <h4>Role</h4>
            {roles.map((role) => (
              <label key={role}>
                <input
                  type="checkbox"
                  value={role}
                  checked={selectedRoles.includes(role)}
                  onChange={(e) => this.handleCheckboxChange(e, "selectedRoles")}
                />
                {role}
              </label>
            ))}
          </div>

          <div className="right-panel">
            <JobComponent jobs={filteredJobs} onApply={this.handleApply} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
