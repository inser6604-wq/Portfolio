/* ===================================================
   profile.js — 프로필 / 프로필 리뷰 화면
   =================================================== */

const ProfilePage = {

  init(params = {}) {
    /* profile 화면 초기화 — Phase 6에서 구현 */
  },

  initReview(params = {}) {
    /* profile-review 화면 초기화 — Phase 6에서 구현 */
    this._bindReviewBackEvent();
  },

  _bindReviewBackEvent() {
    const section = document.querySelector('[data-page="profile-review"]');
    section?.querySelector('[data-action="back"]')?.addEventListener('click', () => {
      Router.back();
    });
  }
};
