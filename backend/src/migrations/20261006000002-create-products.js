'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type:          Sequelize.INTEGER.UNSIGNED,
        allowNull:     false,
        autoIncrement: true,
        primaryKey:    true,
      },
      category_id: {
        type:       Sequelize.INTEGER.UNSIGNED,
        allowNull:  false,
        references: {
          model: 'categories',
          key:   'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      name: {
        type:      Sequelize.STRING(150),
        allowNull: false,
      },
      slug: {
        type:      Sequelize.STRING(170),
        allowNull: false,
        unique:    true,
      },
      description: {
        type:      Sequelize.TEXT,
        allowNull: true,
      },
      price: {
        type:      Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      image: {
        type:      Sequelize.STRING(255),
        allowNull: true,
      },
      is_active: {
        type:         Sequelize.BOOLEAN,
        allowNull:    false,
        defaultValue: true,
      },
      created_at: {
        type:      Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type:      Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });

    // Index tambahan untuk performa query
    await queryInterface.addIndex('products', ['category_id'], {
      name: 'idx_products_category_id',
    });
    await queryInterface.addIndex('products', ['is_active'], {
      name: 'idx_products_is_active',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('products');
  },
};
