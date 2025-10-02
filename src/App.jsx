import React from "react";
import Header from "./components/Header";
import CarouselIntro from "./components/CarouselIntro";
import About from "./components/About";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import Projects from "./components/Projects";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import "./index.css";

function App() {
  return (
    <>
      <Header />
      <section id="intro"><CarouselIntro /></section>
      <section id="about"><About /><Skills /></section>
      <section id="certifications"><Certifications /></section>
      <section id="projects"><Projects /></section>
      <section id="contact"><ContactForm /></section>
      <Footer />
    </>
  );
}

export default App;
