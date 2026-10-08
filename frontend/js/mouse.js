'use strict';

/* ============================================================
   JOSSGANDOS STORE — Mouse Detail
   js/mouse.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const product = {
    name: 'Mouse Jossgandos',
    price: 199000,
    colors: {
      hitam: { label: 'Hitam', image: '../assets/mouse-hitam.svg' },
      putih: { label: 'Putih', image: '../assets/mouse-putih.svg' },
    },
    stock: 15, minQty: 1, maxQty: 15,
  };

  const WA_NUMBER = '6281234567890';

  const state = { selectedColor: null, quantity: 1 };

  const $ = (id) => document.getElementById(id);
  const productImage       = $('product-image');
  const thumbBtns          = document.querySelectorAll('.thumb-btn');
  const colorBtns          = document.querySelectorAll('.color-btn');
  const colorSelectedLabel = $('color-selected-label');
  const qtyDecrease        = $('qty-decrease');
  const qtyIncrease        = $('qty-increase');
  const qtyValue           = $('qty-value');
  const summaryColor       = $('summary-color');
  const summaryQty         = $('summary-qty');
  const summaryTotal       = $('summary-total');
  const btnConfirm         = $('btn-confirm');
  const confirmHint        = $('confirm-hint');
  const confirmationMsg    = $('confirmation-message');
  const confirmationText   = $('confirmation-text');
  const footerYear         = $('footer-year');
  const tabBtns            = document.querySelectorAll('.tab-btn');
  const tabPanels          = document.querySelectorAll('.tab-panel');

  const fmt = (n) => 'Rp' + n.toLocaleString('id-ID');
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  let lastColor = null;

  function render() {
    if (state.selectedColor && state.selectedColor !== lastColor) {
      const c = product.colors[state.selectedColor];
      lastColor = state.selectedColor;
      productImage.classList.add('swapping');
      setTimeout(() => {
        productImage.src = c.image;
        productImage.alt = `Mouse Jossgandos warna ${c.label}`;
        productImage.classList.remove('swapping');
      }, 200);
    }
    colorBtns.forEach(b => {
      const active = b.dataset.color === state.selectedColor;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    thumbBtns.forEach(b => {
      const active = b.dataset.color === state.selectedColor;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    colorSelectedLabel.textContent = state.selectedColor
      ? product.colors[state.selectedColor].label : 'Belum dipilih';
    colorSelectedLabel.classList.toggle('selected', !!state.selectedColor);

    qtyValue.textContent = state.quantity;
    qtyDecrease.disabled = state.quantity <= product.minQty;
    qtyIncrease.disabled = state.quantity >= product.maxQty;

    summaryColor.textContent = state.selectedColor ? product.colors[state.selectedColor].label : '—';
    summaryQty.textContent   = state.quantity;
    summaryTotal.textContent = fmt(product.price * state.quantity);

    const canOrder = !!state.selectedColor;
    btnConfirm.disabled = !canOrder;
    btnConfirm.setAttribute('aria-disabled', String(!canOrder));
    confirmHint.textContent = canOrder
      ? 'Tekan tombol untuk memesan via WhatsApp.'
      : 'Pilih warna terlebih dahulu.';
  }

  function clearConfirmation() {
    if (confirmationMsg && !confirmationMsg.hidden) {
      confirmationMsg.hidden = true;
      confirmationText.textContent = '';
    }
  }

  colorBtns.forEach(b => b.addEventListener('click', () => {
    if (state.selectedColor === b.dataset.color) return;
    state.selectedColor = b.dataset.color; clearConfirmation(); render();
  }));
  thumbBtns.forEach(b => b.addEventListener('click', () => {
    if (state.selectedColor === b.dataset.color) return;
    state.selectedColor = b.dataset.color; clearConfirmation(); render();
  }));
  qtyDecrease.addEventListener('click', () => {
    if (state.quantity <= product.minQty) return;
    state.quantity--; clearConfirmation(); render();
  });
  qtyIncrease.addEventListener('click', () => {
    if (state.quantity >= product.maxQty) return;
    state.quantity++; clearConfirmation(); render();
  });

  btnConfirm.addEventListener('click', () => {
    if (btnConfirm.disabled) return;
    const colorLabel = product.colors[state.selectedColor].label;
    const total      = fmt(product.price * state.quantity);
    const msg = encodeURIComponent(
      `Halo Jossgandos! Saya ingin memesan:\n*Mouse Jossgandos*\nWarna: ${colorLabel}\nJumlah: ${state.quantity}\nTotal: ${total}\n\nMohon konfirmasi pesanan.`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');

    if (confirmationMsg) {
      confirmationText.textContent = `Pesanan diteruskan ke WhatsApp: ${colorLabel}, ${state.quantity} item. Total ${total}.`;
      confirmationMsg.hidden = false;
    }
  });

  tabBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => activateTab(i));
    btn.addEventListener('keydown', (e) => {
      let t = null;
      if (e.key === 'ArrowRight') t = (i + 1) % tabBtns.length;
      else if (e.key === 'ArrowLeft')  t = (i - 1 + tabBtns.length) % tabBtns.length;
      else if (e.key === 'Home') t = 0;
      else if (e.key === 'End')  t = tabBtns.length - 1;
      if (t !== null) { e.preventDefault(); activateTab(t); tabBtns[t].focus(); }
    });
  });
  function activateTab(idx) {
    tabBtns.forEach((b, i) => {
      const a = i === idx;
      b.classList.toggle('active', a);
      b.setAttribute('aria-selected', String(a));
      b.tabIndex = a ? 0 : -1;
    });
    tabPanels.forEach((p, i) => { p.hidden = i !== idx; });
  }

  render();
});
