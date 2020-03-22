const router = require('express').Router();
const sequalize = require('sequelize');
const GiftCard = require('../models/GiftCard');


router.post('/delete', async(req, res) => {
    await GiftCard.destroy({
        where: {
            id: req.body.id
        }
    }).then(function(rowDeleted){
                res.status(200);
        }).catch(function(err){
                res.status(400);
    })
});

router.get('/info', async(req, res) => {
    var giftCard = await GiftCard.findAll({
        where: {
            id: req.id
        }
    });
    
    if (giftCard == null){
        res.status(404);
    }
    res.status(200).send(JSON.stringify(giftCard));
});

module.exports = router;
