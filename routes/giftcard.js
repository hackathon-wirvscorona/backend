const router = require('express').router();
const sequalize = require('sequelize');
const GiftCard = require('../models/GiftCard');


router.post('/giftcard/delete', async(req, res) => {
    await GiftCard.destroy({
        where: {
            id: req.body.giftCardId
        }
    }).then(function(rowDeleted){
                res.status(200);
            }).catch(function(err){
                res.status(400);
            })
    });
});
