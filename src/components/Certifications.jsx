import React, { useState } from "react";
import Slider from "react-slick";
import { FaTimes, FaSearchPlus } from "react-icons/fa";

// Import react-slick css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../styles/Certifications.css";

// Mock data based on your resume
const mockCerts = [
  {
    _id: "1",
    title: "Complete Web Development Bootcamp",
    issuer: "Udemy | Dr. Angela Yu",
    image: "https://placehold.co/600x400/a2d2ff/ffffff?text=Web+Dev+Cert",
    thumbnail: "https://placehold.co/400x200/a2d2ff/ffffff?text=Web+Dev",
  },
  {
    _id: "2",
    title: "Data Fundamentals",
    issuer: "IBM SkillsBuild",
    image: "https://placehold.co/600x400/bde0fe/ffffff?text=Data+Cert",
    thumbnail: "https://placehold.co/400x200/bde0fe/ffffff?text=Data",
  },
  {
    _id: "3",
    title: "Artificial Intelligence Fundamentals",
    issuer: "IBM SkillsBuild",
    image: "https://placehold.co/600x400/ffafcc/ffffff?text=AI+Cert",
    thumbnail: "https://placehold.co/400x200/ffafcc/ffffff?text=AI",
  },
  {
    _id: "4",
    title: "MySQL Basic",
    issuer: "Great Learning",
    image: "https://placehold.co/600x400/ffd6a5/ffffff?text=MySQL+Cert",
    thumbnail: "https://placehold.co/400x200/ffd6a5/ffffff?text=MySQL",
  },
];

const Certifications = () => {
  const [certs, setCerts] = useState(mockCerts);
  const [selectedCert, setSelectedCert] = useState(null);

  const openModal = (cert) => {
    setSelectedCert(cert);
  };

  const closeModal = () => {
    setSelectedCert(null);
  };

  // Settings for the carousel
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="cert-section">
        <h2 className="section-title">Certifications</h2>
        <div className="cert-carousel-wrapper">
          <Slider {...carouselSettings}>
            {certs.map((cert) => (
              <div key={cert._id} className="cert-slide">
                <div className="cert-card">
                  <div className="cert-image-container">
                    <img src={cert.thumbnail} alt={cert.title} className="cert-thumbnail" />
                    <div className="cert-overlay" onClick={() => openModal(cert)}>
                      <FaSearchPlus className="preview-icon" />
                      <span>Preview</span>
                    </div>
                  </div>
                  <div className="cert-info">
                    <h3>{cert.title}</h3>
                    <p>{cert.issuer}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Modal for Certificate Preview (no changes needed here) */}
      {selectedCert && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>
              <FaTimes />
            </button>
            <img src={selectedCert.image} alt={`${selectedCert.title} Certificate`} className="modal-image" />
            <h3>{selectedCert.title}</h3>
          </div>
        </div>
      )}
    </>
  );
};

export default Certifications;