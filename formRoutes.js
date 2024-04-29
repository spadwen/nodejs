const express = require('express');
const basicAuth = require('express-basic-auth');
const router = express.Router();
const config = require('./config');
const mysql = require('mysql');
const nodemailer = require('nodemailer');

// Create MySQL connection
const connection = mysql.createConnection(config.database);



// Define route to retrieve form fields, 
// starting API generating
router.get('/api/contactformAPI', (req, res) => {
    // Query the database to fetch all records from the 'contactform' table
    connection.query('SELECT * FROM contactform', (err, rows) => {
      if (err) {
        console.error('Error fetching contactformAPI:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      // Send the fetched records as JSON response
      res.json({ contactformAPI: rows });
    });
  });
  
  // Define basic authentication credentials
  const users = {
    [config.basicAuth.username]: config.basicAuth.password
  };
  
  // Apply basic authentication middleware to the route
  router.use('/api/contactformAPI', basicAuth({ users }));
  //ending API generating

// Handle form submission
router.post('/submit-form', (req, res) => {
    const { name, email, mobile, subject, comment, recordtime } = req.body;

    // Log form data for debugging
    console.log('[Form Submission] Received form data:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Mobile:', mobile);
    console.log('Subject:', subject);
    console.log('Comment:', comment);
    console.log('Recordtime:', recordtime);

    // Save data to MySQL database
    const sql = 'INSERT INTO contactform (name, email, mobile, subject, comment, recordtime) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(sql, [name, email, mobile, subject, comment, recordtime], (err, result) => {
        if (err) {
            console.error('Error inserting data into database:', err);
            return res.status(500).send('Error submitting form. Please try again later.');
        }
        console.log('Data inserted successfully');

    // Create a transporter using SMTP transport
    const transporter = nodemailer.createTransport(config.email);

        const mailOptions = {
           // from: email, // Set sender email dynamically from the form

           from: 'dwen2k@tpg.com.au',
            to: 'dwentp@gmail.com',
            subject: subject,
            text: `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nSubject: ${subject}\nComment: ${comment}\nRecordTime: ${recordtime}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).send('Error submitting form. Please try again later.');
            }
            console.log('Email sent:', info.response);
        });

        // Redirect to thank you page after form submission
        res.redirect('/contact/thank-you');
    }); console.log('Form submitted successfully');
});

module.exports = router;