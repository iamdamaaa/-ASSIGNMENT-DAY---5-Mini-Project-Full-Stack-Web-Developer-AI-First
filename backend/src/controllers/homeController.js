'use strict';

const homeService = require('../services/homeService');

// GET /api/home
const getHome = async (req, res) => {
  try {
    const data = await homeService.getHomeData();

    res.json({
      success: true,
      message: 'Berhasil mengambil data home.',
      data: {
        categories: data.categories,
        products:   data.products,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data home.',
      error:   err.message,
    });
  }
};

module.exports = { getHome };
