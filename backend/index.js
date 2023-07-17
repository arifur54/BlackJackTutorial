// server.js
const express = require('express');
require('dotenv').config();
const passport = require('passport');
const cors = require('cors')
const authRoutes = require('./routes/authRoutes');
const database = require('./config/database');
const passportConfig = require('./config/passport');
const mongoose = require('mongoose');


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(cors())

// Routes
app.use('/auth', authRoutes);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully!")
    app.listen(port, () => {
        console.log(`server running on port ${port}`)
    })
})

