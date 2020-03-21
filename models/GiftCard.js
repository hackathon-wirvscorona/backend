const Store = require('./Company')
const Sequelize = require('sequelize');
const db = require('../config/database');

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

    count: {
        type: Sequelize.INTEGER,
        require: true,
    },

    expirydate: {
        type: Sequelize.DATE,
        require: true,
    },
})

module.exports = GiftCard;
Giftcard.belongsTo(Company, {foreignKey: 'companyFk', targetKey:'id'});
