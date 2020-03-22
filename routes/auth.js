const router = require('express').Router();
const db = require('../config/database');
const Authorization = require('../models/Authorization');
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
    const Authorization = await Authorization.findOne({where: {email: req.body.email}})
    console.log(Authorization);
    if(!Authorization) return res.status(401).send('{"error" : "Email or Password is wrong"}');

    //Password is correct
    const validPass = await bcrypt.compare(req.body.password, Authorization.password);
    if(!validPass) return res.status(401).send('{"error" : "Email or Password is wrong"}');
    
    //Create and assign a token
    const token = jwt.sign({_id: Authorization.id}, process.env.TOKEN_SECRET);

    res.header('auth-token', token);
    res.status(200).send('{"token": "'+ token + '", "expiresIn": 3600}');
})

module.exports = router;
module.exports.register = register;