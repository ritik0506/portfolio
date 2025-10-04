import React, { useState } from "react";
// import axios from "axios";
import { FaTimes, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import "../styles/Projects.css";

// Mock data structured from your resume.
const mockProjects = [
  {
    _id: "1",
    title: "Swap Notes Hub",
    category: "Personal Project",
    image: "https://placehold.co/600x400/7209b7/ffffff?text=Swap+Notes+Hub",
    shortDescription: "A collaborative web platform for students to swap notes and resources in real-time.", //
    detailedDescription: [
      "Designed and developed an interactive web platform called SwapNotes Hub, enabling students to swap notes, collaborate on projects, and access study resources in real-time.", //
      "Focused on creating a premium, student-friendly interface with modular, reusable UI components and a seamless user experience." //
    ],
    techStack: ["React", "Node.js", "JavaScript", "HTML", "CSS"], //
    githubLink: "https://github.com/ritik0506/swapnotes", // Replace with your GitHub link
    liveLink: "https://swapmynotes.netlify.app/", // Replace with your live demo link
  },
  {
    _id: "2",
    title: "Car Rentals Application",
    category: "Internship Project",
    image: "https://placehold.co/600x400/3a86ff/ffffff?text=Car+Rentals",
    shortDescription: "A full-stack web application for managing car rentals, user authentication, and bookings.", //
    detailedDescription: [
      "Collaborated with a team to design and implement a web-based car rental system.", //
      "Developed user authentication and authorization features using Django's built-in tools.", //
      "Created and maintained database schemas in MySQL for storing user information, car details, and rental records.", //
      "Implemented full CRUD (Create, Read, Update, Delete) operations for car rental management." //
    ],
    techStack: ["Django", "MySQL", "JavaScript", "HTML", "CSS"], //
    githubLink: "https://github.com/ritik0506/car-rental",
    liveLink: "#",
  },
  {
    _id: "3",
    title: "Mobile Price Classification",
    category: "Internship Project",
    image: "https://placehold.co/600x400/ffbe0b/ffffff?text=Price+Classification",
    shortDescription: "A machine learning model to categorize smartphones into price segments based on their features.", //
    detailedDescription: [
      "Developed and implemented a mobile price classification model in a Jupyter environment.", //
      "Leveraged machine learning algorithms to categorize smartphones based on different price segments.", //
      "Conducted data preprocessing, feature engineering, and model evaluation to ensure robust performance and accuracy." //
    ],
    techStack: ["Python", "Pandas", "Numpy", "Machine Learning"], //
    githubLink: "#",
    liveLink: null,
  },
];

const Projects = () => {
  const [projects, setProjects] = useState(mockProjects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const openModal = (proj) => setSelectedProject(proj);
  const closeModal = () => setSelectedProject(null);

  const filterCategories = ['All', 'Internship Project', 'Personal Project'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(proj => proj.category === activeFilter);

  return (
    <>
      <div className="project-section">
        <h2 className="section-title">Projects</h2>

        <div className="filter-buttons">
          {filterCategories.map(category => (
            <button
              key={category}
              className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="project-grid">
          {filteredProjects.map((proj, index) => (
            <div
              key={proj._id}
              className="project-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img src={proj.image} alt={proj.title} className="project-image" />
              <div className="project-info">
                <span className="project-category">{proj.category}</span>
                <h3>{proj.title}</h3>
                <p>{proj.shortDescription}</p>
                <div className="project-tech-stack">
                  {proj.techStack.map(tech => <span key={tech} className="tech-pill">{tech}</span>)}
                </div>
                <button onClick={() => openModal(proj)} className="details-button">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{selectedProject.title}</h2>
              <button className="modal-close-btn" onClick={closeModal}><FaTimes /></button>
            </div>
            <div className="modal-body">
              <ul className="modal-description">
                {selectedProject.detailedDescription.map((point, index) => <li key={index}>{point}</li>)}
              </ul>
              <div className="modal-tech">
                <strong>Technologies Used:</strong>
                <div className="project-tech-stack">
                  {selectedProject.techStack.map(tech => <span key={tech} className="tech-pill">{tech}</span>)}
                </div>
              </div>
              <div className="modal-links">
                <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="modal-link-btn">
                  <FaGithub /> GitHub
                </a>
                {selectedProject.liveLink && (
                  <a href={selectedProject.liveLink} target="_blank" rel="noopener noreferrer" className="modal-link-btn">
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;