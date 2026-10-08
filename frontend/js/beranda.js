'use strict';

/* ============================================================
   JOSSGANDOS STORE — Beranda
   js/beranda.js
   Fetch: GET /api/categories  &  GET /api/products
   ============================================================ */

const API = 'http://localhost:3001/api';
const WA_NUMBER = '6281234567890'; // ganti dengan nomor WA toko

document.addEventListener('DOMContentLoaded', async () => {

  const footerYear = document.getElementById('footer-year');
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  /* ---- util ---- */
  const fmt = (n) => 'Rp' + Number(n).toLocaleString('id-ID');

  function setStatus(elId, msg, isError = false) {
    const el = document.getElementById(elId);
    if (!el) return;
    el.textContent = msg;
    el.className   = `api-status ${isError ? 'api-status--error' : 'api-status--ok'}`;
    el.hidden      = false;
  }

  function hide(id) {
    const el = document.getElementById(id);
    if (el) el.hidden = true;
  }

  function show(id) {
    const el = document.getElementById(id);
    if (el) el.hidden = false;
  }

  /* ---- buat URL WhatsApp ---- */
  function waUrl(product) {
    const msg = encodeURIComponent(
      `Halo Jossgandos! Saya ingin memesan:\n*${product.name}*\nHarga: ${fmt(product.price)}\n\nMohon info ketersediaan stok.`
    );
    return `https://wa.me/${WA_NUMBER}?text=${msg}`;
  }

  /* ---- render satu product card ---- */
  function renderCard(product) {
    const categoryName = product.category ? product.category.name : '—';
    const imageSrc     = product.image || '../assets/headset-hitam.svg';
    const desc         = product.description
      ? product.description.slice(0, 80) + (product.description.length > 80 ? '…' : '')
      : '';

    return `
      <article class="product-card">
        <div class="card-image">
          <img src="${imageSrc}" alt="${product.name}" loading="lazy" />
        </div>
        <div class="card-body">
          <p class="card-category">${categoryName}</p>
          <h3 class="card-name">${product.name}</h3>
          ${desc ? `<p class="card-desc">${desc}</p>` : ''}
          <div class="card-footer">
            <p class="card-price">${fmt(product.price)}</p>
          </div>
          <a href="${waUrl(product)}" class="card-btn-wa" target="_blank" rel="noopener">
            🛒 Pesan via WhatsApp
          </a>
        </div>
      </article>`;
  }

  /* ---- render category chip ---- */
  function renderCategoryChip(cat) {
    return `<span class="category-chip">${cat.name}</span>`;
  }

  /* ---- fetch categories ---- */
  async function loadCategories() {
    try {
      const res  = await fetch(`${API}/categories`);
      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      const container = document.getElementById('category-list');
      if (!container) return;

      if (json.data.length === 0) {
        container.innerHTML = '<p style="color:var(--clr-text-muted)">Belum ada kategori.</p>';
        return;
      }
      container.innerHTML = json.data.map(renderCategoryChip).join('');
    } catch (err) {
      console.warn('Gagal load categories:', err.message);
    }
  }

  /* ---- fetch products ---- */
  async function loadProducts() {
    const gridId  = 'product-grid';
    const loadId  = 'products-loading';
    const statId  = 'products-status';

    // Tampilkan spinner saat mulai fetch
    show(loadId);

    try {
      const res  = await fetch(`${API}/products`);
      const json = await res.json();

      // Sembunyikan spinner setelah response diterima
      hide(loadId);

      if (!json.success) throw new Error(json.message);

      if (json.data.length === 0) {
        setStatus(statId, 'Belum ada produk tersedia.', true);
        return;
      }

      const grid = document.getElementById(gridId);
      if (grid) {
        grid.innerHTML = json.data.map(renderCard).join('');
        show(gridId);
      }

      // Status sukses ditampilkan setelah grid render
      setStatus(statId, `✅ ${json.data.length} produk ditemukan`);

    } catch (err) {
      // Pastikan spinner selalu disembunyikan meski error
      hide(loadId);
      setStatus(statId, `⚠️ Gagal memuat produk — pastikan backend berjalan di port 3001.`, true);
      console.error('Gagal load products:', err.message);
    }
  }

  /* ---- run ---- */
  await Promise.all([loadCategories(), loadProducts()]);
});
