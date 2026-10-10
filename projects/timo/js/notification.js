/* ===================================================
   notification.js — 알림 팝오버 (홈/마이페이지 공유)
   =================================================== */
const NotificationPopover = (() => {
  let _isOpen = false;

  function open() {
    const overlay = document.getElementById('notif-overlay');
    const popover = document.getElementById('notif-popover');
    if (!overlay || !popover) return;

    overlay.classList.add('is-visible');
    overlay.setAttribute('aria-hidden', 'false');
    popover.classList.add('is-visible');
    popover.setAttribute('aria-hidden', 'false');
    _isOpen = true;
  }

  function close() {
    const overlay = document.getElementById('notif-overlay');
    const popover = document.getElementById('notif-popover');
    if (!overlay || !popover) return;

    overlay.classList.remove('is-visible');
    overlay.setAttribute('aria-hidden', 'true');
    popover.classList.remove('is-visible');
    popover.setAttribute('aria-hidden', 'true');
    _isOpen = false;
  }

  function toggle() {
    _isOpen ? close() : open();
  }

  function init() {
    /* 오버레이 클릭 → 닫기 */
    document.getElementById('notif-overlay')?.addEventListener('click', close);

    /* X 버튼 클릭 → 닫기 */
    document.getElementById('notif-popover')?.addEventListener('click', (e) => {
      if (e.target.closest('.notif-popover__close')) close();
    });

    /* ESC 키 → 닫기 */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && _isOpen) close();
    });

    /* 알림 버튼 (모든 페이지 공통 — 이벤트 위임) */
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action="open-notification"]');
      if (!btn) return;
      e.stopPropagation();
      toggle();
    });
  }

  return { open, close, toggle, init };
})();
