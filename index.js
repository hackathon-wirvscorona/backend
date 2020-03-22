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
const giftCardRoute = require('./routes/giftcard');
const companyRoute = require('./routes/company');
const buyRoute = require('./routes/buy');
const userRoute = require('./routes/user');
const uploadRoute = require('./routes/upload');

//MIDDLEWARE
app.use(express.json());

//ROUTEMIDDELWARE
app.use('/api/test', testRoute);
app.use('/api/auth', authRoute);
app.use('/api/giftcard', giftCardRoute);
app.use('/api/company', companyRoute);
app.use('/api/buy', buyRoute);
app.use('/api/user', userRoute);
app.use('/api/upload', uploadRoute);



app.listen(5000, () => console.log("Server is up and running on Port 5000"));