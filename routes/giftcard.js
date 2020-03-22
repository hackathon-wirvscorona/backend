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

router.post('/create', verify, async(req, res) => {
    var user = await User.findAll({
        where: {
            name: req.body.user_name
        }
    });

    var offer = await Offer.findAll({
        where: {
            id: req.body.offer_id
        }
    });
    
    if (user.count !=  1 || offer.count != 1){
        res.status(404);
    }

    if (!(count.minPrice <= price && count.maxPrice >= price)){
        res.status(400).send("Illegal price for this offer.");
    }

    await Offer.update({ count:  count - 1}, {
        where: {
            id: offer.id
        }
    });
    
    var gift = await GiftCard.create({
        companyFk: offer.company.id,
        userFk: user.id,
        name: offer.name,
        price: offer.price,
        expirydate: offer.expirydate,
        purchaseDay: Date.now()
    });

    
});

module.exports = router;
