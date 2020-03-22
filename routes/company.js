
const router = require('express').Router();
const Company = require('../models/Company');
var fuzzy = require('fuzzyset.js');
const verify = require('./verifyToken');;

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

router.get('/:id', verify, async(req, res) => {
    company = await Company.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(company =>{
        if(company){
            // found offer
            res.status(200).send(company);
        }else{
            res.status(404); // not found
        }
    })
    .catch(err => (res.status(400).send(err)));    
});


router.post('/:id', verify, async(req, res) => {
    company = await Company.update(
    {
        name: req.body.name,
        address: req.body.address,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
    }, {
        where: {
            id: req.params.id
        }
    })
    .then(company => {
        if(company){
            // found offer
            res.status(200).send(company);
        }else{
            res.status(404); // not found
        }
    })
    .catch(err => (res.status(400).send(err)));    

});

router.delete('/:id', verify, async(req, res) => {
    company = await Company.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(company =>{
        if(company){
            // found offer
            res.status(200).send(company);
        }else{
            res.status(404); // not found
        }
    })
    .catch(err => (res.status(400).send(err)));    

});

module.exports = router;
