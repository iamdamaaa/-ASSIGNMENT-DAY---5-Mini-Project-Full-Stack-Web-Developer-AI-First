'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Ambil id kategori yang sudah di-seed
    const [categories] = await queryInterface.sequelize.query(
      `SELECT id, slug FROM categories WHERE slug IN ('headset', 'mouse')`
    );

    const catMap = {};
    categories.forEach(c => { catMap[c.slug] = c.id; });

    await queryInterface.bulkInsert('products', [
      {
        category_id: catMap['headset'],
        name:        'Headset Jossgandos',
        slug:        'headset-jossgandos',
        description: 'Headset ori cap Jossgandos nyaman dikuping ga bikin pusing. Build quality premium, suara jernih, cocok buat kerja, gaming, maupun santai seharian.',
        price:       249000.00,
        image:       '../assets/headset-hitam.svg',
        is_active:   true,
        created_at:  new Date(),
        updated_at:  new Date(),
      },
      {
        category_id: catMap['mouse'],
        name:        'Mouse Jossgandos',
        slug:        'mouse-jossgandos',
        description: 'Mouse ori cap Jossgandos presisi tinggi, nyaman digenggam seharian. Sensor optik akurat, klik responsif, cocok buat kerja maupun gaming.',
        price:       199000.00,
        image:       '../assets/mouse-hitam.svg',
        is_active:   true,
        created_at:  new Date(),
        updated_at:  new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('products', {
      slug: ['headset-jossgandos', 'mouse-jossgandos'],
    });
  },
};
