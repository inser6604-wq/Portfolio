/* ===================================================
   review.js — 리뷰 더보기 화면
   =================================================== */

const ReviewPage = {

  init(params = {}) {
    this._renderPersonalityBadge();
    this._bindBack();
  },

  _renderPersonalityBadge() {
    const el = document.querySelector('[data-page="profile-review-more"] .prv-profile__type-badge');
    if (!el) return;
    const labels = {
      planner:      '📅 계획러',
      executor:     '🚀 실행러',
      analyst:      '🔍 분석러',
      communicator: '💬 소통러',
    };
    const label = labels[Storage.get('quiz_result')];
    if (label) el.textContent = label;
  },

  _bindBack() {
    const section = document.querySelector('[data-page="profile-review-more"]');
    const btn = section?.querySelector('[data-action="back"]');
    if (btn) {
      btn.addEventListener('click', () => Router.back());
    }
  }
};
