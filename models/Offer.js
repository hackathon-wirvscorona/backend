const Sequelize = require('sequelize');
const db = require('../config/database');
const Company = require('./Company');

/**
 * gift card sample a company can offer.
 */
const Offer = db.define('offer',{

    name: {
        type: Sequelize.STRING,
        require: true,
        min: 6,
        max: 255,
    },

    description: {
        type: Sequelize.STRING,
        require: true,
        min: 1,
        max: 255
    },

    min_value:{
        type: Sequelize.INTEGER,
        require = true,
        min: 0,
        max: 500
    },

    max_value:{
        type: Sequelize.INTEGER,
        require = true,
        min = 0,
        max = 500
    }

});

Offer.belongsTo(Company, {foreignKey: 'offerFk', targetKey:'id'})

module.exports = Offer;