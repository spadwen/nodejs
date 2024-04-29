const express = require('express');
const path = require('path');
const formRoutes = require('./formRoutes'); // Import formRoutes
const basicAuth = require('express-basic-auth');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Apply basic authentication middleware globally
app.use(basicAuth({
  users: { 'admin': 'password' }, // Replace with your own username and password
  challenge: true, // Show authentication dialog
}));

// Serve google verification file
app.get('/googleba92bade66ce0fc9.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'googleba92bade66ce0fc9.html'));
});


// Array of carousel items
const carouselItems = [
    { imageUrl: '/images/home01.jpg', altText: 'Slide 1' },
    { imageUrl: '/images/home02.jpg', altText: 'Slide 2' },
    { imageUrl: '/images/home03.jpg', altText: 'Slide 3' },
  ];

  // Function to generate the current time
function getCurrentTime() {
  const now = new Date();
  return now.toISOString().slice(0, 19).replace('T', ' '); // Format: YYYY-MM-DD HH:MM:SS
}

// Define a route to render the contact form
app.get('/contact', (req, res) => {
  const currentTime = getCurrentTime();
  res.render('contact', { title: 'Contact', currentTime }); // Pass currentTime to the template
});
  
  // Define routes
app.get('/', (req, res) => res.render('index', { title: 'Home', carouselItems }));
app.get('/about', (req, res) => res.render('about', { title: 'About' }));
app.get('/service', (req, res) => res.render('service', { title: 'Service' }));
app.get('/contact', (req, res) => res.render('contact', { title: 'Contact' }));
//app.get('/thank-you', (req, res) => res.render('thank-you'));
app.get('/contact/thank-you', (req, res) => res.render('thank-you', { title: 'Thank You' }));



// Use the form submission route
app.use('/', formRoutes);





// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
