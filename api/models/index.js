'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

console.log('Debug log inside models/index.js ---------------------------------');

let sequelize;
if (config.use_env_variable) {
  console.log('config.use_env_variable === true');
  console.log('process.env[config.use_env_variable]:', process.env[config.use_env_variable]);
  console.log('config:', config);
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  console.log('config.use_env_variable === false');
  console.log('config.database: ', config.database);
  console.log('config.username: ', config.username);
  console.log('config.password: ', config.password);
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
