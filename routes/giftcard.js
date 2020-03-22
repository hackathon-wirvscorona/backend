const router = require('express').Router();
const sequalize = require('sequelize');
const GiftCard = require('../models/GiftCard');
const verify = require('./verifyToken');


router.delete('/:id', verify,  async(req, res) => {
    await GiftCard.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(rowDeleted){
                res.status(200);
        }).catch(function(err){
                res.status(400);
    })
});

router.get('/:id', verify, async(req, res) => {
    var giftCard = await GiftCard.findAll({
        where: {
            id: req.params.id
        }
    });
    
    if (giftCard == null){
        res.status(404);
    }
    res.status(200).send(JSON.stringify(giftCard));
});

/**
 * list with all past purchase the user completed
 */
router.get('/giftcards', verify, async(req, res) => {
    var user = await User.findOne({
        where: {
            name: req.name
        }
    });

    if (user == null){
        res.status(404);
    }
    
    var giftcards = await GiftCard.findAll({
        where:{
            userFk: user.id
        }
    });
    res.status(200).send(JSON.stringify(giftcards));
});

module.exports = router;
