const GiftCard = require('./GiftCard')
const Sequelize = require('sequelize');
const db = require('../config/database');
const Offer = require('./Offer');
const Authorization = require('./Authorization');

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
    },

    email: {
        type: Sequelize.STRING,
        require: true,
        min: 3,
        max: 100
    },

    branche: {
        type: Sequelize.STRING,
        require: false,
        min: 3,
        max: 100
    },

    description: {
        type: Sequelize.STRING,
        require: false,
        min: 0,
        max: 10000
    }

})



Company.hasMany(GiftCard, {as: 'GiftCards',foreignKey: 'companyFk', targetKey:'id'});
Company.hasMany(Offer, {as: 'Offers' , foreignKey: 'companyFk', targetKey:'id'});
Company.belongsTo(Authorization, {foreignKey: 'authorizationFk', targetKey: 'id'});

module.exports = Company;

