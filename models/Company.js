const GiftCard = require('./GiftCard')
const Sequelize = require('sequelize');
const db = require('../config/database');
const Offer = require('./Offer');
const Address = require('./Address');

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



Company.hasMany(GiftCard, {foreignKey: 'companyFk', targetKey:'id'});
Company.hasMany(Offer, {foreignKey: 'companyFk', targetKey:'id'});

Company.belongsToMany(Address, {foreignKey: 'companyFk', targetKey:'id'});

module.exports = Company;

