'use strict';

const { Category, Product } = require('../models');

// GET /api/categories
const getAll = async (req, res) => {
  try {
    const categories = await Category.findAll({
      where:      { is_active: true },
      attributes: ['id', 'name', 'slug', 'description', 'image'],
      order:      [['name', 'ASC']],
    });
    res.json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/categories/:slug
const getBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({
      where:   { slug: req.params.slug, is_active: true },
      include: [{
        model:      Product,
        as:         'products',
        where:      { is_active: true },
        required:   false,
        attributes: ['id', 'name', 'slug', 'description', 'price', 'image'],
      }],
    });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Kategori tidak ditemukan.' });
    }
    res.json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/categories
const create = async (req, res) => {
  try {
    const { name, slug, description, image, is_active } = req.body;

    if (!name || !slug) {
      return res.status(400).json({ success: false, message: 'Field name dan slug wajib diisi.' });
    }

    const category = await Category.create({
      name,
      slug,
      description: description || null,
      image:       image       || null,
      is_active:   is_active !== undefined ? is_active : true,
    });

    res.status(201).json({
      success: true,
      message: 'Kategori berhasil ditambahkan.',
      data:    category,
    });
  } catch (err) {
    // Unique constraint violation
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ success: false, message: 'Slug sudah digunakan.' });
    }
    if (err.name === 'SequelizeValidationError') {
      return res.status(422).json({ success: false, message: err.errors.map(e => e.message).join(', ') });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, getBySlug, create };
