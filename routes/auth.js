const router = require('express').Router();
const db = require('../config/database');
const Authorization = require('../models/Authorization');
const Company = require('../models/Company');
const Customer = require('../models/Customer');
const {registerValidation, loginValidation} = require('../validation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv').config();

async function register(password)  {
    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create
    return Authorization.create(
        {
            password: hashedPassword,
        }
    );  
}

router.post('/login', async (req,res) => {
    //Validate
    const validation = loginValidation(req.body);
    if(validation.error) {
       return res.status(401).send('{"error" : "Email or Password is wrong"}');
    }    
    //Checking if the user is already in the database
    const company = await Company.findOne({where: {email: req.body.email}})
    if(company) {
        const auth = await company.getAuthorization();
        if(!auth) return res.status(401).send('{"error" : "Email or Password is wrong"}');

        //Password is correct
        const validPass = await bcrypt.compare(req.body.password, auth.password);
        if(!validPass) return res.status(401).send('{"error" : "Email or Password is wrong"}');
        
        //Create and assign a token
        const token = jwt.sign({_id: company.id, _company: true}, process.env.TOKEN_SECRET);

        res.header('auth-token', token);
        res.status(200).send('{"token": "'+ token + '", "expiresIn": 3600}');
    }
    const customer = await Customer.findOne({where: {email: req.body.email}})
    if(customer) {
        const auth = await customer.getAuthorization();
        if(!auth) return res.status(401).send('{"error" : "Email or Password is wrong"}');

        //Password is correct
        const validPass = await bcrypt.compare(req.body.password, auth.password);
        if(!validPass) return res.status(401).send('{"error" : "Email or Password is wrong"}');
        
        //Create and assign a token
        const token = jwt.sign({_id: customer.id, _customer: true}, process.env.TOKEN_SECRET);

        res.header('auth-token', token);
        res.status(200).send('{"token": "'+ token + '", "expiresIn": 3600}');
    }
    return res.status(401).send('{"error" : "Email or Password is wrong"}');
})

module.exports = router;
module.exports.register = register;