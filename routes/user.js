const router = require('express').Router();
const User = require('../models/User');
const GiftCard = require('../models/GiftCard');
var sequelize = require('sequelize');
const verify = require('./verifyToken');


/** 
 * list all users
*/

router.post('/users', verify, async(req, res, next) => {
    var users = User.findAll();
    res.status(200).json(users);
});

router.get('/user/:id', verify, async(req, res) => {
    offer = await User.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(offer =>{
        if(offer){
    // found offer
            res.status(200).send(offer);
        }else{
            res.status(404); // not found
        }
    })
    .catch(err => (res.status(400).send(err)));    
});

router.post('/user/:id', verify, async(req, res) => {
    offer = await User.update({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password;
    },{
        where: {
            id: req.params.id
        }
    }
    })
    .then(offer =>{
        if(offer){
    // found offer
            res.status(200).send(offer);
        }else{
            res.status(404); // not found
        }
    })
    .catch(err => (res.status(400).send(err)));    
});

router.delete('/user/:id', verify, async(req, res) => {
    offer = await Offer.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(offer =>{
        if(offer){
    // found offer
            res.status(200).send(offer);
        }else{
            res.status(404); // not found
        }
    })
    .catch(err => (res.status(400).send(err)));    
});
                                                    /**
                                                     * change account settings
 */
router.post('/account/change', verify, async(req, res) =>{
    var user = User.findOne({
        where: {
            name: req.body.name
        }
    });
    if (user == null){
        res.status(404);
    }

    await User.update({email: req.body.email},  {
        where: {
            name: req.body.name
        }
    })

    res.status(200).send("Account was successfully updated.");

});



/**
 * list with all past purchase the user completed
 */
router.get('/purchases', verify, async(req, res) => {
    var user = User.findOne({
        where: {
            name: req.name
        }
    });

    if (user == null){
        res.status(404);
    }
    
    var giftcards = GiftCard.findAll({
        where:{
            userFk: user.id
        }
    });
    res.status(200).send(JSON.stringify(giftcards));
});

module.exports = router;
