'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // Satu category memiliki banyak product
      Category.hasMany(models.Product, {
        foreignKey: 'category_id',
        as:         'products',
      });
    }
  }

  Category.init(
    {
      id: {
        type:          DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey:    true,
      },
      name: {
        type:      DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Nama kategori tidak boleh kosong.' },
          len: {
            args: [2, 100],
            msg:  'Nama kategori harus antara 2 dan 100 karakter.',
          },
        },
      },
      slug: {
        type:      DataTypes.STRING(120),
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
      modelName:  'Category',
      tableName:  'categories',
      underscored: true,    // kolom snake_case otomatis
      timestamps:  true,
      createdAt:   'created_at',
      updatedAt:   'updated_at',
    }
  );

  return Category;
};
