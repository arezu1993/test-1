const express = require('express');
const app = express();
const port = 3000;

// Middleware for authentication
const authenticate = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (authToken === 'secret-token') {
    next(); // Proceed to the next middleware or route handler
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Route handlers
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api/data', authenticate, (req, res) => {
  res.json({ message: 'API data' });
});

app.post('/api/data', authenticate, (req, res) => {
  const { body } = req;
  // Process the request body and store the data

  res.status(201).json({ message: 'Data created' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
