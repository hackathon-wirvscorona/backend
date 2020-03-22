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

    branche: {
        type: Sequelize.STRING,
        require: true,
        min: 3,
        max: 100
    }

})



Company.hasMany(GiftCard, {foreignKey: 'companyFk', targetKey:'id'});
Company.hasMany(Offer, {foreignKey: 'companyFk', targetKey:'id'});

Company.belongsToMany(Address, {foreignKey: 'companyFk', targetKey:'id'});

module.exports = Company;

