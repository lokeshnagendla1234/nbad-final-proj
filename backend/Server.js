const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./Routes/authRoutes');
const chartRoutes = require('./Routes/chartRoutes');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express(express.json());

app.use(cors({
  origin: '*',
}));
app.use(bodyParser.json()); 

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden: Invalid Token' });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: 'Unauthorized: No Token Provided' });
  }
}

app.use('/api/auth', authRoutes);
app.use('/api/charts', authenticateJWT, chartRoutes); 

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
