import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { FaTimes, FaGithub, FaExternalLinkAlt, FaSearch, FaThLarge, FaListUl } from "react-icons/fa";
import useScrollAnimation from "../hooks/useScrollAnimation";
import "../styles/Projects.css";

// Mock data structured from your resume.
const mockProjects = [
  {
    _id: "1",
    title: "Swap Notes Hub",
    category: "Personal Project",
    image: "https://placehold.co/600x400/7209b7/ffffff?text=Swap+Notes+Hub",
    shortDescription: "A collaborative web platform for students to swap notes and resources in real-time.",
    detailedDescription: [
      "Designed and developed an interactive web platform called SwapNotes Hub, enabling students to swap notes, collaborate on projects, and access study resources in real-time.",
      "Focused on creating a premium, student-friendly interface with modular, reusable UI components and a seamless user experience."
    ],
    techStack: ["React", "Node.js", "JavaScript", "HTML", "CSS"],
    tags: ["Web Development", "Education", "Collaboration"],
    githubLink: "https://github.com/ritik0506/swapnotes",
    liveLink: "https://swapmynotes.netlify.app/",
  },
  {
    _id: "2",
    title: "Car Rentals Application",
    category: "Internship Project",
    image: "https://placehold.co/600x400/3a86ff/ffffff?text=Car+Rentals",
    shortDescription: "A full-stack web application for managing car rentals, user authentication, and bookings.",
    detailedDescription: [
      "Collaborated with a team to design and implement a web-based car rental system.",
      "Developed user authentication and authorization features using Django's built-in tools.",
      "Created and maintained database schemas in MySQL for storing user information, car details, and rental records.",
      "Implemented full CRUD (Create, Read, Update, Delete) operations for car rental management."
    ],
    techStack: ["Django", "MySQL", "JavaScript", "HTML", "CSS"],
    tags: ["Full-Stack", "Database", "Authentication"],
    githubLink: "https://github.com/ritik0506/car-rental",
    liveLink: "#",
  },
  {
    _id: "3",
    title: "Mobile Price Classification",
    category: "Internship Project",
    image: "https://placehold.co/600x400/ffbe0b/ffffff?text=Price+Classification",
    shortDescription: "A machine learning model to categorize smartphones into price segments based on their features.",
    detailedDescription: [
      "Developed and implemented a mobile price classification model in a Jupyter environment.",
      "Leveraged machine learning algorithms to categorize smartphones based on different price segments.",
      "Conducted data preprocessing, feature engineering, and model evaluation to ensure robust performance and accuracy."
    ],
    techStack: ["Python", "Pandas", "Numpy", "Machine Learning"],
    tags: ["Machine Learning", "Data Science", "Python"],
    githubLink: "#",
    liveLink: null,
  },
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid');
  const [containerRef, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const modalCloseButtonRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProjects(mockProjects);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!selectedProject) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject && modalCloseButtonRef.current) {
      modalCloseButtonRef.current.focus({ preventScroll: true });
    }
  }, [selectedProject]);

  const openModal = useCallback((proj) => {
    setSelectedProject(proj);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const filterCategories = ['All', 'Internship Project', 'Personal Project'];

  const filteredProjects = useMemo(() => {
    let data = activeFilter === 'All'
      ? projects
      : projects.filter(proj => proj.category === activeFilter);

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      data = data.filter(proj =>
        proj.title.toLowerCase().includes(term) ||
        proj.shortDescription.toLowerCase().includes(term) ||
        proj.techStack.some(tech => tech.toLowerCase().includes(term)) ||
        proj.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    if (sortBy === 'title') {
      data = [...data].sort((a, b) => a.title.localeCompare(b.title));
    }

    return data;
  }, [projects, activeFilter, searchTerm, sortBy]);

  const handleCardKeyDown = (event, proj) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openModal(proj);
    }
  };

  return (
    <>
      <div className="project-section" ref={containerRef}>
        <h2 className="section-title">Projects</h2>

        {/* Search Bar */}
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search projects by name, tech stack, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>
              <FaTimes />
            </button>
          )}
        </div>

        {/* Controls Container */}
        <div className="controls-container">
          {/* Filter Buttons */}
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

          {/* Sort Dropdown */}
          <div className="sort-container">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>

          <div className="view-toggle" role="group" aria-label="Project layout">
            <button
              type="button"
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-pressed={viewMode === 'grid'}
            >
              <FaThLarge aria-hidden="true" />
              <span>Grid</span>
            </button>
            <button
              type="button"
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              aria-pressed={viewMode === 'list'}
            >
              <FaListUl aria-hidden="true" />
              <span>List</span>
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-count">
          Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
        </div>

        <div className={`project-grid ${viewMode}`}>
          {isLoading ? (
            Array.from({ length: viewMode === 'grid' ? 3 : 2 }).map((_, index) => (
              <div key={`skeleton-${index}`} className={`project-card skeleton ${isVisible ? 'fade-in' : ''}`}>
                <div className="project-image-container">
                  <div className="skeleton-image" aria-hidden="true" />
                </div>
                <div className="project-info">
                  <div className="skeleton-line short" />
                  <div className="skeleton-line" />
                  <div className="skeleton-line" />
                  <div className="skeleton-pill-group">
                    <span className="skeleton-pill" />
                    <span className="skeleton-pill" />
                    <span className="skeleton-pill" />
                  </div>
                </div>
              </div>
            ))
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((proj, index) => (
              <article
                key={proj._id}
                className={`project-card ${isVisible ? 'fade-in' : ''}`}
                style={{ animationDelay: `${index * 80}ms` }}
                role="button"
                tabIndex={0}
                onClick={() => openModal(proj)}
                onKeyDown={(event) => handleCardKeyDown(event, proj)}
                aria-label={`View details for ${proj.title}`}
              >
                <div className="project-image-container">
                  <img src={proj.image} alt={proj.title} className="project-image" />
                  <div className="project-overlay" aria-hidden="true">
                    <span className="overlay-btn">View Details</span>
                  </div>
                </div>
                <div className="project-info">
                  <span className="project-category">{proj.category}</span>
                  <h3>{proj.title}</h3>
                  <p>{proj.shortDescription}</p>
                  <div className="project-tech-stack">
                    {proj.techStack.slice(0, 4).map(tech => (
                      <span key={tech} className="tech-pill">{tech}</span>
                    ))}
                    {proj.techStack.length > 4 && (
                      <span className="tech-pill more">+{proj.techStack.length - 4}</span>
                    )}
                  </div>
                  <div className="project-tags">
                    {proj.tags.map(tag => (
                      <span key={tag} className="tag-badge">{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="no-results">
              <p>No projects found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 id="project-modal-title" className="modal-title">{selectedProject.title}</h2>
              <button
                ref={modalCloseButtonRef}
                className="modal-close-btn"
                onClick={closeModal}
                aria-label="Close project details"
              >
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <img src={selectedProject.image} alt={selectedProject.title} className="modal-image" />
              <ul className="modal-description">
                {selectedProject.detailedDescription.map((point, index) => <li key={index}>{point}</li>)}
              </ul>
              <div className="modal-tech">
                <strong>Technologies Used:</strong>
                <div className="project-tech-stack">
                  {selectedProject.techStack.map(tech => <span key={tech} className="tech-pill">{tech}</span>)}
                </div>
              </div>
              <div className="modal-tags">
                <strong>Tags:</strong>
                <div className="project-tags">
                  {selectedProject.tags.map(tag => <span key={tag} className="tag-badge">{tag}</span>)}
                </div>
              </div>
              <div className="modal-links">
                {selectedProject.githubLink && selectedProject.githubLink !== '#' && (
                  <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="modal-link-btn">
                    <FaGithub /> GitHub
                  </a>
                )}
                {selectedProject.liveLink && selectedProject.liveLink !== '#' && (
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