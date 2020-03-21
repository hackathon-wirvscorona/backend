
const router = require('express').Router();
const sequalize = require('sequelize');
const Company = require('../models/Company');
var fuzzy = require('fuzzyset.js');
const verify = require('./verifyToken');
const User = require('../models/User');

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
 * returns companies with a similar name
 */

router.get('/searchName', async(req, res) => {
    var content = req.content;
    var companies = await Company.findAll();
    var companyNames = [];
    var companyDict;
    companies.array.forEach(element => {
        companyNames.push(element.name);
        companyDict[element.name] = element;
    });

    var a = FuzzySet(companyNames);

    var result;
    var fuzzy = a.get(content).forEach(element => {
        result = companyDict[element];
    });
    

    res.status(200).send(JSON.stringify(result));
});

router.get('/offers', verify, async(req, res) => {
    var user = await User.findAll({
        where: {
            name: req.name
        }
    });

    var list = user.getOffers();
    res.status(200).send(JSON.stringify(list));
});

module.exports = router;
