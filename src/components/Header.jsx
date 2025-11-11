import React, { useState, useEffect, useCallback } from "react";
import { FaBars, FaTimes, FaArrowUp, FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import "../styles/Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const isDark = theme === "dark";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      closeMenu();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Show/hide scroll to top button
      setShowScrollTop(window.scrollY > 300);
      
      // Add shadow on scroll
      setIsScrolled(window.scrollY > 50);

      // Update active section
      const sections = ["intro", "about", "certifications", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen, closeMenu]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    { id: "intro", label: "Portfolio" },
    { id: "about", label: "About" },
    { id: "certifications", label: "Certifications" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      <a href="#intro" className="skip-link">Skip to content</a>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <div className="logo">
            <span className="logo-initial">RK</span>
            <span className="logo-text">Ritik Kumar</span>
          </div>
          
          <nav id="primary-navigation" className={`nav ${isMenuOpen ? 'open' : ''}`}>
            <ul>
              {navItems.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={activeSection === id ? "active" : ""}
                    onClick={(e) => handleNavClick(e, id)}
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li className="mobile-theme-toggle">
                <button
                  type="button"
                  className="theme-toggle"
                  onClick={toggleTheme}
                  aria-label={`Activate ${isDark ? 'light' : 'dark'} mode`}
                  aria-pressed={isDark}
                >
                  {isDark ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
                  <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
                </button>
              </li>
            </ul>
          </nav>
          <div className="header-actions">
            <button
              type="button"
              className="theme-toggle desktop"
              onClick={toggleTheme}
              aria-label={`Activate ${isDark ? 'light' : 'dark'} mode`}
              aria-pressed={isDark}
            >
              {isDark ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
            </button>
            <button 
              className="hamburger" 
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="primary-navigation"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      {/* Scroll to Top Button */}
      <button
        className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </button>
    </>
  );
};

export default Header;
