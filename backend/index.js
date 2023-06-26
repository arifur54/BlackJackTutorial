const mongoose = require('mongoose');
require('dotenv').config()
const app = require('./server.js');

const uri = process.env.ATLAS_URI;
const port = process.env.PORT || 8000;

mongoose.connect(uri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}).catch(err => {
    console.log(err)
    process.exit(1)
})

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully!")
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})