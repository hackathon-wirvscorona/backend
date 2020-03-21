const Sequelize = require('sequelize');
const db = require('../config/database');

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



module.exports = Address;

