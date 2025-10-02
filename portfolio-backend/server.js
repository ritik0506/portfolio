// server.js

// 1. IMPORT LIBRARIES
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();

const Contact = require('./models/Contact');


// 2. INITIALIZE APP & MIDDLEWARE
const app = express();
app.use(cors());
app.use(express.json());


// 3. CONNECT TO DATABASE
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch(error => console.error('Initial MongoDB connection error:', error));


// 4. CONFIGURE NODEMAILER
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// 5. DEFINE THE API ROUTE WITH DETAILED ERROR HANDLING
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // --- Step 1: Save to Database ---
  try {
    const newSubmission = new Contact({ name, email, message });
    await newSubmission.save();
    console.log('✅ Submission successfully saved to database.');
  } catch (dbError) {
    // If this block runs, there's a problem with your MongoDB connection.
    console.error('❌ DATABASE ERROR:', dbError);
    return res.status(500).json({ error: 'Failed to save submission to the database.' });
  }

  // --- Step 2: Send Email Notification ---
  try {
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Portfolio Contact: ${name}`,
      html: `<h3>New message from ${name} (${email})</h3><p>${message}</p>`,
    };
    await transporter.sendMail(mailOptions);
    console.log('✅ Email notification sent successfully.');
  } catch (emailError) {
    // If this block runs, there's a problem with your email credentials.
    console.error('❌ EMAIL ERROR:', emailError);
    return res.status(500).json({ error: 'Failed to send email notification.' });
  }

  // --- If both steps succeed ---
  res.status(201).json({ message: 'Submission successful!' });
});


// 6. START THE SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});