const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../models/User');
const Company = require('../models/Company');
const GiftCard = require('../models/GiftCard');
const Offer = require('../models/Offer');

/**
 * purchasing flow  -> no racing conditions checked
 */
router.post('/', verify, async(req, res) => {
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

    await Offer.update({ count =  count - 1}, {
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
