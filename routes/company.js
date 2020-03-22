
const router = require('express').Router();
const Company = require('../models/Company');
const Customer = require('../models/Customer');
const Address = require('../models/Address');
var fuzzy = require('fuzzyset.js');
const verify = require('./verifyToken');
const {registerValidationCompany} = require('../validation');
var {register} = require('./auth');

/**
 * returns all companies near the user
 */
router.get('/searchDistance', async(req, res) => {
    var companieslist = await Company.findAll();
    var longPos = req.longitude;
    var latPos = req.latitude;
    var companiesNearby = [];
    var maxDistance = 10;
    
    companieslist.forEach(element => {
        var address = element.getAddress();
        var address = element.getAdress();
        longitude = address.longitude;
        latitude = address.latitude;
        var dx = 71.3 * (longPos - longitude);
        var dy = 111.3 * (latPos - latitude);
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


router.post('/create', async(req, res) => {
    const validation = registerValidationCompany(req.body);
    if(validation.error) {
       return res.status(400).send(validation.error);
    }
    
    //Checking if the user is already in the database
    let emailExist = await Customer.findOne({where: {email: req.body.email}})
    if(emailExist) return res.status(400).send({err: 'Email already exists'});
    //Checking if the user is already in the database
    emailExist = await Company.findOne({where: {email: req.body.email}})
    if(emailExist) return res.status(400).send({err: 'Email already exists'});

    register(req.body.password)
    .catch(err => {res.status(500).send(err)})
    .then(auth => {        
        Address.create(req.body.address)
        .catch(err => {res.status(500).send(err)})
        .then(address => {
            console.log(address);
            Company.create({
                email: req.body.email,
                name: req.body.name,
                description: req.body.description,
                authorizationFk: auth.id,
                addressFk: address.id
            })
            .catch(err => {res.status(500).send(err)})
            .then(company => {res.status(200).send(company)});
        })
    });
});

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
        description: req.body.description
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
