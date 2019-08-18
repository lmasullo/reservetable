// Dependencies
// =============================================================
const express = require('express');
const path = require('path');

// Reservations Array of objects
const reservations = [];

// Waitlist Array of objects
const waitlist = [];

// Sets up the Express App
// =============================================================
const app = express();
// Set Port
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route to home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

// Route to reserve page
app.get('/reserve', (req, res) => {
  res.sendFile(path.join(__dirname, 'reserve.html'));
});

// Route to tables page
app.get('/tables', (req, res) => {
  res.sendFile(path.join(__dirname, 'tables.html'));
});

app.post('/api/tables', (req, res) => {
  // console.log(req.body);
  const newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  // newReservation.routeName = newReservation.name.replace(/\s+/g, '').toLowerCase();

  console.log(newReservation);
  // res.json(newReservation);
  if (reservations.length < 2) {
    // Push to the reservations array
    reservations.push(newReservation);
    console.log(reservations);

    // Send response
    res.json(true);
  } else {
    // Push to the waitlist array
    waitlist.push(newReservation);
    // Send response
    res.json(false);
  }
});

// Displays all reservations
app.get('/api/tables', (req, res) => res.json(reservations));

// Displays all waitlist reservations
app.get('/api/waitlist', (req, res) => res.json(waitlist));

// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
