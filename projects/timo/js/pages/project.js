/* ===================================================
   project.js — 프로젝트 상세 (이번 단계: 상세만 구현)
   =================================================== */

/*
 * home.js의 SAMPLE_PROJECTS는 자체 IIFE 안에 격리돼 있어 이 페이지에서
 * 접근할 수 없다(또한 이번 작업 범위상 home.js는 수정 금지). 동일한
 * Figma 검증 데이터를 이 페이지 전용으로 다시 선언해 home → detail
 * 이동 시 동일한 프로젝트 id/내용이 보이도록 맞춘다.
 */
(function () {
  /* home.js의 팀원 모집 데이터와 동일한 id/내용으로 맞춰 home → detail
     이동 시 같은 프로젝트가 보이도록 한다(분야도 기획·개발·디자인·
     마케팅·영상·AI·창업 등으로 다양하게 구성). */
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
      applicants: 128
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
      applicants: 84
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
      applicants: 65
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
      applicants: 41
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
      applicants: 32
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
      applicants: 56
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

  const CATEGORY_BADGE_CLASS = {
    '해커톤': 'cat-badge--hackathon',
    '공모전': 'cat-badge--contest',
    '프로젝트': 'cat-badge--project',
    '사이드 프로젝트': 'cat-badge--side',
    '창업': 'cat-badge--startup'
  };

  const STATUS_LABEL = {
    open: '● 모집 중',
    urgent: '● 모집 마감임박',
    closed: '● 모집 마감'
  };

  const STATUS_CLASS = {
    open: 'recruit-status--open',
    urgent: 'recruit-status--urgent',
    closed: ''
  };

  const bookmarkedIds = new Set();

  const ProjectPage = {
    _currentProject: null,
    _bound: false,
    _currentApplyProject: null,
    _applyBound: false,
    _listBound: false,
    listState: {
      category: 'all',
      keyword: ''
    },

    initList(params = {}) {
      this._renderList();
      this._bindListEvents();
    },

    _renderList() {
      const listEl = qs('#project-list-cards');
      const countEl = qs('#project-list-count');
      if (!listEl || !countEl) return;

      const projects = this._getFilteredListProjects();

      countEl.textContent = `총 ${projects.length}개의 프로젝트`;

      if (projects.length === 0) {
        listEl.innerHTML = '<p class="proj-list-empty">검색 결과가 없습니다.</p>';
        return;
      }

      listEl.innerHTML = projects.map((p) => this._renderProjectCard(p)).join('');

      listEl.querySelectorAll('.proj-card').forEach((el, i) => {
        el.style.animationDelay = `${0.05 + i * 0.06}s`;
        el.classList.add('proj-card-anim');
      });
    },

    _getFilteredListProjects() {
      const { category, keyword } = this.listState;
      return SAMPLE_PROJECTS.filter((p) => {
        const matchCategory = category === 'all' || p.category === category;
        const matchKeyword = !keyword || p.title.toLowerCase().includes(keyword.toLowerCase());
        return matchCategory && matchKeyword;
      });
    },

    _renderProjectCard(project) {
      const catBadgeClass = CATEGORY_BADGE_CLASS[project.category] || '';
      const statusLabel = STATUS_LABEL[project.status] || '';
      const statusClass = STATUS_CLASS[project.status] || '';
      const deadlineText = project.deadlineDday != null ? `마감 ${project.deadlineLabel}` : project.deadlineLabel;

      const roles = project.roles
        .map((r) => `<span class="role-badge">${r.name}</span>`)
        .join('');

      return `
        <article class="proj-card" data-id="${project.id}" tabindex="0" role="button" aria-label="${project.title} 상세보기">
          <div class="proj-card__head">
            <div class="proj-card__head-left">
              <span class="cat-badge ${catBadgeClass}">${project.category}</span>
              <span class="recruit-status ${statusClass}">${statusLabel}</span>
            </div>
            <span class="proj-card__deadline">${deadlineText}</span>
          </div>
          <h3 class="proj-card__title">${project.title}</h3>
          <p class="proj-card__desc">${project.description}</p>
          <div class="proj-card__roles">${roles}</div>
          <div class="proj-card__divider"></div>
          <div class="proj-card__footer">
            <span class="proj-card__author">
              <span class="proj-card__avatar" style="background-color:${project.author.avatarColor};">${project.author.initial}</span>
              <span class="proj-card__author-name">${project.author.name}</span>
            </span>
            <span class="proj-card__applicants">모집 ${project.teamSizeRange} · 지원 ${project.applicants}명</span>
          </div>
        </article>
      `;
    },

    _bindListEvents() {
      if (this._listBound) return;
      this._listBound = true;

      const listSection = document.querySelector('[data-page="project-list"]');

      /* 검색 (debounce) */
      const searchInput = qs('#project-list-search-input', listSection);
      if (searchInput) {
        const debouncedSearch = debounce((value) => {
          this.listState.keyword = value.trim();
          this._renderList();
        }, 300);

        searchInput.addEventListener('input', (e) => {
          debouncedSearch(e.target.value);
        });
      }

      /* 카테고리 필터 칩 */
      const chipGroup = qs('#project-list-filter-chips', listSection);
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

          this.listState.category = chip.dataset.category;
          this._renderList();
        });
      }

      /* 카드 클릭 → 상세 이동 */
      const cardList = qs('#project-list-cards', listSection);
      if (cardList) {
        const goToDetail = (card) => {
          if (!card) return;
          Router.navigate('project-detail', { id: card.dataset.id });
        };

        cardList.addEventListener('click', (e) => {
          goToDetail(e.target.closest('.proj-card'));
        });

        cardList.addEventListener('keydown', (e) => {
          if (e.key !== 'Enter' && e.key !== ' ') return;
          const card = e.target.closest('.proj-card');
          if (!card) return;
          e.preventDefault();
          goToDetail(card);
        });
      }
    },

    initDetail(params = {}) {
      const project =
        params.project ||
        SAMPLE_PROJECTS.find((item) => item.id === params.id) ||
        SAMPLE_PROJECTS[0];

      this._currentProject = project;
      this._render(project);
      this._bindEvents();
    },

    initApply(params = {}) {
      const project =
        SAMPLE_PROJECTS.find((item) => item.id === params.id) || SAMPLE_PROJECTS[0];

      this._currentApplyProject = project;

      qs('#apply-target-name').textContent = project ? project.title : '';

      /* 다른 프로젝트로 재진입했을 때 이전 입력값이 남지 않도록 초기화 */
      qs('#apply-motivation').value = '';
      qs('#apply-portfolio').value = '';
      qs('#apply-intro').value = '';

      this._bindApplyEvents();
    },

    initComplete(params = {}) {
      this._playCompleteAnimation();
      this._bindCompleteEvents();
    },

    _render(project) {
      if (!project) return;

      let heroUrl = project.heroImage;
      if (!heroUrl) {
        const heroIndex = SAMPLE_PROJECTS.findIndex((p) => p.id === project.id);
        const heroNum = String(heroIndex >= 0 ? heroIndex + 1 : 1).padStart(2, '0');
        heroUrl = `assets/images/project-img${heroNum}.jpg`;
      }
      qs('#detail-hero-bg').style.backgroundImage = `url('${heroUrl}')`;

      const catBadge = qs('#detail-cat-badge');
      catBadge.textContent = project.category;
      catBadge.className = `cat-badge ${CATEGORY_BADGE_CLASS[project.category] || ''}`;

      const status = qs('#detail-status');
      status.textContent = STATUS_LABEL[project.status] || '';
      status.className = `recruit-status ${STATUS_CLASS[project.status] || ''}`;

      qs('#detail-title').textContent = project.title;
      qs('#detail-deadline').textContent = project.deadlineLabel;
      qs('#detail-team-size').textContent = project.teamSizeRange;
      qs('#detail-duration').textContent = project.durationLabel;
      qs('#detail-description').textContent = project.description;
      qs('#detail-applicants').textContent = `지원자 ${project.applicants}명`;

      qs('#detail-role-list').innerHTML = project.roles
        .map(
          (r) => `
        <div class="role-badge role-badge--card">
          <span class="role-badge__name">${r.name}</span>
          <span class="role-badge__status">${r.status}</span>
        </div>
      `
        )
        .join('');

      const bookmarkBtn = qs('[data-action="bookmark"]');
      bookmarkBtn?.classList.toggle('is-active', bookmarkedIds.has(project.id));
    },

    _bindEvents() {
      if (this._bound) return;
      this._bound = true;

      const detailSection = document.querySelector('[data-page="project-detail"]');

      qs('[data-action="back"]', detailSection)?.addEventListener('click', () => {
        Router.back();
      });

      qs('[data-action="bookmark"]', detailSection)?.addEventListener('click', (e) => {
        const project = this._currentProject;
        if (!project) return;

        const btn = e.currentTarget;
        if (bookmarkedIds.has(project.id)) {
          bookmarkedIds.delete(project.id);
          btn.classList.remove('is-active');
          showToast('북마크가 해제되었습니다');
        } else {
          bookmarkedIds.add(project.id);
          btn.classList.add('is-active');
          showToast('북마크에 추가되었습니다');
        }
      });

      qs('[data-action="share"]', detailSection)?.addEventListener('click', async () => {
        const project = this._currentProject;
        const shareData = {
          title: project ? project.title : 'TIMO',
          text: project ? `TIMO에서 "${project.title}" 프로젝트를 확인해보세요.` : 'TIMO',
          url: location.href
        };

        if (navigator.share) {
          try {
            await navigator.share(shareData);
          } catch (err) {
            /* 사용자가 공유를 취소한 경우 등은 무시 */
          }
        } else {
          showToast('링크가 복사되었습니다');
        }
      });

      qs('[data-action="go-apply"]', detailSection)?.addEventListener('click', () => {
        const project = this._currentProject;
        if (!project) return;
        Router.navigate('project-apply', { id: project.id });
      });
    },

    _bindApplyEvents() {
      if (this._applyBound) return;
      this._applyBound = true;

      const applySection = document.querySelector('[data-page="project-apply"]');

      qs('[data-action="back"]', applySection)?.addEventListener('click', () => {
        Router.back();
      });

      qs('#apply-form')?.addEventListener('submit', (e) => {
        e.preventDefault();

        const project = this._currentApplyProject;
        if (!project) return;

        const motivation = qs('#apply-motivation').value.trim();
        const portfolioUrl = qs('#apply-portfolio').value.trim();
        const selfIntro = qs('#apply-intro').value.trim();

        if (!motivation) {
          showToast('지원 동기를 입력해주세요', 'error');
          qs('#apply-motivation').focus();
          return;
        }

        if (!selfIntro) {
          showToast('자기소개를 입력해주세요', 'error');
          qs('#apply-intro').focus();
          return;
        }

        /* 실제 저장 없이 메모리상 임시 객체만 생성 (Supabase 연동 전) */
        const applicationDraft = {
          projectId: project.id,
          motivation,
          portfolioUrl,
          selfIntro
        };
        Storage.set('application_draft', applicationDraft);

        Router.navigate('apply-complete', { id: project.id });
      });
    },

    /* 페이지 진입마다 등장 애니메이션을 처음부터 재생 (display:none ↔ flex 토글만으로는
       내부 자식 요소의 animation-delay가 일관되게 재시작되지 않는 브라우저가 있어
       클래스를 강제로 떼고-리플로우-다시 붙인다) */
    _playCompleteAnimation() {
      const page = document.querySelector('[data-page="apply-complete"]');
      if (!page) return;

      page.classList.remove('is-animating');
      void page.offsetWidth;
      page.classList.add('is-animating');
    },

    _bindCompleteEvents() {
      if (this._completeBound) return;
      this._completeBound = true;

      const completeSection = document.querySelector('[data-page="apply-complete"]');

      qs('[data-action="go-home"]', completeSection)?.addEventListener('click', () => {
        Router.navigate('home');
      });

      qs('[data-action="go-applications"]', completeSection)?.addEventListener('click', () => {
        Router.navigate('mypage', { tab: 'applications' });
      });
    }
  };

  window.ProjectPage = ProjectPage;
})();
