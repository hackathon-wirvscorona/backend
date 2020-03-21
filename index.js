const express = require('express');
const app = express();
const dotenv = require('dotenv').config()

const db = require('./config/database'); 

//Test DB
db.authenticate()
    .then(() => console.log('Databsase connected'))
    .catch(err => console.log('Error: ' + err))

//IMPORT ROUTES
const authRoute = require('./routes/auth');
const testRoute = require('./routes/test');

//MIDDLEWARE
app.use(express.json());

//ROUTEMIDDELWARE
app.use('/api/test', testRoute);
app.use('/api/auth', authRoute);



app.listen(5000, () => console.log("Server is up and running on Port 5000"));