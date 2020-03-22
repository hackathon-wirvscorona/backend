const Offer = require('../models/Offer');
const router = require('express').Router();
const verify = require('./verifyToken');
const Company = require('../models/Company');

// TODO: Implement as stated in
router.get('/offers', verify, async(req, res) => {
    var list = Offer.findAll();
    var user = await User.findAll({
        where: {
            name: req.body.name
        }
    });

    var list = user.getOffers();
    res.status(200).send(JSON.stringify(list));
});

// FIXME: this only gives 400 
router.post('/createOffer', verify, async(req, res) => {
    Offer.create(
    {
        name: req.body.name,
        description: req.body.description,
        min_value: req.body.min_value,
        max_value: req.body.max_value,
        companyFk: req.user
    })
    .then(offer =>(res.status(200).send(offer)))
    .catch(err => (res.status(400).send(err)));    
});

router.get('/:id', verify, async(req, res) => {
    offer = await Offer.findOne({
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


router.post('/:id', verify, async(req, res) => {
    offer = await Offer.update(
    {
        name: req.body.name,
        description: req.body.description,
        min_value: req.body.min_value,
        max_value: req.body.max_value,
        companyFk: req.user
    }, {
        where: {
            id: req.params.id
        }
    })
    .then(offer => {
        if(offer){
            // found offer
            res.status(200).send(offer);
        }else{
            res.status(404); // not found
        }
    })
    .catch(err => (res.status(400).send(err)));    

});

router.delete('/:id', verify, async(req, res) => {
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

module.exports = router;