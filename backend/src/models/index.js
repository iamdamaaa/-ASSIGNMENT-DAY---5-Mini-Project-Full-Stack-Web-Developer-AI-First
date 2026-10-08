'use strict';

const { Sequelize } = require('sequelize');
const config        = require('../config/database');

const env        = process.env.NODE_ENV || 'development';
const dbConfig   = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

// Import models
const Category = require('./Category')(sequelize, Sequelize.DataTypes);
const Product  = require('./Product')(sequelize, Sequelize.DataTypes);

const db = { sequelize, Sequelize, Category, Product };

// Jalankan asosiasi jika ada
Object.values(db).forEach(model => {
  if (model.associate) model.associate(db);
});

module.exports = db;
