'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // Satu product hanya memiliki satu category
      Product.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as:         'category',
      });
    }
  }

  Product.init(
    {
      id: {
        type:          DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey:    true,
      },
      category_id: {
        type:      DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
          notNull: { msg: 'category_id wajib diisi.' },
        },
      },
      name: {
        type:      DataTypes.STRING(150),
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Nama produk tidak boleh kosong.' },
          len: {
            args: [2, 150],
            msg:  'Nama produk harus antara 2 dan 150 karakter.',
          },
        },
      },
      slug: {
        type:      DataTypes.STRING(170),
        allowNull: false,
        unique:    true,
        validate: {
          notEmpty: { msg: 'Slug tidak boleh kosong.' },
          is: {
            args: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            msg:  'Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung.',
          },
        },
      },
      description: {
        type:      DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type:      DataTypes.DECIMAL(12, 2),
        allowNull: false,
        validate: {
          notNull:    { msg: 'Harga wajib diisi.' },
          isDecimal:  { msg: 'Harga harus berupa angka.' },
          min: {
            args: [0],
            msg:  'Harga tidak boleh negatif.',
          },
        },
      },
      image: {
        type:      DataTypes.STRING(255),
        allowNull: true,
      },
      is_active: {
        type:         DataTypes.BOOLEAN,
        allowNull:    false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName:   'Product',
      tableName:   'products',
      underscored: true,
      timestamps:  true,
      createdAt:   'created_at',
      updatedAt:   'updated_at',
    }
  );

  return Product;
};
