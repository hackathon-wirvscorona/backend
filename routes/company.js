
const router = require('express').Router();
const sequelize = require('sequelize');
const Company = require('../models/Company');
var fuzzy = require('fuzzyset.js');
const verify = require('./verifyToken');
const User = require('../models/User');
const Offer = require('../models/Offer');

/**
 * returns all companies near the user
 */
router.get('/searchDistance', async(req, res) => {
    var companieslist = await Company.findAll();
    var longPos = req.longitude;
    var latPos = req.latitude;
    var companiesNearby = [];
    var maxDistance = 10;
    
    companieslist.array.forEach(element => {
        var dx = 71.3 * (longPos - element.longitude);
        var dy = 111.3 * (latPos - element.latitude);
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < maxDistance){
            companiesNearby.push(element);
        }
    });

    res.status(200).send(JSON.stringify(companiesNearby));

});

/**
 * Get Companies (with Filter)
 */

router.get('/companies', async(req, res) => {
    var name = req.name;
    var companies;
    if (req.branch == null && req.name == null){
        res.status(400)
    } else if (req.branch != null && req.name == null){
        companies = await Company.findAll({
            where: {
                branch: req.branch
            }
        })

        res.status(200).send(JSON.stringify(companies))
    } else {
        if (req.branch != null){
            companies = await Company.findAll({
                where: {
                    branch: req.branch
                }
            })
        } else {
            companies = await Company.findAll()
        }
        if (companies.count == 0){
            res.send(404)
        }
        var companyNames = [];
        var companyDict;
        companies.forEach(element => {
            companyNames.push(element.name);
            companyDict[element.name] = element;
        });
    
        var a = FuzzySet(companyNames);
    
        var result;
        a.get(name).forEach(element => {
            result.push(companyDict[element]);
        });
    
        res.status(200).send(JSON.stringify(result));
    }
        
});

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

router.get('/offer/:id', verify, async(req, res) => {
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


router.post('/offer/:id', verify, async(req, res) => {
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

router.delete('/offer/:id', verify, async(req, res) => {
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

    res.status(200).json(offer);
});

module.exports = router;
