'use strict';

const { Category, Product } = require('../models');

/**
 * Ambil data untuk halaman beranda.
 * - categories: semua kategori aktif
 * - products:   semua produk aktif beserta info kategorinya
 *
 * @returns {{ categories: Category[], products: Product[] }}
 */
const getHomeData = async () => {
  const [categories, products] = await Promise.all([
    // Semua kategori aktif
    Category.findAll({
      where:      { is_active: true },
      attributes: ['id', 'name', 'slug', 'description', 'image'],
      order:      [['name', 'ASC']],
    }),

    // Semua produk aktif, sertakan kategorinya
    Product.findAll({
      where:      { is_active: true },
      attributes: ['id', 'name', 'slug', 'description', 'price', 'image', 'category_id'],
      include: [
        {
          model:      Category,
          as:         'category',
          attributes: ['id', 'name', 'slug'],
        },
      ],
      order: [['name', 'ASC']],
    }),
  ]);

  return { categories, products };
};

module.exports = { getHomeData };
