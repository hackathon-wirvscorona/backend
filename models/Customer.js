const Sequelize = require('sequelize');
const db = require('../config/database');
const GiftCard = require('./GiftCard');
const Authorization = require('./Authorization')

const Customer = db.define('customer', {
    name: {
        type: Sequelize.STRING,
        unique: true,
        require: true,
        min: 6,
        max: 255,
    },
    email: {
        type: Sequelize.STRING,
        require: true,
        min: 6,
        max: 255,
    },
})

Customer.hasMany(GiftCard, {as: 'GiftCards', foreignKey: 'userFk', targetKey: 'id'});
Customer.belongsTo(Authorization, {foreignKey: 'authorizationFk', targetKey: 'id'});

module.exports = Customer;
