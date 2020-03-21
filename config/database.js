const Sequelize = require('sequelize');
const dotenv = require('dotenv').config()


module.exports = new Sequelize (
    process.env.DB_DATABASE, 
    process.env.DB_USERNAME, 
    process.env.DB_PASSWORD, 
    {
    host: '188.68.57.15',
    port: 3306,
    dialect: 'mariadb',
    operatorAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});