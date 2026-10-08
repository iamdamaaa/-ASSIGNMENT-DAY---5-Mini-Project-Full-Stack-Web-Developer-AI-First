'use strict';

const express = require('express');
const cors    = require('cors');
const routes  = require('./routes');

const app = express();

// ---- Middleware ----
app.use(cors({
  origin: [
    'http://127.0.0.1:5500',   // Live Server VS Code
    'http://localhost:5500',
    'http://localhost:3001',
    'http://127.0.0.1:3001',
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// ---- API Routes ----
app.use('/api', routes);

// ---- 404 Handler ----
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route tidak ditemukan.' });
});

// ---- Error Handler ----
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
});

module.exports = app;
