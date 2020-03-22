const Sequelize = require('sequelize');
const db = require('../config/database');

const Authorization = db.define('authorization', {
    password: {
        type: Sequelize.STRING,
        require: true,
        min: 6,
        max: 1024,
    },
})

module.exports = Authorization;
