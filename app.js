const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve google verification file
app.get('/googleba92bade66ce0fc9.html', (req, res) => {
  const filePath = path.join(__dirname, 'googleba92bade66ce0fc9.html');
  fs.readFile(filePath, (err, data) => {
      if (err) {
          console.error('Error reading file:', err);
          return res.status(500).send('Internal Server Error');
      }
      res.setHeader('Content-Type', 'text/html');
      res.send(data);
  });
});


// Array of carousel items
const carouselItems = [
    { imageUrl: '/images/home01.jpeg', altText: 'Slide 1' },
    { imageUrl: '/images/home02.jpeg', altText: 'Slide 2' },
    { imageUrl: '/images/home03.jpeg', altText: 'Slide 3' },
  ];
  
  // Define routes
app.get('/', (req, res) => res.render('index', { title: 'Home', carouselItems }));
app.get('/about', (req, res) => res.render('about', { title: 'About' }));
app.get('/service', (req, res) => res.render('service', { title: 'Service' }));
app.get('/contact', (req, res) => res.render('contact', { title: 'Contact' }));

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
