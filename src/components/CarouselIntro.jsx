import React, { useState, useRef } from 'react';
import Slider from 'react-slick';

// --- ICONS ---
import {
    FaReact, FaCode, FaLightbulb,
    FaFileDownload
} from 'react-icons/fa';
import { GoPerson } from "react-icons/go";

// --- STYLES ---
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/CarouselIntro.css';

// --- DEFAULT DATA (can be overridden by props) ---
const defaultSlideData = [
    { icon: <GoPerson />, title: "Ritik Kumar", subtitle: "Master of Computer Application Student at R V Institute Of Technology." },
    { icon: <FaReact />, title: "Innovative Web Developer", subtitle: "Skilled in HTML, CSS, JavaScript, and modern frameworks like React.js." },
    { icon: <FaCode />, title: "Tech Enthusiast", subtitle: "Proficient in Python and Java for versatile application development." },
    { icon: <FaLightbulb />, title: "Open to Opportunities", subtitle: "Seeking new internships and challenging projects to apply and grow my skills." }
];


// --- MAIN COMPONENT ---
const CarouselIntro = ({
    slideData = defaultSlideData,
    profileImage = "/myphoto.jpg",
    cvPath = "/Resume.pdf"
}) => {
    const [activeSlide, setActiveSlide] = useState(0);
    const [currentIcon, setCurrentIcon] = useState(slideData[0].icon);
    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 4000,
        fade: true,
        draggable: true,
        swipe: true,
        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
        arrows: false, // Arrows removed
        afterChange: (current) => {
            setActiveSlide(current);
            setCurrentIcon(slideData[current].icon);
        },
    };

    return (
        <>
            <section className="intro-section">
                {/* Left side for the image */}
                <div className="intro-left">
                    <div className="profile-pic-container">
                        <img src={profileImage} alt="Ritik Kumar's profile" className="profile-pic" />
                    </div>
                </div>

                {/* Right side for the carousel content */}
                <div className="intro-right">
                    <div className="card-main-icon" key={activeSlide}>
                        {currentIcon}
                    </div>
                    <Slider {...settings} ref={sliderRef}>
                        {slideData.map((slide, index) => (
                            <div key={index} className="slide-wrapper">
                                <div className="slide-content">
                                    <div className="text-content">
                                        <h2 className="slide-title" key={`${index}-title`}>{slide.title}</h2>
                                        <p className="slide-subtitle" key={`${index}-subtitle`}>{slide.subtitle}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                    <div className="bottom-controls">
                        <div className="cta-buttons">
                            <a href={cvPath} download className="cta-button primary">
                                <FaFileDownload /> Download CV
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CarouselIntro;