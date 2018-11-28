const Sequelize = require('sequelize');

const sequelize = new Sequelize('book_library','root','', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  dialectOptions: {
    charset: "utf8",
    collate: "utf8_unicode_ci",
    supportBigNumbers: true,
    bigNumberStrings: true
  },
  define: {
    underscored: true,
    charset: 'utf8'
  },
  operatorsAliases: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;
