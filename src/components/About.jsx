import React from "react";
import "../styles/About.css";
// import profilePic from '../assets/your-photo.jpg'; // Import your photo here

const About = () => {
  return (
    <div className="about-section">
      <div className="about-container">
        {/* Left Column: Photo and Socials */}
        <div className="about-left">
          {/* <img src={profilePic} alt="Ritik Kumar" className="profile-pic" /> */}
          <div className="profile-pic-placeholder">
            RK
          </div>
          <h3>Ritik Kumar</h3>
          <p className="subtitle">Web Developer & Data Analyst</p>
          <div className="social-links">
            <a href="mailto:siinghritik0506@gmail.com" aria-label="Email">
              <i className="fas fa-envelope"></i>
            </a>
            <a href="https://linkedin.com/in/ritikkumar05" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              {/* Note: GitHub link was not in the resume, add your URL here */}
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>

        {/* Right Column: About Me Text */}
        <div className="about-right">
          <h2>About Me</h2>
          <p>
           I’m an innovative full-stack developer currently pursuing my Master of Computer Application at R V Institute Of Technology. I love building dynamic, user-friendly web applications that combine clean design with robust functionality.

I work on the front-end with React.js, HTML, CSS, and JavaScript to create interactive and responsive user experiences. On the back-end, I’m experienced with Node.js and have worked with databases like MongoDB and MySQL to build scalable, reliable applications.

One of my latest projects, SwapNotes, is a platform designed to help students collaborate, study together, and share notes efficiently. Users can upload and explore notes, join study groups, and engage in collaborative learning—all in a smooth and interactive environment. Previously, at EY GDS, I collaborated with a team to develop a full-stack car rental application, and I’ve also built personal projects like my portfolio website, showcasing modern UI and seamless functionality.

I’m passionate about bringing ideas to life through code, whether it’s crafting polished front-end interfaces or building powerful back-end systems. I enjoy creating applications that people love to use and that make a meaningful impact
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;