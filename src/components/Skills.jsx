import React from "react";
import {
  FaHtml5, FaCss3Alt, FaJsSquare, FaBootstrap, FaReact, FaPython,
  FaJava, FaGitAlt, FaGithub, FaDatabase
} from 'react-icons/fa';
import { SiDjango, SiCplusplus, SiPandas, SiNumpy } from "react-icons/si";
import "../styles/Skills.css";

const skillCategories = [
  {
    name: "Web Technologies",
    skills: [
      { name: "HTML5", icon: <FaHtml5 /> },
      { name: "CSS3", icon: <FaCss3Alt /> },
      { name: "JavaScript", icon: <FaJsSquare /> },
      { name: "Bootstrap", icon: <FaBootstrap /> },
      { name: "React.js", icon: <FaReact /> },
    ],
  },
  {
    name: "Programming Languages",
    skills: [
      { name: "Python", icon: <FaPython /> },
      { name: "Java", icon: <FaJava /> },
      { name: "C", icon: <SiCplusplus /> },
    ],
  },
  {
    name: "Frameworks & Data Science",
    skills: [
      { name: "Django", icon: <SiDjango /> },
      { name: "Pandas", icon: <SiPandas /> },
      { name: "Numpy", icon: <SiNumpy /> },
    ],
  },
  {
    name: "Databases & Tools",
    skills: [
      { name: "MySQL", icon: <FaDatabase /> },
      { name: "Git", icon: <FaGitAlt /> },
      { name: "GitHub", icon: <FaGithub /> },
    ],
  },
];

const Skills = () => {
  const duplicatedCategories = [...skillCategories, ...skillCategories];

  return (
    <div className="skills-wrapper">
      <h2 className="skills-heading">Technical Skills</h2>
      <div className="skills-carousel">
        <div className="skills-track">
          {duplicatedCategories.map((category, index) => (
            <div className="skills-card" key={index}>
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
    </div>
  );
};

export default Skills;