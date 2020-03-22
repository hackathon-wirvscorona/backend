const router = require('express').Router();
const User = require('../models/User');
const GiftCard = require('../models/GiftCard');
var sequelize = require('sequelize');
const verify = require('./verifyToken');


/** 
 * Returns all users
*/

router.get('/users', verify, async(req, res, next) => {
    var users = User.findAll();
    res.status(200).json(users);
});

/**
 * Returns all information about a user
*/
router.get('/:id', verify, async(req, res) => {
    var user_id = req.params.id;
    var user = await User.findOne({
        where: {
            id : user_id
        }
    });
    if (user == null){
        res.status(404);
    }

    res.status(200).send(JSON.stringify(user));
})


/**
 * Change User Information
 */
router.post('/:id', verify, async(req, res) =>{
    var user_id = req.params.id;
    var user = await User.findOne({
        where: {
            id: user_id
        }
    });
    if (user == null){
        res.status(404);
    }

    await User.update({email: req.body.email},  {
        where: {
            id: user_id
        }
    });

    res.status(200).send("Account was successfully updated.");

});

/**
 * Deletes a User
 */
router.delete('/:id', verify, async(req, res) => {
    var user_id = req.params.id;

    await User.destroy({
        where: {
            id: user_id
        }
    }).then(function(userDeleted){
            res.status(200)
    }).catch(function(err){
            res.status(400)
    });
});



module.exports = router;
