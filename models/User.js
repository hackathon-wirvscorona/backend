const Sequelize = require('sequelize');
const db = require('../config/database');
const GiftCard = require('./GiftCard');
const Offer = require('./Offer');

const User = db.define('user', {
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
    password: {
        type: Sequelize.STRING,
        require: true,
        min: 6,
        max: 1024,
    },
})

User.hasMany(GiftCard, {as: 'GiftCards', foreignKey: 'userFk', targetKey: 'id'});
//User.hasMany(Offer, {foreignKey: 'userFk', targetKey: 'id'});


module.exports = User;
