// server.js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users.js');
const historyRoutes = require('./routes/history.js');
const connectDB = require('./config/db');
const app = express();

connectDB();
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', historyRoutes);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
