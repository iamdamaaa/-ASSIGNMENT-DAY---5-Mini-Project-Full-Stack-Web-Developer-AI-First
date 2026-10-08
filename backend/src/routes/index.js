'use strict';

const express             = require('express');
const router              = express.Router();

const homeRoute           = require('./homeRoute');
const categoryController  = require('../controllers/categoryController');
const productController   = require('../controllers/productController');

// ---- Home ----
router.use('/home', homeRoute);

// ---- Categories ----
router.get('/categories',       categoryController.getAll);
router.get('/categories/:slug', categoryController.getBySlug);
router.post('/categories',      categoryController.create);

// ---- Products ----
router.get('/products',                        productController.getAll);
router.get('/products/category/:categorySlug', productController.getByCategory);
router.get('/products/:slug',                  productController.getBySlug);
router.post('/products',                       productController.create);

module.exports = router;
