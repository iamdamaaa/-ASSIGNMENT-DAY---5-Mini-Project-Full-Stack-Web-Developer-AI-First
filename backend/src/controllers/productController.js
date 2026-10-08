'use strict';

const { Product, Category } = require('../models');

// GET /api/products
const getAll = async (req, res) => {
  try {
    const products = await Product.findAll({
      where:      { is_active: true },
      attributes: ['id', 'name', 'slug', 'description', 'price', 'image', 'category_id'],
      include: [{
        model:      Category,
        as:         'category',
        attributes: ['id', 'name', 'slug'],
      }],
      order: [['name', 'ASC']],
    });
    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/products/:slug
const getBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({
      where:   { slug: req.params.slug, is_active: true },
      include: [{
        model:      Category,
        as:         'category',
        attributes: ['id', 'name', 'slug'],
      }],
    });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Produk tidak ditemukan.' });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/products/category/:categorySlug
const getByCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      where: { slug: req.params.categorySlug, is_active: true },
    });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Kategori tidak ditemukan.' });
    }
    const products = await Product.findAll({
      where:      { category_id: category.id, is_active: true },
      attributes: ['id', 'name', 'slug', 'description', 'price', 'image'],
      include: [{
        model:      Category,
        as:         'category',
        attributes: ['id', 'name', 'slug'],
      }],
      order: [['name', 'ASC']],
    });
    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/products
const create = async (req, res) => {
  try {
    const { category_id, name, slug, description, price, image, is_active } = req.body;

    if (!category_id || !name || !slug || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Field category_id, name, slug, dan price wajib diisi.',
      });
    }

    // Pastikan category_id valid
    const category = await Category.findByPk(category_id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Kategori tidak ditemukan.' });
    }

    const product = await Product.create({
      category_id,
      name,
      slug,
      description: description || null,
      price,
      image:       image       || null,
      is_active:   is_active !== undefined ? is_active : true,
    });

    res.status(201).json({
      success: true,
      message: 'Produk berhasil ditambahkan.',
      data:    product,
    });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ success: false, message: 'Slug sudah digunakan.' });
    }
    if (err.name === 'SequelizeValidationError') {
      return res.status(422).json({ success: false, message: err.errors.map(e => e.message).join(', ') });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, getBySlug, getByCategory, create };
