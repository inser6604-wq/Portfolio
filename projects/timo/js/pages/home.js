/* ===================================================
   home.js — 홈 화면
   =================================================== */

/*
 * js/api.js가 이미 전역 SAMPLE_PROJECTS / SAMPLE_USER를 선언하고 있어
 * (다른 화면용, 구버전 스키마) 동일 이름으로 재선언하면 충돌한다.
 * 홈 화면 전용 Figma 검증 데이터는 IIFE로 격리하고 HomePage만 전역에 노출한다.
 */
(function () {
  const SAMPLE_USER = {
    id: 'user-001',
    name: '김티모',
    email: 'user@example.com',
    avatar: '#7fffd4',
    bio: '',
    skills: [],
    personalityType: '',
    myProjects: [],
    myApplications: [],
    bookmarks: [],
    hasUnreadNotification: true
  };

  /* TIMO는 공모전·프로젝트·해커톤·사이드 프로젝트·창업까지 다루는 팀 매칭
     플랫폼이라, 더미 데이터도 기획/개발/디자인/마케팅/영상/AI/창업 등
     여러 분야가 균형 있게 섞이도록 구성한다. isFeatured + bannerDesc가
     붙은 항목은 메인 배너 후보로도 함께 쓰인다(같은 프로젝트가 배너와
     팀원 모집 리스트에 동일하게 노출되도록 데이터를 하나로 합침). */
  const SAMPLE_PROJECTS = [
    {
      id: 'proj-101',
      title: '대한민국 아이디어 공모전',
      category: '공모전',
      status: 'open',
      description: '다양한 아이디어로 사회 문제를 해결하는 공모전입니다. 기획부터 발표까지 함께할 팀원을 찾아요.',
      deadlineLabel: '07.23',
      deadlineDday: 23,
      teamSizeRange: '3~5명',
      durationLabel: '2개월',
      roles: [
        { name: '기획', status: '모집 중' },
        { name: '아이디어', status: '모집 중' }
      ],
      author: { name: '김도윤', avatarColor: '#7fffd4', initial: '김' },
      applicants: 128,
      isFeatured: true,
      bannerDesc: '기획·아이디어 분야 팀원을 모집합니다.'
    },
    {
      id: 'proj-102',
      title: 'AI 서비스 해커톤',
      category: '해커톤',
      status: 'urgent',
      description: 'AI 기술을 활용한 서비스를 단기간에 구현하는 해커톤입니다.',
      deadlineLabel: '07.15',
      deadlineDday: 15,
      teamSizeRange: '4~6명',
      durationLabel: '3일',
      roles: [
        { name: 'AI', status: '모집 중' },
        { name: '개발', status: '모집 중' }
      ],
      author: { name: '이서준', avatarColor: '#7fffd4', initial: '이' },
      applicants: 84,
      isFeatured: true,
      bannerDesc: 'AI 기반 서비스를 함께 만들 팀원을 찾고 있어요.'
    },
    {
      id: 'proj-103',
      title: '스마트시티 공모전',
      category: '공모전',
      status: 'open',
      description: 'IoT·데이터를 활용해 도시 문제를 해결하는 아이디어를 제안하는 공모전입니다.',
      deadlineLabel: '07.12',
      deadlineDday: 12,
      teamSizeRange: '3~4명',
      durationLabel: '1개월',
      roles: [
        { name: '기획', status: '모집 중' },
        { name: '데이터', status: '모집 중' }
      ],
      author: { name: '박하은', avatarColor: '#b2ebf2', initial: '박' },
      applicants: 65,
      isFeatured: true,
      bannerDesc: '도시 문제 해결 아이디어를 함께 제안해보세요.'
    },
    {
      id: 'proj-104',
      title: '지역 관광 플랫폼 프로젝트',
      category: '프로젝트',
      emoji: '🧳',
      status: 'open',
      description: '지역 관광 정보를 한눈에 볼 수 있는 플랫폼을 함께 만들어요.',
      deadlineLabel: '상시모집',
      deadlineDday: null,
      teamSizeRange: '3~5명',
      durationLabel: '3개월',
      roles: [
        { name: '디자인', status: '모집 중' },
        { name: '개발', status: '모집 중' }
      ],
      author: { name: '최지우', avatarColor: '#7fffd4', initial: '최' },
      applicants: 41,
      isFeatured: true,
      bannerDesc: '실제 서비스를 제작할 팀원을 모집합니다.'
    },
    {
      id: 'proj-105',
      title: '창업 MVP 제작',
      category: '창업',
      status: 'open',
      description: '예비 창업팀의 MVP 제작을 함께할 팀원을 찾습니다.',
      deadlineLabel: '상시모집',
      deadlineDday: null,
      teamSizeRange: '2~4명',
      durationLabel: '4개월',
      roles: [
        { name: '창업', status: '모집 중' },
        { name: '기획', status: '모집 중' }
      ],
      author: { name: '정우진', avatarColor: '#e1e0ff', initial: '정' },
      applicants: 32,
      isFeatured: true,
      bannerDesc: '예비 창업팀과 함께 서비스를 만들어보세요.'
    },
    {
      id: 'proj-106',
      title: 'ESG 캠페인 프로젝트',
      category: '프로젝트',
      emoji: '🌱',
      status: 'open',
      description: '환경 문제 해결을 위한 ESG 캠페인을 기획하고 실행할 팀원을 모집합니다.',
      deadlineLabel: '07.20',
      deadlineDday: 20,
      teamSizeRange: '3~5명',
      durationLabel: '2개월',
      roles: [
        { name: '마케팅', status: '모집 중' },
        { name: '콘텐츠', status: '모집 중' }
      ],
      author: { name: '한소율', avatarColor: '#b2ebf2', initial: '한' },
      applicants: 56,
      isFeatured: true,
      bannerDesc: '환경 문제 해결을 위한 팀원을 찾습니다.'
    },
    {
      id: 'proj-107',
      title: '숏폼 콘텐츠 제작',
      category: '프로젝트',
      emoji: '🎬',
      status: 'open',
      description: 'SNS 채널을 위한 숏폼 콘텐츠를 기획하고 제작할 팀원을 찾아요.',
      deadlineLabel: '상시모집',
      deadlineDday: null,
      teamSizeRange: '2~3명',
      durationLabel: '1개월',
      roles: [
        { name: '영상', status: '모집 중' },
        { name: '콘텐츠', status: '모집 중' }
      ],
      author: { name: '윤서아', avatarColor: '#7fffd4', initial: '윤' },
      applicants: 19
    },
    {
      id: 'proj-108',
      title: '여행 플랫폼 제작',
      category: '사이드 프로젝트',
      status: 'open',
      description: '여행 일정을 손쉽게 공유하는 플랫폼을 함께 만들어갈 팀원을 찾습니다.',
      deadlineLabel: '07.18',
      deadlineDday: 18,
      teamSizeRange: '3~5명',
      durationLabel: '3개월',
      roles: [
        { name: '디자인', status: '모집 중' },
        { name: '개발', status: '모집 중' }
      ],
      author: { name: '강민재', avatarColor: '#b2ebf2', initial: '강' },
      applicants: 27
    },
    {
      id: 'proj-109',
      title: '모바일 게임 개발',
      category: '사이드 프로젝트',
      emoji: '🎮',
      status: 'open',
      description: '캐주얼 모바일 게임을 함께 만들어갈 팀원을 모집합니다.',
      deadlineLabel: '07.25',
      deadlineDday: 25,
      teamSizeRange: '4~6명',
      durationLabel: '4개월',
      roles: [
        { name: '게임', status: '모집 중' },
        { name: '개발', status: '모집 중' }
      ],
      author: { name: '오지훈', avatarColor: '#e1e0ff', initial: '오' },
      applicants: 38
    },
    {
      id: 'proj-110',
      title: '대학 축제 홍보 프로젝트',
      category: '프로젝트',
      emoji: '🎉',
      status: 'open',
      description: '대학 축제를 홍보할 콘텐츠와 디자인을 함께 제작할 팀원을 찾습니다.',
      deadlineLabel: '상시모집',
      deadlineDday: null,
      teamSizeRange: '3~6명',
      durationLabel: '1개월',
      roles: [
        { name: '마케팅', status: '모집 중' },
        { name: '디자인', status: '모집 중' },
        { name: '영상', status: '모집 중' }
      ],
      author: { name: '신예은', avatarColor: '#7fffd4', initial: '신' },
      applicants: 22
    }
  ];

  /* 메인 캐치카피 (앱 진입/새로고침마다 랜덤 노출) */
  const SAMPLE_TAGLINES = [
    '공모전부터 사이드 프로젝트까지,\n함께 성장할 팀원을 만나보세요.',
    '아이디어를 현실로 만드는\n가장 쉬운 팀 매칭 플랫폼'
  ];

  /* 인기 공모전 (정적 데모 데이터) */
  const SAMPLE_CONTESTS = [
    { id: 'contest-101', title: '대한민국 아이디어 공모전', organizer: '한국산업인력공단', category: '공모전', deadlineDday: 23, ddayUrgent: false, prizeLabel: '🏆 총상금 500만원', extraLabel: '대학생 가능', emoji: '💡', theme: 'purple' },
    { id: 'contest-102', title: '관광 콘텐츠 공모전', organizer: '한국관광공사', category: '공모전', deadlineDday: 18, ddayUrgent: false, prizeLabel: '🏆 대상 300만원', extraLabel: '영상 제출', emoji: '🧳', theme: 'green' },
    { id: 'contest-103', title: 'ESG 캠페인 공모전', organizer: '환경부', category: '공모전', deadlineDday: 30, ddayUrgent: false, prizeLabel: '🏆 최우수 400만원', extraLabel: '팀 참가 가능', emoji: '🌱', theme: 'green' },
    { id: 'contest-104', title: 'AI 서비스 공모전', organizer: '과학기술정보통신부', category: '공모전', deadlineDday: 14, ddayUrgent: true, prizeLabel: '🏆 대상 1,000만원', extraLabel: '온라인 진행', emoji: '🤖', theme: 'navy' },
    { id: 'contest-105', title: '광고·마케팅 공모전', organizer: '제일기획', category: '공모전', deadlineDday: 20, ddayUrgent: false, prizeLabel: '🏆 우수상 300만원', extraLabel: '대학생 가능', emoji: '📣', theme: 'purple' },
    { id: 'contest-106', title: '영상 UCC 공모전', organizer: '문화체육관광부', category: '공모전', deadlineDday: 25, ddayUrgent: false, prizeLabel: '🏆 대상 500만원', extraLabel: '개인 참가 가능', emoji: '🎬', theme: 'navy' },
    { id: 'contest-107', title: '창업 아이디어톤', organizer: '중소벤처기업부', category: '창업', deadlineDday: 10, ddayUrgent: true, prizeLabel: '🏆 사업화 지원금', extraLabel: '예비창업자 우대', emoji: '🚀', theme: 'orange' },
    { id: 'contest-108', title: '스마트시티 공모전', organizer: '국토교통부', category: '공모전', deadlineDday: 9, ddayUrgent: true, prizeLabel: '🏆 최우수 500만원', extraLabel: '팀 참가 가능', emoji: '🏙️', theme: 'navy' }
  ];

  /* 현재 가장 활발한 공모전 (정적 데모 데이터) */
  const SAMPLE_ACTIVE_CONTESTS = [
    { id: 'active-101', org: '삼성', title: '삼성 Solve for Tomorrow', prizeLabel: '1,500만원', theme: 'samsung' },
    { id: 'active-102', org: 'LG', title: 'LG AI Challenge', prizeLabel: '3,000만원', theme: 'lg' },
    { id: 'active-103', org: '현대', title: '현대자동차 아이디어톤', prizeLabel: '2,000만원', theme: 'hyundai' },
    { id: 'active-104', org: 'KB', title: 'KB 금융 아이디어 공모전', prizeLabel: '2,000만원', theme: 'kb' },
    { id: 'active-105', org: '국토', title: '국토교통부 스마트시티 챌린지', prizeLabel: '1,000만원', theme: 'molit' },
    { id: 'active-106', org: '문화', title: '문화콘텐츠 공모전', prizeLabel: '800만원', theme: 'culture' }
  ];

  /* 배너 카테고리 배지 색상 매핑 (project.js와 동일 패턴, home.css의 .cat-badge 재사용) */
  const CATEGORY_BADGE_CLASS = {
    '해커톤': 'cat-badge--hackathon',
    '공모전': 'cat-badge--contest',
    '프로젝트': 'cat-badge--project',
    '사이드 프로젝트': 'cat-badge--side',
    '창업': 'cat-badge--startup'
  };

  /* 카테고리 → 아이콘 박스 그라디언트 테마 매핑 (인기 공모전 카드와 공유) */
  const CATEGORY_THEME = {
    '해커톤': 'theme-purple',
    '공모전': 'theme-navy',
    '프로젝트': 'theme-blue',
    '사이드 프로젝트': 'theme-green',
    '창업': 'theme-orange'
  };

  const CATEGORY_EMOJI = {
    '해커톤': '🤖',
    '공모전': '🌆',
    '프로젝트': '📁',
    '사이드 프로젝트': '🛒',
    '창업': '🚀'
  };

  const RECRUIT_INITIAL_COUNT = 3;

  const HomePage = {
    state: {
      category: 'all',
      keyword: ''
    },

    _bound: false,

    init(params = {}) {
      this.renderGreeting();
      this.renderTagline();
      this.renderBanner();
      this.renderContestList();
      this.renderActiveContestList();
      this.renderCardList();
      this.bindEvents();
      this._animateHome();
    },

    renderGreeting() {
      const nameEl = qs('#home-username');
      if (nameEl) nameEl.textContent = `${SAMPLE_USER.name}님`;

      const badge = qs('#home-notification-badge');
      if (badge) badge.style.display = SAMPLE_USER.hasUnreadNotification ? 'block' : 'none';
    },

    /* 앱 진입/새로고침마다 캐치카피를 랜덤하게 노출 */
    renderTagline() {
      const el = qs('#home-tagline');
      if (!el) return;
      el.textContent = SAMPLE_TAGLINES[Math.floor(Math.random() * SAMPLE_TAGLINES.length)];
    },

    /* 배너도 다양한 분야가 랜덤으로 노출되도록, isFeatured 항목 중에서 매번 랜덤 추출 */
    renderBanner() {
      const banner = qs('#home-banner');
      if (!banner) return;

      const featuredPool = SAMPLE_PROJECTS.filter((p) => p.isFeatured);
      const featured = featuredPool[Math.floor(Math.random() * featuredPool.length)] || SAMPLE_PROJECTS[0];
      if (!featured) return;

      banner.dataset.id = featured.id;

      const badgeEl = qs('.project-banner__badge', banner);
      badgeEl.textContent = featured.category;
      badgeEl.className = `project-banner__badge ${CATEGORY_BADGE_CLASS[featured.category] || ''}`;

      qs('.project-banner__title', banner).textContent = featured.title;
      qs('.project-banner__desc', banner).textContent = featured.bannerDesc || featured.description;

      const metaText = featured.deadlineDday != null
        ? `마감 D-${featured.deadlineDday} · 지원자 ${featured.applicants}명`
        : `모집중 · 지원자 ${featured.applicants}명`;
      qs('.project-banner__meta', banner).textContent = metaText;
    },

    renderContestList() {
      const list = qs('#home-contest-list');
      if (!list) return;

      list.innerHTML = SAMPLE_CONTESTS.map((c) => this._renderContestCard(c)).join('');
    },

    /* 공모전 카드 사진 번호(01~10)를 카드/상세 페이지가 동일하게 공유 */
    _contestPhotoNum(contest) {
      const photoIndex = SAMPLE_CONTESTS.findIndex((c) => c.id === contest.id);
      return String((photoIndex >= 0 ? photoIndex : 0) % 10 + 1).padStart(2, '0');
    },

    _renderContestCard(contest) {
      const ddayClass = contest.ddayUrgent ? 'contest-card__dday-pill--urgent' : '';
      const photoNum = this._contestPhotoNum(contest);

      return `
        <article class="contest-card" data-id="${contest.id}" tabindex="0" role="button" aria-label="${contest.title} 상세보기">
          <div class="contest-card__photo" style="background-image: url('assets/images/project-img${photoNum}.jpg')">
            <span class="contest-card__category-pill">${contest.category}</span>
            <span class="contest-card__dday-pill ${ddayClass}">D-${contest.deadlineDday}</span>
          </div>
          <div class="contest-card__body">
            <h3 class="contest-card__title">${contest.title}</h3>
            <p class="contest-card__organizer">${contest.organizer}</p>
            <span class="contest-card__prize">${contest.prizeLabel}</span>
            <span class="recruit-row__tag contest-card__extra">${contest.extraLabel}</span>
          </div>
        </article>
      `;
    },

    /* 공모전 카드 → 프로젝트 상세 페이지 데이터 형태로 변환 */
    _contestToProject(contest) {
      return {
        id: contest.id,
        title: contest.title,
        category: contest.category,
        status: contest.ddayUrgent ? 'urgent' : 'open',
        description: `${contest.organizer}에서 주최하는 공모전입니다. ${contest.extraLabel}.`,
        deadlineLabel: `D-${contest.deadlineDday}`,
        teamSizeRange: '제한 없음',
        durationLabel: '심사 후 발표',
        roles: [{ name: contest.category, status: '모집 중' }],
        author: { name: contest.organizer, avatarColor: '#7fffd4', initial: contest.organizer.charAt(0) },
        applicants: Math.max(20, 200 - contest.deadlineDday * 6),
        heroImage: `assets/images/project-img${this._contestPhotoNum(contest)}.jpg`
      };
    },

    renderActiveContestList() {
      const list = qs('#home-active-contest-list');
      if (!list) return;

      list.innerHTML = SAMPLE_ACTIVE_CONTESTS.map((c) => this._renderActiveContestCard(c)).join('');
    },

    _renderActiveContestCard(contest) {
      return `
        <article class="active-contest-card" data-id="${contest.id}">
          <div class="active-contest-card__logo active-contest-card__logo--${contest.theme}">${contest.org}</div>
          <p class="active-contest-card__title">${contest.title}</p>
          <span class="active-contest-card__prize">${contest.prizeLabel}</span>
        </article>
      `;
    },

    renderCardList() {
      const list = qs('#home-recruit-list');
      if (!list) return;

      const projects = this._getFilteredProjects();

      if (projects.length === 0) {
        list.innerHTML = '<p class="recruit-row-list__empty">검색 결과가 없습니다.</p>';
        return;
      }

      const hasMore = projects.length > RECRUIT_INITIAL_COUNT;
      const initialProjects = projects.slice(0, RECRUIT_INITIAL_COUNT);
      const extraProjects = hasMore ? projects.slice(RECRUIT_INITIAL_COUNT) : [];

      list.innerHTML = `
        ${initialProjects.map((p) => this._renderRecruitRow(p)).join('')}
        ${hasMore ? `
          <div class="recruit-row-list__extra" id="recruit-extra-rows">
            ${extraProjects.map((p) => this._renderRecruitRow(p)).join('')}
          </div>
          <button class="recruit-row-list__toggle-btn" id="recruit-toggle-btn" type="button">more</button>
        ` : ''}
      `;
    },

    _getFilteredProjects() {
      const { category, keyword } = this.state;
      return SAMPLE_PROJECTS.filter((p) => {
        const matchCategory = category === 'all' || p.category === category;
        const matchKeyword = !keyword || p.title.toLowerCase().includes(keyword.toLowerCase());
        return matchCategory && matchKeyword;
      });
    },

    _renderRecruitRow(project) {
      const iconTheme = CATEGORY_THEME[project.category] || 'theme-purple';
      const iconEmoji = project.emoji || CATEGORY_EMOJI[project.category] || '🤖';
      const ddayClass = project.status === 'urgent' ? 'recruit-row__dday--urgent' : '';
      const ddayLabel = project.deadlineDday != null ? `D-${project.deadlineDday}` : '상시모집';

      const tags = [
        `<span class="recruit-row__tag">${project.category}</span>`,
        ...project.roles.map((r) => `<span class="recruit-row__tag recruit-row__tag--role">${r.name}</span>`)
      ].join('');

      return `
        <article class="recruit-row" data-id="${project.id}" tabindex="0" role="button" aria-label="${project.title} 상세보기">
          <div class="recruit-row__icon ${iconTheme}" aria-hidden="true">${iconEmoji}</div>
          <div class="recruit-row__body">
            <h3 class="recruit-row__title">${project.title}</h3>
            <div class="recruit-row__tags">${tags}</div>
          </div>
          <div class="recruit-row__meta">
            <span class="recruit-row__dday ${ddayClass}">${ddayLabel}</span>
            <span class="recruit-row__applicants">지원 ${project.applicants}명</span>
          </div>
        </article>
      `;
    },

    _animateHome() {
      const page = document.querySelector('[data-page="home"]');
      if (!page) return;

      const anim = (el, delay) => {
        if (!el) return;
        el.style.animationDelay = `${delay}s`;
        el.classList.remove('home-anim');
        void el.offsetWidth;
        el.classList.add('home-anim');
      };

      anim(page.querySelector('.home__header-top'), 0);
      anim(page.querySelector('.home__mascot'), 0.06);
      anim(page.querySelector('.search-bar'), 0.1);
      anim(page.querySelector('#home-tagline'), 0.15);
      anim(page.querySelector('#home-banner'), 0.2);

      page.querySelectorAll('.home__section-head').forEach((el, i) => {
        anim(el, 0.26 + i * 0.07);
      });

      page.querySelectorAll('.contest-card').forEach((el, i) => {
        anim(el, 0.32 + i * 0.04);
      });

      page.querySelectorAll('.active-contest-card').forEach((el, i) => {
        anim(el, 0.38 + i * 0.04);
      });

      page.querySelectorAll('.recruit-row').forEach((el, i) => {
        anim(el, 0.44 + i * 0.05);
      });
    },

    bindEvents() {
      if (this._bound) return;
      this._bound = true;

      /* 검색 (debounce) */
      const searchInput = qs('#home-search-input');
      if (searchInput) {
        const debouncedSearch = debounce((value) => {
          this.state.keyword = value.trim();
          this.renderCardList();
        }, 300);

        searchInput.addEventListener('input', (e) => {
          debouncedSearch(e.target.value);
        });
      }

      /* 카테고리 필터 칩 */
      const chipGroup = qs('#home-filter-chips');
      if (chipGroup) {
        chipGroup.addEventListener('click', (e) => {
          const chip = e.target.closest('.filter-chip');
          if (!chip) return;

          qsa('.filter-chip', chipGroup).forEach((c) => {
            c.classList.remove('filter-chip--active');
            c.setAttribute('aria-selected', 'false');
          });
          chip.classList.add('filter-chip--active');
          chip.setAttribute('aria-selected', 'true');

          this.state.category = chip.dataset.category;
          this.renderCardList();
        });
      }

      /* 인기 공모전 카드 클릭 → 상세 페이지 */
      const contestList = qs('#home-contest-list');
      if (contestList) {
        const goToContestDetail = (card) => {
          if (!card) return;
          const contest = SAMPLE_CONTESTS.find((c) => c.id === card.dataset.id);
          if (!contest) return;
          Router.navigate('project-detail', { project: this._contestToProject(contest) });
        };

        contestList.addEventListener('click', (e) => {
          goToContestDetail(e.target.closest('.contest-card'));
        });

        contestList.addEventListener('keydown', (e) => {
          if (e.key !== 'Enter' && e.key !== ' ') return;
          const card = e.target.closest('.contest-card');
          if (!card) return;
          e.preventDefault();
          goToContestDetail(card);
        });
      }

      /* 팀원 모집 행 클릭 + 더보기/접기 토글 */
      const list = qs('#home-recruit-list');
      if (list) {
        const goToDetail = (row) => {
          if (!row) return;
          Router.navigate('project-detail', { id: row.dataset.id });
        };

        list.addEventListener('click', (e) => {
          /* 더보기/접기 버튼 */
          const toggleBtn = e.target.closest('#recruit-toggle-btn');
          if (toggleBtn) {
            const extraRows = document.getElementById('recruit-extra-rows');
            if (!extraRows) return;
            const isExpanded = extraRows.dataset.expanded === 'true';
            if (!isExpanded) {
              extraRows.style.maxHeight = extraRows.scrollHeight + 'px';
              extraRows.dataset.expanded = 'true';
              toggleBtn.textContent = 'close';
            } else {
              extraRows.style.maxHeight = '0';
              extraRows.dataset.expanded = 'false';
              toggleBtn.textContent = 'more';
            }
            return;
          }
          /* 카드 클릭 */
          goToDetail(e.target.closest('.recruit-row'));
        });

        list.addEventListener('keydown', (e) => {
          if (e.key !== 'Enter' && e.key !== ' ') return;
          const row = e.target.closest('.recruit-row');
          if (!row) return;
          e.preventDefault();
          goToDetail(row);
        });
      }

      /* 배너 CTA */
      qs('#home-banner .project-banner__cta')?.addEventListener('click', () => {
        const banner = qs('#home-banner');
        Router.navigate('project-detail', { id: banner?.dataset.id });
      });

      /* 더보기 버튼 (인기 공모전 / 활발한 공모전 / 팀원 모집) */
      document.querySelectorAll('[data-action="go-projects"]').forEach(btn => {
        btn.addEventListener('click', () => Router.navigate('project-list'));
      });
    }
  };

  window.HomePage = HomePage;
})();
