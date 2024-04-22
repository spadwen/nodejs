const express = require('express');
const router = express.Router();
const config = require('./config');
const mysql = require('mysql');
const nodemailer = require('nodemailer');



// Create MySQL connection
const connection = mysql.createConnection(config.database);

// Handle form submission
router.post('/submit-form', (req, res) => {
    const { name, email, mobile, subject, comment } = req.body;

    // Log form data for debugging
    console.log('[Form Submission] Received form data:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Mobile:', mobile);
    console.log('Subject:', subject);
    console.log('Comment:', comment);

    // Save data to MySQL database
    const sql = 'INSERT INTO contactform (name, email, mobile, subject, comment) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [name, email, mobile, subject, comment], (err, result) => {
        if (err) {
            console.error('Error inserting data into database:', err);
            return res.status(500).send('Error submitting form. Please try again later.');
        }
        console.log('Data inserted successfully');

    // Create a transporter using SMTP transport
    const transporter = nodemailer.createTransport(config.email);

        const mailOptions = {
            from: email, // Set sender email dynamically from the form
            to: 'dwentp@gmail.com',
            subject: subject,
            text: `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nSubject: ${subject}\nComment: ${comment}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).send('Error submitting form. Please try again later.');
            }
            console.log('Email sent:', info.response);
        });

        // Redirect to thank you page after form submission
        res.redirect('/thank-you');
    }); console.log('Form submitted successfully');
});

module.exports = router;