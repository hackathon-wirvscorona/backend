const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('../models/User');
const Company = require('../models/Company');

const Address  = db.define('company', {
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

Company.hasMany(User, {as: 'Users',foreignKey: 'adressFk', targetKey:'id'});
Company.hasMany(Company, {as: 'Companies' , foreignKey: 'adressFk', targetKey:'id'});

module.exports = Address;

