const router = require('express').Router();
const User = require('../models/User');
const GiftCard = require('../models/GiftCard');
var sequelize = require('sequelize');
const verify = require('./verifyToken');


/** list all users
*/

router.post('/users', verify, async(req, res, next) => {
    var users = User.findAll();
    res.status(200).json(users);
});


/**
 * change account settings
 */
router.post('/account/change', verify, async(req, res) =>{
    var user = User.findAll({
        where: {
            name: req.name
        }
    });
    if (user.count != 1){
        res.status(404);
    }

    await User.update({email: req.email},  {
        where: {
            name: req.name
        }
    })

    res.status(200).send("Account was successfully updated.");

});



/**
 * list with all past purchase the user completed
 */
router.get('/purchases', verify, async(req, res) => {
    var userlist = User.findAll({
        where: {
            name: req.name
        }
    });

    if (user.count != 1){
        res.status(404);
    }

    var user = userlist[0];
    
    var giftcards = GiftCard.findAll({
        where:{
            userFk: user.id
        }
    });
    res.status(200).json(giftcards);
});

module.exports = router;