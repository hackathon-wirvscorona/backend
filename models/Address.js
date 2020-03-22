const Sequelize = require('sequelize');
const db = require('../config/database');
const Customer = require('../models/Customer');
const Company = require('../models/Company');

const Address  = db.define('adress', {
    housenumber: {
        type: Sequelize.STRING,
        require: true,
        min: 0,
        max: 255,
    },

    street: {
        type: Sequelize.STRING,
        require: true,
        min: 0,
        max: 255,
    },

    postcode: {
        type: Sequelize.STRING,
        require: true,
    },

    city: {
        type: Sequelize.STRING,
        require: true,
        min: 0,
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

Address.hasMany(Customer, {as: 'Customers',foreignKey: 'adressFk', targetKey:'id'});
Address.hasMany(Company, {as: 'Companies' , foreignKey: 'adressFk', targetKey:'id'});

module.exports = Address;

