const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const runRoutes = require('./routes/runRoutes');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT;

// Middleware

app.use(cors({
  origin: 'https://frontend-iota-one-97.vercel.app',
  methods: ['GET', 'POST'],
}));
app.use(bodyParser.json());

// Ensure tmp directory exists
const tmpDir = path.join(__dirname, 'tmp');
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir);
}

// Routes
app.use('/run', runRoutes);

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
