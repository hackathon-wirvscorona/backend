const Sequelize = require('sequelize');
const db = require('../config/database');
const Customer = require('../models/Customer');
const Company = require('../models/Company');

const Address  = db.define('address', {
    housenumber: {
        type: Sequelize.STRING,
        require: true,
        min: 1,
        max: 255,
    },

    street: {
        type: Sequelize.STRING,
        require: true,
        min: 1,
        max: 255,
    },

    postcode: {
        type: Sequelize.STRING,
        require: true,
        min: 1,
        max: 255
    },

    city: {
        type: Sequelize.STRING,
        require: true,
        min: 1,
        max: 255,
    },

    longitude: {
        type: Sequelize.DOUBLE,
        require: false,
    },

    latitude: {
        type: Sequelize.DOUBLE,
        require: false,
    },

})

Address.hasMany(Customer, {as: 'Customers',foreignKey: 'addressFk', targetKey:'id'});
Address.hasMany(Company, {as: 'Companies' , foreignKey: 'addressFk', targetKey:'id'});

module.exports = Address;

