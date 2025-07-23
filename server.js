
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users.js');
const historyRoutes = require('./routes/history.js');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

connectDB();


app.use(cors({
  origin: 'http://localhost:3000',          
  credentials: true                         
}));

app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api', userRoutes);
app.use('/api', historyRoutes);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
