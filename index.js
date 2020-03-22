const express = require('express');
const app = express();
const dotenv = require('dotenv').config()
const {registerValidationCustomer, loginValidation} = require('./validation');

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
const customerRoute = require('./routes/customer');
const offerRoute = require('./routes/offer');
const uploadRoute = require('./routes/upload');


//MIDDLEWARE
app.use(express.json());

//ROUTEMIDDELWARE
app.use('/api/test', testRoute);
app.use('/api/auth', authRoute);
app.use('/api/giftcard', giftCardRoute);
app.use('/api/company', companyRoute);
app.use('/api/customer', customerRoute);
app.use('/api/offer', offerRoute);
app.use('/api/upload', uploadRoute);




app.listen(5000, () => console.log("Server is up and running on Port 5000"));