'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('categories', [
      {
        name:        'Headset',
        slug:        'headset',
        description: 'Koleksi headset ori Jossgandos, nyaman dikuping dan suara jernih.',
        image:       null,
        is_active:   true,
        created_at:  new Date(),
        updated_at:  new Date(),
      },
      {
        name:        'Mouse',
        slug:        'mouse',
        description: 'Koleksi mouse gaming ori Jossgandos, presisi tinggi dan nyaman digenggam.',
        image:       null,
        is_active:   true,
        created_at:  new Date(),
        updated_at:  new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('categories', {
      slug: ['headset', 'mouse'],
    });
  },
};
