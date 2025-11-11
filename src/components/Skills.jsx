import React, { useState } from "react";
import {
  FaHtml5, FaCss3Alt, FaJsSquare, FaBootstrap, FaReact, FaPython,
  FaJava, FaGitAlt, FaGithub, FaDatabase
} from 'react-icons/fa';
import { SiDjango, SiCplusplus, SiPandas, SiNumpy } from "react-icons/si";
import useScrollAnimation from "../hooks/useScrollAnimation";
import "../styles/Skills.css";

const skillCategories = [
  {
    name: "Web Technologies",
    skills: [
      { name: "HTML5", icon: <FaHtml5 />, level: 90 },
      { name: "CSS3", icon: <FaCss3Alt />, level: 85 },
      { name: "JavaScript", icon: <FaJsSquare />, level: 80 },
      { name: "Bootstrap", icon: <FaBootstrap />, level: 75 },
      { name: "React.js", icon: <FaReact />, level: 85 },
    ],
  },
  {
    name: "Programming Languages",
    skills: [
      { name: "Python", icon: <FaPython />, level: 85 },
      { name: "Java", icon: <FaJava />, level: 70 },
      { name: "C", icon: <SiCplusplus />, level: 65 },
    ],
  },
  {
    name: "Frameworks & Data Science",
    skills: [
      { name: "Django", icon: <SiDjango />, level: 75 },
      { name: "Pandas", icon: <SiPandas />, level: 80 },
      { name: "Numpy", icon: <SiNumpy />, level: 80 },
    ],
  },
  {
    name: "Databases & Tools",
    skills: [
      { name: "MySQL", icon: <FaDatabase />, level: 75 },
      { name: "Git", icon: <FaGitAlt />, level: 85 },
      { name: "GitHub", icon: <FaGithub />, level: 85 },
    ],
  },
];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'list'
  const [containerRef, isVisible] = useScrollAnimation({ threshold: 0.2 });

  const filteredCategories = activeCategory === 'All' 
    ? skillCategories 
    : skillCategories.filter(cat => cat.name === activeCategory);

  const duplicatedCategories = viewMode === 'cards' 
    ? [...filteredCategories, ...filteredCategories]
    : filteredCategories;

  const allCategories = ['All', ...skillCategories.map(cat => cat.name)];

  return (
    <div className="skills-wrapper" ref={containerRef}>
      <h2 className="skills-heading">Technical Skills</h2>
      
      {/* Filter Buttons */}
      <div className="skills-filters">
        {allCategories.map(category => (
          <button
            key={category}
            className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* View Mode Toggle */}
      <div className="view-toggle">
        <button
          className={`toggle-btn ${viewMode === 'cards' ? 'active' : ''}`}
          onClick={() => setViewMode('cards')}
        >
          Cards
        </button>
        <button
          className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
          onClick={() => setViewMode('list')}
        >
          Progress
        </button>
      </div>

      {viewMode === 'cards' ? (
        <div className="skills-carousel">
          <div className="skills-track">
            {duplicatedCategories.map((category, index) => (
              <div className={`skills-card ${isVisible ? 'fade-in' : ''}`} key={index}>
                <h3>{category.name}</h3>
                <div className="skills-items">
                  {category.skills.map((skill) => (
                    <div className="skills-entry" key={skill.name}>
                      <span className="skills-icon">{skill.icon}</span>
                      <span className="skills-label">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="skills-list-view">
          {filteredCategories.map((category, catIndex) => (
            <div key={catIndex} className={`skills-category ${isVisible ? 'fade-in' : ''}`}>
              <h3>{category.name}</h3>
              <div className="skills-progress-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-progress-item">
                    <div className="skill-header">
                      <span className="skill-name">
                        <span className="skills-icon-small">{skill.icon}</span>
                        {skill.name}
                      </span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ 
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${skillIndex * 0.1}s`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Skills;