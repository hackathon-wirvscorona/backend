/**
 * returns list of all companies which have a similar name
 */

var router = require('express').router();
var fuzzy = require('fuzzyset.js');
const sequalize = require('sequelize');
const Company = require('../models.Company');

router.get('/', async(req, res) => {
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
    

    res.status(200).send(result);
})

