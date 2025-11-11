import React, { useState } from "react";
import { FaDownload, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import useScrollAnimation from "../hooks/useScrollAnimation";
import "../styles/About.css";

const About = () => {
  const [containerRef, isVisible] = useScrollAnimation({ threshold: 0.2 });
  const [readMore, setReadMore] = useState(false);

  const fullText = "I'm an innovative full-stack developer currently pursuing my Master of Computer Application at R V Institute Of Technology. I love building dynamic, user-friendly web applications that combine clean design with robust functionality.\n\nI work on the front-end with React.js, HTML, CSS, and JavaScript to create interactive and responsive user experiences. On the back-end, I'm experienced with Node.js and have worked with databases like MongoDB and MySQL to build scalable, reliable applications.\n\nOne of my latest projects, SwapNotes, is a platform designed to help students collaborate, study together, and share notes efficiently. Users can upload and explore notes, join study groups, and engage in collaborative learning—all in a smooth and interactive environment. Previously, at EY GDS, I collaborated with a team to develop a full-stack car rental application, and I've also built personal projects like my portfolio website, showcasing modern UI and seamless functionality.\n\nI'm passionate about bringing ideas to life through code, whether it's crafting polished front-end interfaces or building powerful back-end systems. I enjoy creating applications that people love to use and that make a meaningful impact.";

  const shortText = fullText.split("\n\n").slice(0, 2).join("\n\n");

  const stats = [
    { number: "2+", label: "Years Learning" },
    { number: "10+", label: "Projects" },
    { number: "5+", label: "Certifications" },
  ];

  return (
    <div className="about-section" ref={containerRef}>
      <div className={`about-container ${isVisible ? "fade-in" : ""}`}>
        <div className="about-left">
          <div className="profile-pic-wrapper">
            <div className="profile-pic-placeholder">RK</div>
            <div className="status-indicator"></div>
          </div>
          <h3>Ritik Kumar</h3>
          <p className="subtitle">
            <span className="typing-text">Web Developer & Data Analyst</span>
          </p>
          <div className="stats-section">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item" style={{ animationDelay: `${index * 0.1}s` }}>
                <h4>{stat.number}</h4>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="social-links">
            <a href="mailto:siinghritik0506@gmail.com" aria-label="Email" className="social-icon"><FaEnvelope /></a>
            <a href="https://linkedin.com/in/ritikkumar05" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon"><FaLinkedin /></a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-icon"><FaGithub /></a>
          </div>
          <a href="/Resume.pdf" download className="download-cv-btn"><FaDownload /> Download CV</a>
        </div>
        <div className="about-right">
          <h2>About Me</h2>
          <div className="about-text">
            <p className={`about-description ${readMore ? "expanded" : ""}`}>{readMore ? fullText : shortText}</p>
            <button className="read-more-btn" onClick={() => setReadMore(!readMore)}>{readMore ? "Read Less" : "Read More"}</button>
          </div>
          <div className="highlights">
            <h3>Key Highlights</h3>
            <ul className="highlights-list">
              <li> MCA Student at R V Institute Of Technology</li>
              <li> Full-Stack Developer (React.js, Node.js)</li>
              <li> Database Expert (MongoDB, MySQL)</li>
              <li> Built collaborative learning platform SwapNotes</li>
              <li> Internship Experience at EY GDS</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
