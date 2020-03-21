const router = require('express').Router();
const db = require('../config/database');
const User = require('../models/User');
const {registerValidation, loginValidation} = require('../validation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv').config();

router.post('/register', async (req,res) => {
    //Validate
    const validation = registerValidation(req.body);
    if(validation.error) {
       return res.status(400).send(validation.error);
    }

    //Checking if the user is already in the database
    const emailExist = await User.findOne({where: {email: req.body.email}})
    if(emailExist) return res.status(400).send('Email already exists');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create
    User.create(
        {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        }
    )
    .then(user => res.status(200).send(user))
    .catch(err => (res.status(400).send(err)));    
});

router.post('/login', async (req,res) => {
    //Validate
    const validation = loginValidation(req.body);
    if(validation.error) {
       return res.status(401).send('{"error" : "Email or Password is wrong"}');
    }    
    //Checking if the user is already in the database
    const user = await User.findOne({where: {email: req.body.email}})
    console.log(user);
    if(!user) return res.status(401).send('{"error" : "Email or Password is wrong"}');

    //Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(401).send('{"error" : "Email or Password is wrong"}');
    
    //Create and assign a token
    const token = jwt.sign({_id: user.id}, process.env.TOKEN_SECRET);

    res.header('auth-token', token);
    res.status(200).send('{"token": "'+ token + '", "expiresIn": 3600}');
})

module.exports = router;