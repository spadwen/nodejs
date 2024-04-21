const express = require('express');
const path = require('path');
const formRoutes = require('./formRoutes'); // Import formRoutes
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

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
  
  // Define routes
app.get('/', (req, res) => res.render('index', { title: 'Home', carouselItems }));
app.get('/about', (req, res) => res.render('about', { title: 'About' }));
app.get('/service', (req, res) => res.render('service', { title: 'Service' }));
app.get('/contact', (req, res) => res.render('contact', { title: 'Contact' }));
app.get('/thank-you', (req, res) => res.render('thank-you'));

// Use the form submission route
app.use('/', formRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
