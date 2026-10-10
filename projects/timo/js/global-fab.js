/* ===================================================
   global-fab.js — 글쓰기 FAB (홈 · 프로젝트 · 커뮤니티 공통)
   =================================================== */
const GlobalFab = (() => {
  const VISIBLE_PAGES = ['home', 'project-list', 'community'];
  let _isOpen = false;

  function openMenu() {
    document.getElementById('global-fab-menu')?.classList.add('is-open');
    document.getElementById('global-fab-backdrop')?.classList.add('is-open');
    document.getElementById('global-fab-main')?.classList.add('is-open');
    document.getElementById('global-fab-menu')?.setAttribute('aria-hidden', 'false');
    _isOpen = true;
  }

  function closeMenu() {
    document.getElementById('global-fab-menu')?.classList.remove('is-open');
    document.getElementById('global-fab-backdrop')?.classList.remove('is-open');
    document.getElementById('global-fab-main')?.classList.remove('is-open');
    document.getElementById('global-fab-menu')?.setAttribute('aria-hidden', 'true');
    _isOpen = false;
  }

  function toggleMenu() {
    _isOpen ? closeMenu() : openMenu();
  }

  /* 라우터의 페이지 전환마다 호출 — + 버튼이 필요한 화면에서만 노출 */
  function updateForPage(pageId) {
    const wrap = document.getElementById('global-fab-wrap');
    if (!wrap) return;
    closeMenu();
    wrap.classList.toggle('is-hidden', !VISIBLE_PAGES.includes(pageId));
  }

  function init() {
    document.getElementById('global-fab-main')?.addEventListener('click', toggleMenu);
    document.getElementById('global-fab-backdrop')?.addEventListener('click', closeMenu);

    document.getElementById('global-fab-project-btn')?.addEventListener('click', () => {
      closeMenu();
      Router.navigate('project-detail');
    });

    document.getElementById('global-fab-community-btn')?.addEventListener('click', () => {
      closeMenu();
      Router.navigate('community-write');
    });
  }

  return { init, updateForPage, closeMenu };
})();
