const express  = require('express');
const cors = require('cors');
const User = require('./models/user.model')

const app = express();

app.use(cors());
app.use(express.json());

// routes

app.get('/', (req, res) => {
    res.send('test api for Blackjack Tutorial')
})

app.post('/user', async (req, res) => {
    // this is also a test for Project Milestone#2 - proper implementation will be added in the future.
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);

    } catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


module.exports = app;
