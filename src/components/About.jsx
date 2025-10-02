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
            I am an innovative developer, currently pursuing a Master of Computer Application
            from R V Institute Of Technology. With a strong foundation in both
            front-end development and data analysis, I am proficient in creating
            dynamic user experiences using technologies like React.js, HTML, CSS,
            and JavaScript. My experience extends to back-end development with
            Django and handling databases like MySQL. I have practical
            experience in machine learning through an internship at Prinston Smart
            Engineers, where I developed a mobile price classification model using
            Python, Pandas, and Numpy. Additionally, I have collaborated
            in a team environment at EY GDS to build a full-stack car rental
            application. I am dedicated to enhancing online experiences by
            leveraging both my creative development skills and data-driven
            strategies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;