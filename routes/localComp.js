const router = require('express').router();
const sequalize = require('sequelize');
const Company = require('../models.Company')

router.get('/', async(req, res) => {
    var companieslist = await Company.findAll();
    var longPos = req.longPos;
    var latPos = req.latPos;
    var companiesNearby = [];
    var maxDistance = 10;
    
    companieslist.array.forEach(element => {
        var dx = 71.3 * (longPos - element.longPos);
        var dy = 111.3 * (latPos - element.latPos);
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < maxDistance){
            companiesNearby.push(element);
        }
    });

    res.status(200).send(companiesNearby);

});

module.exports(router);
