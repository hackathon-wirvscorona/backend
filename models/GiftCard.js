const Sequelize = require('sequelize');
const db = require('../config/database');

/**
 * created when a user purchases a offer
 */
const GiftCard = db.define('giftcard', {
    name: {
        type: Sequelize.STRING,
        unique: true,
        require: true,
        min: 6,
        max: 255,
    },

    prize: {
        type: Sequelize.DOUBLE,
        require: true,
        min: 0,
        max: 1024,
    },

    expirydate: {
        type: Sequelize.DATE,
        require: true,
    },

    puchase_day: {
        type: Sequelize.DATE,
        require: true
    }
})


module.exports = GiftCard;
