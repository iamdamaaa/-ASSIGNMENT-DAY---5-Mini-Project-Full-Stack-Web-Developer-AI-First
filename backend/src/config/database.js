'use strict';

require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || null,
    database: process.env.DB_NAME || 'jossgandos_db',
    host:     process.env.DB_HOST || '127.0.0.1',
    port:     parseInt(process.env.DB_PORT, 10) || 3306,
    dialect:  'mysql',
    timezone: '+07:00',
    define: {
      underscored:   true,   // snake_case kolom otomatis
      timestamps:    true,
      createdAt:     'created_at',
      updatedAt:     'updated_at',
    },
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || null,
    database: process.env.DB_NAME_TEST || 'jossgandos_test',
    host:     process.env.DB_HOST || '127.0.0.1',
    dialect:  'mysql',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host:     process.env.DB_HOST,
    dialect:  'mysql',
    timezone: '+07:00',
    define: {
      underscored: true,
      timestamps:  true,
      createdAt:   'created_at',
      updatedAt:   'updated_at',
    },
  },
};
