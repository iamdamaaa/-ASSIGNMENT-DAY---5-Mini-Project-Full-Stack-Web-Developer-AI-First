'use strict';

require('dotenv').config();

const app            = require('./app');
const { sequelize }  = require('./models');

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    // Test koneksi database
    await sequelize.authenticate();
    console.log('✅  Database terhubung.');

    app.listen(PORT, () => {
      console.log(`🚀  Server berjalan di http://localhost:${PORT}`);
      console.log(`\n   GET  /api/categories`);
      console.log(`   GET  /api/categories/:slug`);
      console.log(`   GET  /api/products`);
      console.log(`   GET  /api/products/category/:categorySlug`);
      console.log(`   GET  /api/products/:slug`);
    });
  } catch (err) {
    console.error('❌  Gagal terhubung ke database:', err.message);
    console.error('   Pastikan MySQL berjalan dan konfigurasi .env sudah benar.');
    process.exit(1);
  }
}

startServer();
