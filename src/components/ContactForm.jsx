import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaPaperPlane, FaPhone, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';
import "../styles/ContactForm.css";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: false, message: '' });
    try {
      await axios.post("http://localhost:5000/api/contact", form);
      setStatus({ submitting: false, success: true, error: false, message: 'Message sent successfully!' });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus({ submitting: false, success: false, error: true, message: 'Failed to send message. Please try again.' });
    }
  };

  return (
    <div className="contact-section">
      <div className="contact-container">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Have a question or want to work together? Feel free to reach out. I'm available for freelance opportunities.</p>
          <div className="info-item">
            <FaMapMarkerAlt />
            <span>Bengaluru, Karnataka</span>
          </div>
          <div className="info-item">
            <FaEnvelope />
            <a href="mailto:siinghritik0506@gmail.com">siinghritik0506@gmail.com</a>
          </div>
          <div className="info-item">
            <FaPhone />
            <a href="tel:+918210924812">+91 8210924812</a>
          </div>
          <div className="info-item">
            <FaLinkedin />
            <a href="https://linkedin.com/in/ritikkumar05" target="_blank" rel="noopener noreferrer">linkedin.com/in/ritikkumar05</a>
          </div>
        </div>

        <div className="contact-form-wrapper">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <FaUser className="input-icon" />
              <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <FaEnvelope className="input-icon" />
              <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} required></textarea>
            </div>
            <button type="submit" disabled={status.submitting}>
              {status.submitting ? 'Sending...' : 'Send Message'}
              <FaPaperPlane style={{ marginLeft: '8px' }} />
            </button>
            {status.success && <p className="status-message success">{status.message}</p>}
            {status.error && <p className="status-message error">{status.message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;