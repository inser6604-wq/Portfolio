/* ===================================================
   mypage.js — 마이페이지
   =================================================== */

/* ── 참여 중인 프로젝트 목 데이터 ── */
const MY_PROJECTS_DATA = [
  {
    id: 'mp-1',
    icon: '🤖',
    iconColor: 'green',
    name: 'AI 기반 운동 루틴 추천 서비스',
    category: '해커톤',
    role: '디자이너',
    deadline: 'D - 3',
    deadlineType: 'urgent',
    status: '진행중',
    teamSize: '4명',
    duration: '3개월',
    desc: 'AI를 활용해 개인 맞춤형 운동 루틴을 추천하는 헬스케어 서비스. 건강 데이터 분석 및 사용자 친화적 UI 구현이 목표.'
  },
  {
    id: 'mp-2',
    icon: '📱',
    iconColor: 'orange',
    name: '캠퍼스 커뮤니티 플랫폼',
    category: '사이드 프로젝트',
    role: '디자이너',
    deadline: 'D - 8',
    deadlineType: 'normal',
    status: '진행중',
    teamSize: '3명',
    duration: '4개월',
    desc: '대학 캠퍼스 내 학생들이 자유롭게 소통하고 프로젝트를 공유할 수 있는 커뮤니티 플랫폼. 구인·구직 기능도 제공.'
  },
  {
    id: 'mp-3',
    icon: '💡',
    iconColor: 'purple',
    name: '소셜 커머스 플랫폼 MVP',
    category: '사이드 프로젝트',
    role: '디자이너',
    deadline: 'D - 30',
    deadlineType: 'normal',
    status: '진행중',
    teamSize: '4명',
    duration: '5개월',
    desc: '소셜 기능을 결합한 커머스 플랫폼 MVP. 사용자 경험을 최우선으로 하는 쇼핑 경험 구현을 목표로 진행 중.'
  },
  {
    id: 'mp-4',
    icon: '🌐',
    iconColor: 'green',
    name: '스마트시티 솔루션 공모전',
    category: '공모전',
    role: '디자이너',
    deadline: 'D - 14',
    deadlineType: 'normal',
    status: '진행중',
    teamSize: '5명',
    duration: '2개월',
    desc: 'IoT 센서 데이터를 활용한 스마트시티 솔루션을 제안하는 공모전. 데이터 시각화 및 UX 설계를 담당 중.'
  },
  {
    id: 'mp-5',
    icon: '📊',
    iconColor: 'orange',
    name: '교육 플랫폼 MVP 개발',
    category: '사이드 프로젝트',
    role: '디자이너',
    deadline: 'D - 45',
    deadlineType: 'normal',
    status: '진행중',
    teamSize: '3명',
    duration: '3개월',
    desc: '온라인 학습 경험을 혁신하는 교육 플랫폼 MVP. 학습자 중심의 인터페이스 설계와 콘텐츠 구성에 집중하고 있다.'
  }
];

/* ── 내가 작성한 리뷰 목 데이터 ── */
const MY_WRITTEN_REVIEWS_DATA = [
  {
    id: 'wr-1',
    targetName: '이지은',
    targetInitial: '이',
    avatarClass: 'wrvw-card__avatar--cyan',
    targetRole: '백엔드 개발자',
    rating: 5,
    text: '정말 열심히 해주셨어요! 백엔드 구조를 깔끔하게 잡아주셔서 개발 속도가 많이 빨라졌습니다. 함께 해서 영광이었어요.',
    project: 'AI 기반 운동 루틴 추천 서비스',
    date: '2026.04'
  },
  {
    id: 'wr-2',
    targetName: '박준형',
    targetInitial: '박',
    avatarClass: 'wrvw-card__avatar--primary',
    targetRole: '프론트엔드 개발자',
    rating: 4,
    text: '코드 리뷰도 꼼꼼하게 해주시고 기술적인 부분에서 많이 배웠습니다. 항상 긍정적인 에너지로 팀 분위기를 끌어올려줬어요. 다음에도 함께 하고 싶어요!',
    project: '캠퍼스 커뮤니티 플랫폼',
    date: '2026.03'
  },
  {
    id: 'wr-3',
    targetName: '최유나',
    targetInitial: '최',
    avatarClass: 'wrvw-card__avatar--purple',
    targetRole: '기획자',
    rating: 5,
    text: '기획 단계에서 모든 케이스를 꼼꼼하게 정리해주셔서 개발 중 혼선이 없었어요. 덕분에 프로젝트가 순조롭게 진행됐습니다. 진짜 최고예요!',
    project: '소셜 커머스 플랫폼 MVP',
    date: '2026.02'
  },
  {
    id: 'wr-4',
    targetName: '정하윤',
    targetInitial: '정',
    avatarClass: 'wrvw-card__avatar--primary',
    targetRole: '디자이너',
    rating: 5,
    text: '디자인 완성도가 정말 높았고, 개발자 입장에서 구현하기 쉽게 정리해주셨어요. 항상 피드백을 빠르게 반영해주셔서 감사했습니다.',
    project: 'AI 기반 운동 루틴 추천 서비스',
    date: '2026.01'
  },
  {
    id: 'wr-5',
    targetName: '한소현',
    targetInitial: '한',
    avatarClass: 'wrvw-card__avatar--cyan',
    targetRole: '프론트엔드 개발자',
    rating: 4,
    text: '코드 퀄리티가 매우 높고 데드라인을 잘 지켜줬어요. 팀원들과 소통도 원활해서 협업이 즐거웠습니다!',
    project: '스마트시티 솔루션 공모전',
    date: '2025.12'
  },
  {
    id: 'wr-6',
    targetName: '김준서',
    targetInitial: '김',
    avatarClass: 'wrvw-card__avatar--primary',
    targetRole: '백엔드 개발자',
    rating: 5,
    text: 'API 설계가 탁월했고 문서화도 꼼꼼하게 해주셔서 프론트 연동이 수월했어요. 진짜 실력자세요!',
    project: '교육 플랫폼 MVP 개발',
    date: '2025.11'
  },
  {
    id: 'wr-7',
    targetName: '이수빈',
    targetInitial: '이',
    avatarClass: 'wrvw-card__avatar--purple',
    targetRole: '디자이너',
    rating: 5,
    text: '감각적인 디자인과 빠른 피드백 반영으로 프로젝트 완성도를 높여줬어요. 다음에도 꼭 같이 하고 싶습니다!',
    project: 'AI 기반 운동 루틴 추천 서비스',
    date: '2025.10'
  },
  {
    id: 'wr-8',
    targetName: '박진우',
    targetInitial: '박',
    avatarClass: 'wrvw-card__avatar--cyan',
    targetRole: '기획자',
    rating: 4,
    text: '기획서를 체계적으로 작성해줘서 프로젝트 방향이 명확했어요. 팀원들을 잘 이끌어줘서 감사했어요.',
    project: '캠퍼스 커뮤니티 플랫폼',
    date: '2025.09'
  }
];

/* ── 성향별 추천 툴 데이터 (추후 DB 연동 시 이 객체만 교체) ── */
const RESULT_TOOLS = {
  planner:      ['Notion', 'Google Calendar', 'Slack'],
  executor:     ['GitHub', 'VS Code', 'Discord'],
  analyst:      ['Excel', 'FigJam', 'Miro'],
  communicator: ['Figma', 'React', 'Slack'],
};

/* ── 성향 타입 라벨 ── */
const RESULT_TYPE_LABELS = {
  planner:      '📅 계획러',
  executor:     '🚀 실행러',
  analyst:      '🔍 분석러',
  communicator: '💬 소통러',
};

const MyPage = {

  init(params = {}) {
    this._bindStats();
    this._bindProjectMore();
    this._updateSavedPostsCount();
    this._bindMyPcardClick();
    this._bindLogout();
    this._renderPersonalityBadge('.myp-profile__type-badge');
    this._renderPersonalityTools();
    this._animateMyPage();
  },

  initReview(params = {}) {
    this._renderPersonalityBadge('[data-page="project-review"] .prv-profile__type-badge');
    this._bindReviewBack();
    this._bindTagMore();
    this._animatePageIn('[data-page="project-review"] .prv-page');
  },

  initProjects(params = {}) {
    this._renderMyProjects();
    this._bindMyProjectsBack();
    this._animatePageIn('[data-page="my-projects"] .myproj-page');
  },

  initWrittenReviews(params = {}) {
    this._renderWrittenReviews();
    this._bindWrittenReviewsBack();
    this._animatePageIn('[data-page="my-written-reviews"] .wrvw-page');
  },

  initSavedPosts(params = {}) {
    this._renderSavedPostsPage();
    this._bindSavedPostsBack();
    this._animatePageIn('[data-page="saved-posts"] .svdp-page');
  },

  /* 통계 버튼 → 페이지 이동 */
  _bindStats() {
    document.querySelectorAll('[data-myp-stat]').forEach(btn => {
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);
      newBtn.addEventListener('click', () => {
        const target = newBtn.dataset.mypStat;
        if (target === 'saved-posts') {
          Router.navigate('saved-posts');
        } else if (target === 'received-review') {
          Router.navigate('project-review');
        } else if (target === 'written-review') {
          Router.navigate('my-written-reviews');
        }
      });
    });
  },

  /* 저장한 게시글 카운트 업데이트 */
  _updateSavedPostsCount() {
    const btn = document.querySelector('[data-myp-stat="saved-posts"]');
    if (!btn) return;
    const numEl = btn.querySelector('.myp-stats__num');
    if (!numEl) return;
    const count = typeof CommunityPage !== 'undefined' ? CommunityPage.getSavedPosts().length : 0;
    numEl.textContent = count;
  },

  /* "더보기" 버튼 → 참여 프로젝트 전체 화면 */
  _bindProjectMore() {
    const btn = document.querySelector('[data-action="go-my-projects"]');
    if (btn) {
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);
      newBtn.addEventListener('click', () => Router.navigate('my-projects'));
    }
  },

  /* 마이페이지 미리보기 카드 클릭 → 프로젝트 상세 */
  _bindMyPcardClick() {
    const section = document.querySelector('[data-page="mypage"]');
    section?.querySelectorAll('.myp-pcard').forEach((card, idx) => {
      const proj = MY_PROJECTS_DATA[idx];
      if (!proj) return;
      const newCard = card.cloneNode(true);
      card.parentNode.replaceChild(newCard, card);
      newCard.style.cursor = 'pointer';
      newCard.addEventListener('click', () => this._goToProjectDetail(proj));
    });
  },

  _goToProjectDetail(proj) {
    Router.navigate('project-detail', {
      project: {
        id: proj.id,
        title: proj.name,
        category: proj.category,
        status: 'open',
        description: proj.desc,
        deadlineLabel: proj.deadline,
        teamSizeRange: proj.teamSize,
        durationLabel: proj.duration,
        roles: [{ name: proj.role, status: '참여 중' }],
        applicants: 0
      }
    });
  },

  /* 성향 배지 업데이트 */
  _renderPersonalityBadge(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    const quizResult = Storage.get('quiz_result');
    const label = RESULT_TYPE_LABELS[quizResult];
    if (label) el.textContent = label;
  },

  /* 성향 추천 툴 렌더링 */
  _renderPersonalityTools() {
    const profileTop = document.querySelector('.myp-profile__top');
    if (!profileTop) return;

    const existing = profileTop.parentNode.querySelector('.myp-tools');
    if (existing) existing.remove();

    const quizTools = Storage.get('quiz_tools');
    const tools = (quizTools && quizTools.length > 0)
      ? quizTools
      : (RESULT_TOOLS[Storage.get('quiz_result')] || RESULT_TOOLS.planner);

    const wrap = document.createElement('div');
    wrap.className = 'myp-tools';
    wrap.innerHTML = `
      <div class="myp-tools__chips">
        ${tools.map(t => `<span class="myp-tools__chip">${t}</span>`).join('')}
      </div>`;

    profileTop.insertAdjacentElement('afterend', wrap);
  },

  /* 프로필 카드 클릭 이벤트 없음 — 상단은 클릭 영역 아님 */
  _bindProfileClick() {},

  /* 프로젝트 리뷰 뒤로가기 */
  _bindReviewBack() {
    const section = document.querySelector('[data-page="project-review"]');
    const btn = section?.querySelector('[data-action="back"]');
    if (btn) {
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);
      newBtn.addEventListener('click', () => Router.back());
    }
  },

  /* +2 태그 더보기 */
  _bindTagMore() {
    const moreBtn = document.getElementById('prv-tag-more-btn');
    const hiddenRow = document.getElementById('prv-tags-hidden');
    if (moreBtn && hiddenRow) {
      const newBtn = moreBtn.cloneNode(true);
      moreBtn.parentNode.replaceChild(newBtn, moreBtn);
      newBtn.addEventListener('click', () => {
        hiddenRow.style.display = 'flex';
        newBtn.style.display = 'none';
      });
    }
  },

  /* 저장한 게시글 렌더링 */
  _renderSavedPosts() {
    if (typeof CommunityPage === 'undefined') return;
    const saved = CommunityPage.getSavedPosts();
    const section = document.getElementById('myp-saved-section');
    const container = document.getElementById('myp-saved-list');
    if (!section || !container) return;

    if (saved.length === 0) {
      section.style.display = 'none';
      return;
    }

    section.style.display = 'block';
    container.innerHTML = saved.map(post => `
      <div class="myp-saved-card" data-post-id="${post.id}" role="button" tabindex="0" aria-label="${post.title}">
        <span class="myp-saved-card__badge myp-saved-card__badge--${post.badge}">${post.badgeLabel}</span>
        <p class="myp-saved-card__title">${post.title}</p>
        <p class="myp-saved-card__meta">${post.author} · ${post.time}</p>
      </div>`).join('');

    container.querySelectorAll('.myp-saved-card').forEach(card => {
      const handler = () => {
        const postId = Number(card.dataset.postId);
        Router.navigate('community-post', { postId });
      };
      card.addEventListener('click', handler);
      card.addEventListener('keydown', e => { if (e.key === 'Enter') handler(); });
    });
  },

  /* 참여 프로젝트 전체 화면 렌더링 */
  _renderMyProjects() {
    const container = document.getElementById('my-projects-list');
    if (!container) return;

    container.innerHTML = MY_PROJECTS_DATA.map(p => `
      <div class="myproj-card" data-proj-id="${p.id}" role="button" tabindex="0" style="cursor:pointer;">
        <div class="myproj-card__top">
          <div class="myproj-card__icon myproj-card__icon--${p.iconColor}">${p.icon}</div>
          <div class="myproj-card__meta">
            <p class="myproj-card__category">${p.category}</p>
            <p class="myproj-card__name">${p.name}</p>
            <span class="myproj-card__role">${p.role}</span>
          </div>
        </div>
        <div class="myproj-card__divider"></div>
        <div class="myproj-card__info-row">
          <div class="myproj-card__badges">
            <span class="myproj-card__deadline myproj-card__deadline--${p.deadlineType}">${p.deadline}</span>
            <span class="myproj-card__status">● ${p.status}</span>
          </div>
        </div>
        <div class="myproj-card__stats-row">
          <span class="myproj-card__stat">팀원 <strong>${p.teamSize}</strong></span>
          <span class="myproj-card__stat">기간 <strong>${p.duration}</strong></span>
        </div>
        <p class="myproj-card__desc">${p.desc}</p>
      </div>`).join('');

    container.querySelectorAll('.myproj-card').forEach(card => {
      const proj = MY_PROJECTS_DATA.find(p => p.id === card.dataset.projId);
      if (!proj) return;
      const handler = () => this._goToProjectDetail(proj);
      card.addEventListener('click', handler);
      card.addEventListener('keydown', e => { if (e.key === 'Enter') handler(); });
    });

    /* 카드 등장 애니메이션 (아래 → 위, 순차) */
    container.querySelectorAll('.myproj-card').forEach((el, i) => {
      el.style.animationDelay = `${0.1 + i * 0.08}s`;
      el.classList.add('myp-fade-up');
    });
  },

  _bindMyProjectsBack() {
    const section = document.querySelector('[data-page="my-projects"]');
    const btn = section?.querySelector('[data-action="back"]');
    if (!btn) return;
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    newBtn.addEventListener('click', () => Router.back());
  },

  /* 작성 리뷰 화면 렌더링 */
  _renderWrittenReviews() {
    const container = document.getElementById('written-reviews-list');
    if (!container) return;

    const starsHtml = (rating) =>
      Array.from({ length: 5 }, (_, i) =>
        `<span class="wrvw-card__star">${i < rating ? '⭐' : '☆'}</span>`).join('');

    container.innerHTML = `
      <p class="wrvw-summary">총 ${MY_WRITTEN_REVIEWS_DATA.length}개의 리뷰를 작성했어요.</p>
      ${MY_WRITTEN_REVIEWS_DATA.map(r => `
        <div class="wrvw-card">
          <div class="wrvw-card__top">
            <img src="assets/icons/profile.svg" alt="프로필" class="wrvw-card__avatar wrvw-card__avatar--img" />
            <div class="wrvw-card__info">
              <p class="wrvw-card__name">김티모</p>
              <p class="wrvw-card__role-project">디자이너 · ${r.date}</p>
            </div>
          </div>
          <div class="wrvw-card__stars">${starsHtml(r.rating)}</div>
          <p class="wrvw-card__text">${r.text}</p>
          <span class="wrvw-card__project-tag">📁 ${r.project}</span>
        </div>`).join('')}`;

    /* 카드 등장 애니메이션 */
    container.querySelectorAll('.wrvw-card').forEach((el, i) => {
      el.style.animationDelay = `${0.1 + i * 0.07}s`;
      el.classList.add('myp-fade-up');
    });
  },

  _bindWrittenReviewsBack() {
    const section = document.querySelector('[data-page="my-written-reviews"]');
    const btn = section?.querySelector('[data-action="back"]');
    if (!btn) return;
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    newBtn.addEventListener('click', () => Router.back());
  },

  /* 저장한 게시글 전체화면 렌더링 */
  _renderSavedPostsPage() {
    const container = document.getElementById('saved-posts-list');
    if (!container) return;

    const saved = typeof CommunityPage !== 'undefined' ? CommunityPage.getSavedPosts() : [];

    if (saved.length === 0) {
      container.innerHTML = '<p class="svdp-empty">아직 저장한 게시글이 없어요.</p>';
      return;
    }

    container.innerHTML = saved.map(post => `
      <div class="svdp-card" data-post-id="${post.id}" role="button" tabindex="0" aria-label="${post.title}">
        <span class="svdp-card__badge svdp-card__badge--${post.badge}">${post.badgeLabel}</span>
        <p class="svdp-card__title">${post.title}</p>
        <p class="svdp-card__meta">${post.author} · ${post.time}</p>
      </div>`).join('');

    container.querySelectorAll('.svdp-card').forEach(card => {
      const handler = () => {
        const postId = Number(card.dataset.postId);
        if (typeof CommunityPage !== 'undefined') CommunityPage.setCurrentPost(postId);
        Router.navigate('community-post', { postId });
      };
      card.addEventListener('click', handler);
      card.addEventListener('keydown', e => { if (e.key === 'Enter') handler(); });
    });

    /* 카드 등장 애니메이션 */
    container.querySelectorAll('.svdp-card').forEach((el, i) => {
      el.style.animationDelay = `${0.1 + i * 0.08}s`;
      el.classList.add('myp-fade-up');
    });
  },

  _bindSavedPostsBack() {
    const section = document.querySelector('[data-page="saved-posts"]');
    const btn = section?.querySelector('[data-action="back"]');
    if (!btn) return;
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    newBtn.addEventListener('click', () => Router.back());
  },

  _bindLogout() {
    const btn = document.getElementById('myp-logout-btn');
    if (!btn) return;
    btn.addEventListener('click', async () => {
      await API.auth.logout();
      Storage.remove('session');
      Router.navigate('login', { noHistory: true });
    });
  },

  /* 마이페이지 메인 요소 순차 등장 애니메이션 */
  _animateMyPage() {
    const page = document.querySelector('[data-page="mypage"]');
    if (!page) return;

    const animate = (el, delay) => {
      if (!el) return;
      el.classList.remove('myp-fade-up');
      void el.offsetWidth;
      el.style.animationDelay = `${delay}s`;
      el.classList.add('myp-fade-up');
    };

    /* 1. 프로필 상단 */
    animate(page.querySelector('.myp-profile'), 0);

    /* 2. 통계 3개 (왼쪽부터 하나씩) */
    page.querySelectorAll('.myp-stats__item').forEach((el, i) => {
      animate(el, 0.12 + i * 0.08);
    });

    /* 3. 참여 중인 프로젝트 카드 (위에서부터 아래로 하나씩) */
    page.querySelectorAll('.myp-pcard').forEach((el, i) => {
      animate(el, 0.3 + i * 0.08);
    });
  },

  /* 상세 페이지 슬라이드인 애니메이션 */
  _animatePageIn(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    el.classList.remove('myp-page-in');
    void el.offsetWidth;
    el.classList.add('myp-page-in');
  }
};
