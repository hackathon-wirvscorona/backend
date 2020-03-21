const GiftCard = require('./GiftCard')
const Sequelize = require('sequelize');
const db = require('../config/database');

const Company  = db.define('company', {
    name: {
        type: Sequelize.STRING,
        unique: true,
        require: true,
        min: 6,
        max: 255,
    },

    address: {
        type: Sequelize.STRING,
        require: true,
        min: 6,
        max: 255,
    },

    longitude: {
        type: Sequelize.DOUBLE,
        require: true,
    },

    latitude: {
        type: Sequelize.DOUBLE,
        require: true,
    },

})


Company.hasMany(Giftcard, {foreignKey: 'companyFk', targetKey:'id'});
module.exports = company;

