/* ===================================================
  common.js — 공통 유틸리티
   =================================================== */

/* ── 로컬스토리지 래퍼 ── */

const Storage = {
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return null;
    }
  },
  set(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  },
  remove(key) {
    localStorage.removeItem(key);
  }
};

/* ── 토스트 ── */

let _toastTimer = null;

function showToast(message, type = 'success', duration = 2500) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  if (_toastTimer) {
    clearTimeout(_toastTimer);
    toast.classList.remove('is-visible', 'toast--success', 'toast--error', 'toast--info');
  }

  toast.textContent = message;
  toast.className = `toast toast--${type}`;

  requestAnimationFrame(() => {
    toast.classList.add('is-visible');
  });

  _toastTimer = setTimeout(() => {
    toast.classList.remove('is-visible');
    _toastTimer = null;
  }, duration);
}

/* ── 모달 ── */

function openModal({ title = '', message = '', confirmText = '확인', cancelText = '취소', onConfirm = null } = {}) {
  const modal = document.getElementById('modal');
  if (!modal) return;

  modal.querySelector('.modal__title').textContent   = title;
  modal.querySelector('.modal__message').textContent = message;

  const confirmBtn = modal.querySelector('.modal__confirm');
  const cancelBtn  = modal.querySelector('.modal__cancel');

  confirmBtn.textContent = confirmText;
  cancelBtn.textContent  = cancelText;

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    closeModal();
    confirmBtn.removeEventListener('click', handleConfirm);
  };

  confirmBtn.addEventListener('click', handleConfirm);
  modal.querySelector('.modal__overlay').addEventListener('click', closeModal, { once: true });
  cancelBtn.addEventListener('click', closeModal, { once: true });

  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'true');
}

/* ── 바텀시트 ── */

function openBottomSheet(options = []) {
  const sheet = document.getElementById('bottom-sheet');
  if (!sheet) return;

  const list = sheet.querySelector('.bottom-sheet__list');
  if (list) {
    list.innerHTML = options
      .map(opt => `<button class="bottom-sheet__option" data-value="${opt.value}">${opt.label}</button>`)
      .join('');
  }

  sheet.classList.add('is-open');
  document.getElementById('bottom-sheet-overlay')?.classList.add('is-visible');
}

function closeBottomSheet() {
  document.getElementById('bottom-sheet')?.classList.remove('is-open');
  document.getElementById('bottom-sheet-overlay')?.classList.remove('is-visible');
}

/* ── 날짜 포맷 ── */

function formatDate(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  const now  = new Date();
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60)     return '방금 전';
  if (diff < 3600)   return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400)  return `${Math.floor(diff / 3600)}시간 전`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}일 전`;

  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}

function formatDeadline(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

/* ── 디바운스 ── */

function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/* ── DOM 유틸 ── */

function qs(selector, context = document) {
  return context.querySelector(selector);
}

function qsa(selector, context = document) {
  return [...context.querySelectorAll(selector)];
}
