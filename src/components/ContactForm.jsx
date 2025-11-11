import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaPaperPlane, FaPhone, FaLinkedin, FaMapMarkerAlt, FaCheckCircle, FaGithub, FaCopy, FaTimes } from 'react-icons/fa';
import useScrollAnimation from "../hooks/useScrollAnimation";
import "../styles/ContactForm.css";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "", subject: "" });
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [containerRef, isVisible] = useScrollAnimation({ threshold: 0.2 });
  const [copySuccess, setCopySuccess] = useState('');
  const [showEmailToast, setShowEmailToast] = useState(false);

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters';
        } else if (value.trim().length > 50) {
          error = 'Name must be less than 50 characters';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email';
        }
        break;
      case 'subject':
        if (!value.trim()) {
          error = 'Subject is required';
        } else if (value.trim().length < 3) {
          error = 'Subject must be at least 3 characters';
        }
        break;
      case 'message':
        if (!value.trim()) {
          error = 'Message is required';
        } else if (value.trim().length < 10) {
          error = 'Message must be at least 10 characters';
        }
        break;
      default:
        break;
    }
    
    return error;
  };

  // Copy email to clipboard
  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(type);
      setShowEmailToast(true);
      setTimeout(() => {
        setCopySuccess('');
        setShowEmailToast(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleBlur = e => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(form).forEach(key => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ name: true, email: true, subject: true, message: true });
      return;
    }

    setStatus({ submitting: true, success: false, error: false, message: '' });
    try {
      await axios.post("http://localhost:5000/api/contact", form);
      setStatus({ 
        submitting: false, 
        success: true, 
        error: false, 
        message: '✅ Message sent successfully! I\'ll get back to you soon.' 
      });
      setForm({ name: "", email: "", message: "", subject: "" });
      setErrors({});
      setTouched({});
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false, message: '' }));
      }, 5000);
    } catch (err) {
      console.error(err);
      setStatus({ 
        submitting: false, 
        success: false, 
        error: true, 
        message: '❌ Failed to send message. Please try again or contact me directly via email.' 
      });
    }
  };

  const messageLength = form.message.length;
  const maxLength = 500;

  // Quick message templates
  const templates = [
    { label: "Project Inquiry", text: "Hi Ritik, I'd like to discuss a project opportunity with you..." },
    { label: "Collaboration", text: "Hi Ritik, I'm interested in collaborating on..." },
    { label: "Job Opportunity", text: "Hi Ritik, We have an exciting opportunity that matches your skills..." },
  ];

  const applyTemplate = (template) => {
    setForm({ ...form, message: template.text });
    if (touched.message) {
      const error = validateField('message', template.text);
      setErrors({ ...errors, message: error });
    }
  };

  return (
    <div className="contact-section" ref={containerRef}>
      <div className={`contact-container ${isVisible ? 'fade-in' : ''}`}>
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Have a question or want to work together? Feel free to reach out. I'm available for freelance opportunities and collaborations.</p>
          
          <div className="info-items">
            <div className="info-item">
              <div className="info-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="info-content">
                <h4>Location</h4>
                <span>Bengaluru, Karnataka, India</span>
              </div>
            </div>
            
            <div className="info-item clickable" onClick={() => copyToClipboard('siinghritik0506@gmail.com', 'email')}>
              <div className="info-icon">
                <FaEnvelope />
              </div>
              <div className="info-content">
                <h4>Email</h4>
                <a href="mailto:siinghritik0506@gmail.com">siinghritik0506@gmail.com</a>
              </div>
              <button className="copy-btn" onClick={(e) => { e.stopPropagation(); copyToClipboard('siinghritik0506@gmail.com', 'email'); }}>
                <FaCopy />
              </button>
            </div>
            
            <div className="info-item clickable" onClick={() => copyToClipboard('+918210924812', 'phone')}>
              <div className="info-icon">
                <FaPhone />
              </div>
              <div className="info-content">
                <h4>Phone</h4>
                <a href="tel:+918210924812">+91 8210924812</a>
              </div>
              <button className="copy-btn" onClick={(e) => { e.stopPropagation(); copyToClipboard('+918210924812', 'phone'); }}>
                <FaCopy />
              </button>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
                <FaLinkedin />
              </div>
              <div className="info-content">
                <h4>LinkedIn</h4>
                <a href="https://linkedin.com/in/ritikkumar05" target="_blank" rel="noopener noreferrer">linkedin.com/in/ritikkumar05</a>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <FaGithub />
              </div>
              <div className="info-content">
                <h4>GitHub</h4>
                <a href="https://github.com/ritik0506" target="_blank" rel="noopener noreferrer">github.com/ritik0506</a>
              </div>
            </div>
          </div>

          <div className="availability-badge">
            <span className="status-dot"></span>
            <span>Available for opportunities</span>
          </div>
        </div>

        <div className="contact-form-wrapper">
          <h3>Send Me a Message</h3>
          
          {/* Quick Templates */}
          <div className="message-templates">
            <span className="templates-label">Quick templates:</span>
            {templates.map((template, index) => (
              <button
                key={index}
                type="button"
                className="template-btn"
                onClick={() => applyTemplate(template)}
              >
                {template.label}
              </button>
            ))}
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className={`form-group ${errors.name && touched.name ? 'error' : ''} ${form.name && !errors.name ? 'success' : ''}`}>
              <label htmlFor="name">Your Name *</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input 
                  type="text" 
                  id="name"
                  name="name" 
                  placeholder="Ritik Kumar" 
                  value={form.name} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required 
                  autoComplete="name"
                />
                {form.name && !errors.name && <FaCheckCircle className="success-icon" />}
              </div>
              {errors.name && touched.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className={`form-group ${errors.email && touched.email ? 'error' : ''} ${form.email && !errors.email ? 'success' : ''}`}>
              <label htmlFor="email">Your Email *</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input 
                  type="email" 
                  id="email"
                  name="email" 
                  placeholder="email@example.com" 
                  value={form.email} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required 
                  autoComplete="email"
                />
                {form.email && !errors.email && <FaCheckCircle className="success-icon" />}
              </div>
              {errors.email && touched.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className={`form-group ${errors.subject && touched.subject ? 'error' : ''} ${form.subject && !errors.subject ? 'success' : ''}`}>
              <label htmlFor="subject">Subject *</label>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  id="subject"
                  name="subject" 
                  placeholder="Project inquiry, Job opportunity, etc." 
                  value={form.subject} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required 
                />
                {form.subject && !errors.subject && <FaCheckCircle className="success-icon" />}
              </div>
              {errors.subject && touched.subject && <span className="error-message">{errors.subject}</span>}
            </div>

            <div className={`form-group ${errors.message && touched.message ? 'error' : ''} ${form.message && !errors.message ? 'success' : ''}`}>
              <label htmlFor="message">Your Message *</label>
              <div className="input-wrapper">
                <textarea 
                  id="message"
                  name="message" 
                  placeholder="Tell me about your project, idea, or opportunity..." 
                  value={form.message} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={maxLength}
                  rows="6"
                  required
                ></textarea>
              </div>
              <div className="form-footer">
                {errors.message && touched.message && <span className="error-message">{errors.message}</span>}
                <span className={`char-count ${messageLength > maxLength * 0.9 ? 'warning' : ''}`}>
                  {messageLength}/{maxLength}
                </span>
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={status.submitting}>
              {status.submitting ? (
                <>
                  <span className="spinner"></span> Sending...
                </>
              ) : (
                <>
                  Send Message <FaPaperPlane />
                </>
              )}
            </button>

            {status.success && (
              <div className="status-message success">
                <FaCheckCircle /> {status.message}
              </div>
            )}
            {status.error && (
              <div className="status-message error">
                {status.message}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Copy Toast Notification */}
      {showEmailToast && (
        <div className="copy-toast">
          <FaCheckCircle /> {copySuccess === 'email' ? 'Email' : 'Phone'} copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default ContactForm;