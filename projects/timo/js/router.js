/* ===================================================
   router.js — SPA 화면 전환 핵심 라우터
   =================================================== */

const NAV_HIDDEN_PAGES = [
  'onboarding-1', 'onboarding-2', 'onboarding-3',
  'login', 'signup',
  'quiz-1', 'quiz-2', 'quiz-3', 'quiz-result',
  'project-detail', 'project-apply', 'apply-complete',
  'community-post', 'community-write',
  'project-review', 'profile-review-more',
  'my-projects', 'my-written-reviews', 'saved-posts'
];

/* 탭 버튼 → 활성화 화면 매핑 */
const NAV_TAB_MAP = {
  home:      ['home'],
  project:   ['project-list'],
  community: ['community', 'community-post', 'community-detail', 'community-write'],
  mypage:    ['mypage', 'project-review', 'profile', 'profile-review', 'profile-review-more', 'my-projects', 'my-written-reviews', 'saved-posts']
};

/* 페이지별 페이드 애니메이션 (detail 페이지는 slide) */
const SLIDE_PAGES = [
  'project-detail', 'project-apply', 'apply-complete',
  'community-post', 'project-review'
];

const Router = {
  currentPage: null,

  /**
   * 화면 전환
   * @param {string} pageId  - data-page 값
   * @param {object} params  - 부가 데이터 (noHistory: true → pushState 생략)
   */
  navigate(pageId, params = {}) {
    const target = document.querySelector(`[data-page="${pageId}"]`);
    if (!target) {
      console.warn(`[Router] 페이지를 찾을 수 없습니다: ${pageId}`);
      return;
    }

    /* 이전 페이지 숨김 */
    const prev = document.querySelector('.page.is-active');
    if (prev) {
      prev.classList.remove('is-active');
    }

    /* 새 페이지 표시 */
    target.classList.add('is-active');

    /* 바텀 네비가 있는 페이지는 스크롤 패딩 클래스 추가 */
    const hasNav = !NAV_HIDDEN_PAGES.includes(pageId);
    target.classList.toggle('has-bottom-nav', hasNav);

    /* 바텀 네비 업데이트 */
    this._updateBottomNav(pageId);

    /* 글쓰기 FAB 노출 여부 업데이트 */
    if (typeof GlobalFab !== 'undefined') GlobalFab.updateForPage(pageId);

    /* history 업데이트 — noHistory여도 state는 채워야 뒤로가기 시 popstate.state가
       null로 빠져 _getInitialPage()로 강제 이동하는 문제가 생기지 않는다 */
    if (params.noHistory) {
      history.replaceState({ page: pageId }, '', `#${pageId}`);
    } else {
      history.pushState({ page: pageId }, '', `#${pageId}`);
    }

    /* 현재 페이지 갱신 */
    this.currentPage = pageId;

    /* 페이지별 init 함수 호출 */
    this._callPageInit(pageId, params);
  },

  /* 뒤로가기 */
  back() {
    history.back();
  },

  /* 라우터 초기화 (앱 시작 시 1회 호출) */
  async init() {
    /* 브라우저 뒤로가기/앞으로가기 처리 */
    window.addEventListener('popstate', async (e) => {
      const pageId = e.state?.page || await this._getInitialPage();
      this.navigate(pageId, { noHistory: true });
    });

    /* 초기 화면 결정 */
    const startPage = await this._getInitialPage();
    this.navigate(startPage, { noHistory: true });
  },

  /* 최초 진입 시 이동할 화면 결정 */
  async _getInitialPage() {
    const session = await API.auth.getSession();
    if (session) return 'home';
    return 'onboarding-1';
  },

  /* 바텀 네비 표시/숨김 + 활성 탭 */
  _updateBottomNav(pageId) {
    const nav = document.getElementById('bottom-nav');
    if (!nav) return;

    const hide = NAV_HIDDEN_PAGES.includes(pageId);
    nav.classList.toggle('is-hidden', hide);

    /* 활성 탭 업데이트 */
    document.querySelectorAll('.bottom-nav__item').forEach((item) => {
      const navKey = item.dataset.nav;
      const pages  = NAV_TAB_MAP[navKey] || [];
      item.classList.toggle('bottom-nav__item--active', pages.includes(pageId));
    });
  },

  /* 페이지별 init 함수 호출 */
  _callPageInit(pageId, params) {
    const moduleMap = {
      'onboarding-1':   () => typeof OnboardingPage !== 'undefined' && OnboardingPage.init(params),
      'onboarding-2':   () => typeof OnboardingPage !== 'undefined' && OnboardingPage.init(params),
      'onboarding-3':   () => typeof OnboardingPage !== 'undefined' && OnboardingPage.init(params),
      'login':          () => typeof AuthPage       !== 'undefined' && AuthPage.initLogin(params),
      'signup':         () => typeof AuthPage       !== 'undefined' && AuthPage.initSignup(params),
      'quiz-1':         () => typeof QuizPage       !== 'undefined' && QuizPage.init(1, params),
      'quiz-2':         () => typeof QuizPage       !== 'undefined' && QuizPage.init(2, params),
      'quiz-3':         () => typeof QuizPage       !== 'undefined' && QuizPage.init(3, params),
      'quiz-result':    () => typeof QuizPage       !== 'undefined' && QuizPage.initResult(params),
      'home':           () => typeof HomePage       !== 'undefined' && HomePage.init(params),
      'project-list':   () => typeof ProjectPage    !== 'undefined' && ProjectPage.initList(params),
      'project-detail': () => typeof ProjectPage    !== 'undefined' && ProjectPage.initDetail(params),
      'project-apply':  () => typeof ProjectPage    !== 'undefined' && ProjectPage.initApply(params),
      'apply-complete': () => typeof ProjectPage    !== 'undefined' && ProjectPage.initComplete(params),
      'community':          () => typeof CommunityPage !== 'undefined' && CommunityPage.init(params),
      'community-post':     () => typeof CommunityPage !== 'undefined' && CommunityPage.initPost(params),
      'community-detail':   () => typeof CommunityPage !== 'undefined' && CommunityPage.initPost(params),
      'community-write':    () => typeof CommunityPage !== 'undefined' && CommunityPage.initWrite(params),
      'mypage':             () => typeof MyPage        !== 'undefined' && MyPage.init(params),
      'project-review':     () => typeof MyPage        !== 'undefined' && MyPage.initReview(params),
      'my-projects':        () => typeof MyPage        !== 'undefined' && MyPage.initProjects(params),
      'my-written-reviews': () => typeof MyPage        !== 'undefined' && MyPage.initWrittenReviews(params),
      'saved-posts':        () => typeof MyPage        !== 'undefined' && MyPage.initSavedPosts(params),
      'profile':            () => typeof ProfilePage   !== 'undefined' && ProfilePage.init(params),
      'profile-review':     () => typeof ProfilePage   !== 'undefined' && ProfilePage.initReview(params),
      'profile-review-more':() => typeof ReviewPage    !== 'undefined' && ReviewPage.init(params),
    };

    const fn = moduleMap[pageId];
    if (fn) fn();
  }
};
