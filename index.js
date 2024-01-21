const express = require('express');
const app = express();

app.get('/api/:date?', (req, res) => {
  let inputDate = req.params.date;

  // If the date parameter is empty, use the current time
  if (!inputDate) {
    inputDate = new Date();
  }

  // Attempt to parse the input date
  const parsedDate = new Date(inputDate);

  // Check if the parsed date is valid
  if (isNaN(parsedDate.getTime())) {
    return res.status(400).json({ error: 'Invalid Date' });
  }

  // Convert the input date to a Unix timestamp in milliseconds
  const unixTimestamp = parsedDate.getTime();

  // Format the input date to UTC
  const utcString = parsedDate.toUTCString();

  // Return the JSON object with the Unix timestamp and UTC string
  res.json({ unix: unixTimestamp, utc: utcString });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
