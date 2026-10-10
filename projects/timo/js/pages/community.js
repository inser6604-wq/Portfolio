/* ===================================================
   community.js — 커뮤니티 목록 + 게시글 상세
   =================================================== */

const CommunityPage = (() => {

  /* ── 목 데이터 ── */
  const POSTS = [
    {
      id: 1,
      tab: 'free',
      badge: 'free',
      badgeLabel: '자유게시판',
      title: '해커톤 처음인데 어떻게 준비해야 하나요?',
      excerpt: '다음 달에 첫 해커톤을 나가게 됐는데요, 처음이라 어떤 준비를 해야 할지 막막합니다. 경험자 분들의 조언 부탁드립니다!',
      author: '이준혁',
      authorInitial: '이',
      avatarClass: 'comm-card__avatar--primary',
      time: '2시간 전',
      views: 234,
      likes: 18,
      comments: 12,
      content: '다음 달에 첫 해커톤을 나가게 됐는데요, 처음이라 어떤 준비를 해야 할지 막막합니다. 아이디어 구체화부터 역할 분담까지 경험자 분들의 조언 부탁드립니다! 특히 기술 스택 선택이나 MVP 범위를 어떻게 정하는지 궁금해요.',
      commentList: [
        { name: '박서연', initial: '박', avatarClass: 'prv-item__avatar--cyan', text: '기획서를 미리 작성해두면 좋아요!', time: '1시간 전' },
        { name: '김도현', initial: '김', avatarClass: 'prv-item__avatar--primary', text: 'MVP 기준을 명확히 정하는 게 제일 중요해요.', time: '45분 전' },
        { name: '최민준', initial: '최', avatarClass: 'prv-item__avatar--purple', text: '팀원들과 사전에 기술 스택 맞춰두세요!', time: '30분 전' },
      ]
    },
    {
      id: 2,
      tab: 'contest',
      badge: 'contest',
      badgeLabel: '공모전 정보',
      title: '2026 스마트시티 공모전 참가자 모집',
      excerpt: '스마트시티 공모전 정보 공유합니다. 마감은 7월 말입니다.',
      author: '김서연',
      authorInitial: '김',
      avatarClass: 'comm-card__avatar--primary',
      time: '5시간 전',
      views: 412,
      likes: 45,
      comments: 23,
      content: '2026 스마트시티 혁신 아이디어 공모전 정보 공유합니다!\n\n주최: 한국스마트시티학회\n마감: 2026년 7월 31일\n시상: 대상(500만원), 최우수(200만원), 우수(100만원)\n\n1~4인 팀 구성 가능하며, 학생 참여 가능합니다. 관심 있는 분들은 댓글 달아주세요!',
      commentList: [
        { name: '이준혁', initial: '이', avatarClass: 'prv-item__avatar--primary', text: '좋은 정보 감사해요! 팀 구하는 중인데 같이 해볼 분 계신가요?', time: '4시간 전' },
        { name: '박민서', initial: '박', avatarClass: 'prv-item__avatar--cyan', text: '저도 참가하고 싶어요. 기획자인데 연락해도 될까요?', time: '3시간 전' },
      ]
    },
    {
      id: 3,
      tab: 'review',
      badge: 'review',
      badgeLabel: '프로젝트 후기',
      title: 'TIMO로 만난 팀원과 공모전 수상했어요 🏆',
      excerpt: '지난 3개월간 TIMO를 통해 만난 팀원들과 공모전에서 수상의 영광을 안았습니다!',
      author: '박민서',
      authorInitial: '박',
      avatarClass: 'comm-card__avatar--cyan',
      time: '1일 전',
      views: 892,
      likes: 134,
      comments: 56,
      content: '지난 3개월간 TIMO를 통해 만난 팀원들과 함께 공모전에 참가해서 수상의 영광을 안았습니다! 🏆\n\n처음에는 온라인으로만 만난 사람들이라 걱정도 됐는데, TIMO의 성향 테스트 덕분에 서로 잘 맞는 팀원들을 만날 수 있었어요. 소통도 원활하고 각자 맡은 역할에 최선을 다해줬습니다.\n\nTIMO 덕분에 좋은 팀원들을 만났어요. 다들 감사합니다!',
      commentList: [
        { name: '이지은', initial: '이', avatarClass: 'prv-item__avatar--primary', text: '축하드려요! 저도 TIMO로 좋은 팀원 찾고 싶네요.', time: '20시간 전' },
        { name: '김도현', initial: '김', avatarClass: 'prv-item__avatar--primary', text: '정말 대단하세요! 어떤 공모전인지 여쭤봐도 될까요?', time: '18시간 전' },
        { name: '최민준', initial: '최', avatarClass: 'prv-item__avatar--purple', text: '동기부여가 됩니다 감사해요!', time: '10시간 전' },
      ]
    },
    {
      id: 4,
      tab: 'free',
      badge: 'free',
      badgeLabel: '자유게시판',
      title: '사이드 프로젝트 첫 배포 성공했어요!',
      excerpt: '3개월 동안 TIMO 팀원들과 함께 만든 사이드 프로젝트를 드디어 배포했습니다. 많이 사용해주세요!',
      author: '정하윤',
      authorInitial: '정',
      avatarClass: 'comm-card__avatar--primary',
      time: '2일 전',
      views: 563,
      likes: 89,
      comments: 31,
      content: '3개월간 TIMO 팀원들과 함께 만든 사이드 프로젝트를 드디어 배포했습니다!\n\n캠퍼스 내 구인구직 플랫폼인데, 팀원들 덕분에 생각보다 훨씬 완성도 있게 나왔어요. 많이 사용해주시고 피드백도 부탁드려요!',
      commentList: [
        { name: '이준혁', initial: '이', avatarClass: 'prv-item__avatar--primary', text: '축하해요! 링크 공유해주실 수 있나요?', time: '1일 전' },
        { name: '박민서', initial: '박', avatarClass: 'prv-item__avatar--cyan', text: '대단하세요! 저도 배포해보고 싶어요.', time: '1일 전' },
      ]
    },
    {
      id: 5,
      tab: 'contest',
      badge: 'contest',
      badgeLabel: '공모전 정보',
      title: '2026 AI 해커톤 팀원 모집 중',
      excerpt: '7월 셋째 주 진행 예정인 AI 해커톤 참가팀 모집합니다. 백엔드/프론트엔드 1명씩 필요해요.',
      author: '최유나',
      authorInitial: '최',
      avatarClass: 'comm-card__avatar--cyan',
      time: '3일 전',
      views: 321,
      likes: 47,
      comments: 19,
      content: '7월 셋째 주 진행 예정인 AI 해커톤 참가팀 모집합니다!\n\n현재 기획 1명, 디자인 1명으로 구성되어 있고 백엔드/프론트엔드 각 1명씩 추가 모집 중입니다.\n\n주제: AI를 활용한 헬스케어 서비스\n일정: 2026년 7월 18~19일 (1박 2일)\n관심 있으신 분들은 댓글이나 DM 주세요!',
      commentList: [
        { name: '이준혁', initial: '이', avatarClass: 'prv-item__avatar--primary', text: '프론트엔드 지원 가능합니다! 연락드려도 될까요?', time: '2일 전' },
        { name: '정하윤', initial: '정', avatarClass: 'prv-item__avatar--primary', text: '저도 백엔드 쪽으로 관심 있어요.', time: '2일 전' },
      ]
    },
    {
      id: 6,
      tab: 'review',
      badge: 'review',
      badgeLabel: '프로젝트 후기',
      title: '첫 해커톤 참가 후기 — 비록 수상은 못했지만',
      excerpt: 'TIMO를 통해 만난 팀원들과 함께한 첫 해커톤. 결과는 아쉽지만 얻은 것들이 더 많았어요.',
      author: '김도현',
      authorInitial: '김',
      avatarClass: 'comm-card__avatar--primary',
      time: '4일 전',
      views: 674,
      likes: 102,
      comments: 44,
      content: 'TIMO를 통해 만난 팀원들과 함께한 첫 해커톤 후기입니다.\n\n결과는 아쉽게도 수상을 못 했지만, 그 과정에서 얻은 것들이 훨씬 더 많았어요. 빠른 의사결정, 역할 분담, 그리고 밤새 함께 고생한 팀원들과의 유대감까지!\n\n다음 번에는 꼭 수상하고 싶어요. 함께 해준 팀원들 모두 감사해요 🙏',
      commentList: [
        { name: '박민서', initial: '박', avatarClass: 'prv-item__avatar--cyan', text: '과정이 중요하죠! 다음엔 꼭 수상하실 거에요.', time: '3일 전' },
        { name: '최유나', initial: '최', avatarClass: 'prv-item__avatar--purple', text: '고생 많으셨어요. 다음 해커톤도 화이팅!', time: '3일 전' },
      ]
    }
  ];

  let _currentTab = 'free';
  let _currentPostId = null;
  let _likedPosts = new Set();
  let _savedPosts = new Set();
  let _commentCounts = {};   // postId → extra comments added locally
  let _selectedCat = 'free'; // 글쓰기 선택 카테고리
  let _editingPostId = null; // 수정 중인 게시글 id

  /* ── 커뮤니티 목록 ── */
  function init(params = {}) {
    _syncTabUI(_currentTab);
    _renderList(_currentTab);
    _bindTabs();
    _moveIndicator(_currentTab);
  }

  function _moveIndicator(tab) {
    const indicator = document.getElementById('comm-tabs-indicator');
    if (!indicator) return;
    const idx = { free: 0, contest: 1, review: 2 }[tab] ?? 0;
    indicator.style.transform = `translateX(calc(100% * ${idx}))`;
  }

  function _syncTabUI(tab) {
    document.querySelectorAll('[data-comm-tab]').forEach(btn => {
      const active = btn.dataset.commTab === tab;
      btn.classList.toggle('comm-tabs__item--active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  }

  function _bindTabs() {
    const tabs = document.querySelectorAll('[data-comm-tab]');
    tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        _currentTab = btn.dataset.commTab;
        tabs.forEach(t => {
          t.classList.toggle('comm-tabs__item--active', t === btn);
          t.setAttribute('aria-selected', t === btn ? 'true' : 'false');
        });
        _moveIndicator(_currentTab);
        _renderList(_currentTab);
      });
    });
  }

  function _renderList(tab) {
    const container = document.getElementById('comm-list');
    if (!container) return;
    const filtered = POSTS.filter(p => p.tab === tab);

    container.innerHTML = filtered.map(post => {
      const extraComments = _commentCounts[post.id] || 0;
      return `
        <article class="comm-card" role="listitem" data-post-id="${post.id}" tabindex="0" aria-label="${post.title}">
          <span class="comm-card__badge comm-card__badge--${post.badge}">${post.badgeLabel}</span>
          <h2 class="comm-card__title">${post.title}</h2>
          <p class="comm-card__excerpt">${post.excerpt}</p>
          <div class="comm-card__meta">
            <div class="comm-card__avatar ${post.avatarClass}">${post.authorInitial}</div>
            <span class="comm-card__author">${post.author}</span>
            <span class="comm-card__time">${post.time}</span>
          </div>
          <div class="comm-card__divider"></div>
          <div class="comm-card__stats">
            <span class="comm-card__stat">
              <svg class="comm-card__stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              ${post.views}
            </span>
            <span class="comm-card__stat">
              ${_likedPosts.has(post.id)
                ? `<img class="comm-card__stat-icon" src="assets/icons/like-active-icon.svg" alt="" aria-hidden="true">`
                : `<svg class="comm-card__stat-icon" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g clip-path="url(#cp-card-like-${post.id})"><path d="M9.09731 3.5655L8.49096 6.06364H12.0259C12.2142 6.06364 12.3999 6.10747 12.5683 6.19166C12.7367 6.27586 12.8831 6.3981 12.9961 6.54871C13.1091 6.69932 13.1854 6.87416 13.2191 7.05939C13.2527 7.24462 13.2428 7.43514 13.1901 7.61588L11.7773 12.4666C11.7039 12.7185 11.5507 12.9398 11.3408 13.0972C11.1309 13.2547 10.8756 13.3398 10.6132 13.3398H2.42753C2.10591 13.3398 1.79745 13.212 1.57003 12.9846C1.34261 12.7571 1.21484 12.4487 1.21484 12.1271V7.27632C1.21484 6.9547 1.34261 6.64625 1.57003 6.41882C1.79745 6.1914 2.10591 6.06364 2.42753 6.06364H4.10104C4.32665 6.06352 4.54775 6.00046 4.73949 5.88156C4.93123 5.76267 5.086 5.59264 5.18639 5.3906L7.27828 1.21289C7.56421 1.21643 7.84565 1.28454 8.10157 1.41213C8.35749 1.53972 8.58126 1.7235 8.75618 1.94972C8.9311 2.17594 9.05263 2.43877 9.1117 2.71856C9.16585 2.99836 9.09731 3.5655Z" stroke="#aaa" stroke-width="1.21269" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.24414 6.06445V13.3406" stroke="#aaa" stroke-width="1.21269" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="cp-card-like-${post.id}"><rect width="14.5522" height="14.5522" fill="white"/></clipPath></defs></svg>`
              }
              ${post.likes + (_likedPosts.has(post.id) ? 1 : 0)}
            </span>
            <span class="comm-card__stat">
              <svg class="comm-card__stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              ${post.comments + extraComments}
            </span>
          </div>
        </article>`;
    }).join('');

    /* 카드 클릭 → 상세 이동 */
    container.querySelectorAll('.comm-card').forEach(card => {
      const handler = () => {
        _currentPostId = Number(card.dataset.postId);
        Router.navigate('community-post');
      };
      card.addEventListener('click', handler);
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') handler(); });
    });

    /* 카드 등장 애니메이션 (아래 → 위, 순차) */
    container.querySelectorAll('.comm-card').forEach((card, i) => {
      card.style.animationDelay = `${i * 0.06}s`;
      card.classList.add('comm-fade-up');
    });
  }

  /* ── 커뮤니티 게시글 상세 ── */
  function initPost(params = {}) {
    if (params.postId) _currentPostId = params.postId;
    const post = POSTS.find(p => p.id === _currentPostId);
    if (!post) {
      Router.navigate('community');
      return;
    }
    _renderPost(post);
    _bindPostActions(post);
    _bindCommentSubmit(post);
    _bindCommentDelete();
    _bindBackBtn();
    _bindMoreBtn(post);
  }

  function _renderPost(post) {
    const body = document.getElementById('comm-post-body');
    if (!body) return;

    const liked  = _likedPosts.has(post.id);
    const saved  = _savedPosts.has(post.id);
    const extraC = _commentCounts[post.id] || 0;

    const commentsHtml = post.commentList.map(c => `
      <div class="comm-post__comment">
        <div class="comm-post__comment-avatar ${c.avatarClass}" style="background-color:${_avatarBg(c.avatarClass)}">${c.initial}</div>
        <div class="comm-post__comment-bubble">
          <div class="comm-post__comment-name">${c.name}</div>
          <div class="comm-post__comment-text">${c.text}</div>
          <div class="comm-post__comment-time">${c.time}</div>
        </div>
      </div>`).join('');

    const localCommentsHtml = _getLocalComments(post.id).map(c => `
      <div class="comm-post__comment" id="comm-local-comment-${c.id}">
        <div class="comm-post__comment-avatar" style="background-color:var(--color-primary-light)">김</div>
        <div class="comm-post__comment-bubble">
          <div class="comm-post__comment-name-row">
            <div class="comm-post__comment-name">김티모 (나)</div>
            <button class="comm-post__comment-delete-btn" type="button" data-comment-id="${c.id}" data-post-id="${post.id}" aria-label="댓글 삭제">삭제</button>
          </div>
          <div class="comm-post__comment-text">${c.text}</div>
          <div class="comm-post__comment-time">방금</div>
        </div>
      </div>`).join('');

    const contentLines = post.content.split('\n').map(l => l ? `<p>${l}</p>` : '<br>').join('');

    body.innerHTML = `
      <span class="comm-post__badge comm-post__badge--${post.badge}">${post.badgeLabel}</span>
      <h1 class="comm-post__title">${post.title}</h1>
      <div class="comm-post__author">
        <div class="comm-post__author-avatar" style="background-color:${_avatarBg(post.avatarClass)}">${post.authorInitial}</div>
        <div class="comm-post__author-info">
          <span class="comm-post__author-name">${post.author}</span>
          <span class="comm-post__author-meta">${post.time} · 조회 ${post.views}</span>
        </div>
      </div>
      <div class="comm-post__divider"></div>
      <div class="comm-post__content">${contentLines}</div>
      <div class="comm-post__actions">
        <button class="comm-post__action-btn ${liked ? 'comm-post__action-btn--liked' : ''}" id="comm-like-btn" type="button" aria-pressed="${liked}">
          ${liked
            ? `<img class="comm-post__like-img" src="assets/icons/like-active-icon.svg" width="18" height="18" alt="" aria-hidden="true">`
            : `<svg class="comm-post__like-img" width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g clip-path="url(#cp-like)"><path d="M9.09731 3.5655L8.49096 6.06364H12.0259C12.2142 6.06364 12.3999 6.10747 12.5683 6.19166C12.7367 6.27586 12.8831 6.3981 12.9961 6.54871C13.1091 6.69932 13.1854 6.87416 13.2191 7.05939C13.2527 7.24462 13.2428 7.43514 13.1901 7.61588L11.7773 12.4666C11.7039 12.7185 11.5507 12.9398 11.3408 13.0972C11.1309 13.2547 10.8756 13.3398 10.6132 13.3398H2.42753C2.10591 13.3398 1.79745 13.212 1.57003 12.9846C1.34261 12.7571 1.21484 12.4487 1.21484 12.1271V7.27632C1.21484 6.9547 1.34261 6.64625 1.57003 6.41882C1.79745 6.1914 2.10591 6.06364 2.42753 6.06364H4.10104C4.32665 6.06352 4.54775 6.00046 4.73949 5.88156C4.93123 5.76267 5.086 5.59264 5.18639 5.3906L7.27828 1.21289C7.56421 1.21643 7.84565 1.28454 8.10157 1.41213C8.35749 1.53972 8.58126 1.7235 8.75618 1.94972C8.9311 2.17594 9.05263 2.43877 9.1117 2.71856C9.16585 2.99836 9.09731 3.5655Z" stroke="#aaa" stroke-width="1.21269" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.24414 6.06445V13.3406" stroke="#aaa" stroke-width="1.21269" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="cp-like"><rect width="14.5522" height="14.5522" fill="white"/></clipPath></defs></svg>`
          }
          좋아요 ${post.likes + (liked ? 1 : 0)}
        </button>
        <button class="comm-post__action-btn" id="comm-share-btn" type="button">
          <span class="comm-post__action-emoji">🔗</span>공유
        </button>
        <button class="comm-post__action-btn ${saved ? 'comm-post__action-btn--liked' : ''}" id="comm-save-btn" type="button" aria-pressed="${saved}">
          <span class="comm-post__action-emoji">${saved ? '🔖' : '🔖'}</span>저장
        </button>
      </div>
      <div class="comm-post__divider"></div>
      <div class="comm-post__comments-title">댓글 ${post.comments + extraC}개</div>
      <div id="comm-comment-list">
        ${commentsHtml}
        ${localCommentsHtml}
      </div>`;

    /* 댓글 등장 애니메이션 (아래 → 위, 순차) */
    body.querySelectorAll('.comm-post__comment').forEach((el, i) => {
      el.style.animationDelay = `${0.15 + i * 0.07}s`;
      el.classList.add('comm-fade-up');
    });
  }

  function _avatarBg(cls) {
    if (cls.includes('cyan'))   return 'var(--color-avatar-cyan)';
    if (cls.includes('purple')) return 'var(--color-avatar-purple)';
    return 'var(--color-primary-light)';
  }

  /* 로컬 댓글 저장소 */
  const _localComments = {};
  let _localCommentIdSeq = 1;

  function _getLocalComments(postId) {
    return _localComments[postId] || [];
  }

  function _addLocalComment(postId, text) {
    if (!_localComments[postId]) _localComments[postId] = [];
    const c = { id: _localCommentIdSeq++, text };
    _localComments[postId].push(c);
    _commentCounts[postId] = (_commentCounts[postId] || 0) + 1;
    return c;
  }

  function _deleteLocalComment(postId, commentId) {
    const comments = _localComments[postId];
    if (!comments) return;
    const idx = comments.findIndex(c => c.id === commentId);
    if (idx === -1) return;
    comments.splice(idx, 1);
    _commentCounts[postId] = Math.max(0, (_commentCounts[postId] || 0) - 1);

    document.getElementById(`comm-local-comment-${commentId}`)?.remove();

    const post = POSTS.find(p => p.id === postId);
    if (post) {
      const titleEl = document.querySelector('.comm-post__comments-title');
      if (titleEl) titleEl.textContent = `댓글 ${post.comments + (_commentCounts[postId] || 0)}개`;
    }
  }

  function _bindCommentDelete() {
    const body = document.getElementById('comm-post-body');
    if (!body || body._deleteHandlerBound) return;
    body._deleteHandlerBound = true;
    body.addEventListener('click', (e) => {
      const btn = e.target.closest('.comm-post__comment-delete-btn');
      if (!btn) return;
      _deleteLocalComment(Number(btn.dataset.postId), Number(btn.dataset.commentId));
    });
  }

  function _bindPostActions(post) {
    /* 좋아요 */
    document.getElementById('comm-like-btn')?.addEventListener('click', () => {
      const wasLiked = _likedPosts.has(post.id);
      if (wasLiked) {
        _likedPosts.delete(post.id);
      } else {
        _likedPosts.add(post.id);
      }
      _renderPost(post);
      _bindPostActions(post);
      _bindCommentSubmit(post);

      if (!wasLiked) {
        const img = document.querySelector('.comm-post__like-img');
        img?.classList.add('like-pop');
        img?.addEventListener('animationend', () => img.classList.remove('like-pop'), { once: true });
        const btn = document.getElementById('comm-like-btn');
        btn?.classList.add('like-ring');
        btn?.addEventListener('animationend', () => btn.classList.remove('like-ring'), { once: true });
      }
    });

    /* 공유 */
    document.getElementById('comm-share-btn')?.addEventListener('click', () => {
      _showShareSheet(post);
    });

    /* 저장 */
    document.getElementById('comm-save-btn')?.addEventListener('click', () => {
      if (_savedPosts.has(post.id)) {
        _savedPosts.delete(post.id);
      } else {
        _savedPosts.add(post.id);
      }
      _renderPost(post);
      _bindPostActions(post);
      _bindCommentSubmit(post);
    });
  }

  function _bindCommentSubmit(post) {
    const input  = document.getElementById('comm-comment-input');
    const sendBtn = document.getElementById('comm-comment-send');
    if (!input || !sendBtn) return;

    /* 이미 바인딩된 경우 교체 방지 */
    const newSendBtn = sendBtn.cloneNode(true);
    sendBtn.parentNode.replaceChild(newSendBtn, sendBtn);

    newSendBtn.addEventListener('click', () => {
      const text = input.value.trim();
      if (!text) return;
      const c = _addLocalComment(post.id, text);
      input.value = '';

      const list = document.getElementById('comm-comment-list');
      if (list) {
        const div = document.createElement('div');
        div.className = 'comm-post__comment';
        div.id = `comm-local-comment-${c.id}`;
        div.innerHTML = `
          <div class="comm-post__comment-avatar" style="background-color:var(--color-primary-light)">김</div>
          <div class="comm-post__comment-bubble">
            <div class="comm-post__comment-name-row">
              <div class="comm-post__comment-name">김티모 (나)</div>
              <button class="comm-post__comment-delete-btn" type="button" data-comment-id="${c.id}" data-post-id="${post.id}" aria-label="댓글 삭제">삭제</button>
            </div>
            <div class="comm-post__comment-text">${c.text}</div>
            <div class="comm-post__comment-time">방금</div>
          </div>`;
        div.querySelector('.comm-post__comment-delete-btn')?.addEventListener('click', () => {
          _deleteLocalComment(post.id, c.id);
        });
        list.appendChild(div);
        div.classList.add('comm-fade-up');

        /* 댓글 수 업데이트 */
        const title = document.querySelector('.comm-post__comments-title');
        if (title) {
          const extraC = _commentCounts[post.id] || 0;
          title.textContent = `댓글 ${post.comments + extraC}개`;
        }
        div.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  /* ── 공유 바텀시트 ── */
  function _showShareSheet(post) {
    const sheet = document.getElementById('bottom-sheet');
    const overlay = document.getElementById('bottom-sheet-overlay');
    const list = sheet?.querySelector('.bottom-sheet__list');
    if (!sheet || !list) return;

    list.innerHTML = `
      <li role="menuitem">
        <button class="bottom-sheet__option" id="comm-share-link" type="button">
          🔗 &nbsp;링크 복사
        </button>
      </li>
      <li role="menuitem">
        <button class="bottom-sheet__option comm-share-kakao-btn" id="comm-share-kakao" type="button">
          <img src="assets/icons/kakaotalk-icon.svg" alt="" class="comm-share__kakao-icon" aria-hidden="true" />
          카카오톡으로 공유
        </button>
      </li>`;

    sheet.setAttribute('aria-hidden', 'false');
    sheet.classList.add('is-open');
    overlay?.classList.add('is-visible');

    document.getElementById('comm-share-link')?.addEventListener('click', () => {
      navigator.clipboard?.writeText(location.href).then(() => {
        showToast('링크가 복사됐어요!');
      }).catch(() => showToast('링크가 복사됐어요!'));
      closeBottomSheet();
    });

    document.getElementById('comm-share-kakao')?.addEventListener('click', () => {
      const shareText = `${post.title}\n${post.excerpt}`;
      const shareUrl  = location.href;
      /* 모바일: 네이티브 공유 시트(카카오 포함) 우선 시도 */
      if (navigator.share) {
        navigator.share({ title: post.title, text: shareText, url: shareUrl }).catch(() => {});
      } else {
        /* 데스크탑: 링크 복사 후 안내 */
        navigator.clipboard?.writeText(shareUrl).then(() => {
          showToast('링크 복사 완료! 카카오톡에 붙여넣기 해주세요.');
        }).catch(() => showToast('링크 복사 완료! 카카오톡에 붙여넣기 해주세요.'));
      }
      closeBottomSheet();
    });
  }

  /* ── 글쓰기/수정 페이지 ── */
  function initWrite(params = {}) {
    const editPost = _editingPostId ? POSTS.find(p => p.id === _editingPostId) : null;
    _selectedCat = editPost ? editPost.tab : 'free';

    const titleEl   = document.getElementById('comm-write-title-input');
    const contentEl = document.getElementById('comm-write-content-input');
    const section   = document.querySelector('[data-page="community-write"]');
    const headerTitle = section?.querySelector('.comm-write__title');

    if (editPost) {
      if (titleEl)   titleEl.value   = editPost.title;
      if (contentEl) contentEl.value = editPost.content;
      if (headerTitle) headerTitle.textContent = '게시글 수정';
    } else {
      if (titleEl)   titleEl.value   = '';
      if (contentEl) contentEl.value = '';
      if (headerTitle) headerTitle.textContent = '게시글 작성';
    }

    section?.querySelectorAll('[data-cat]').forEach(btn =>
      btn.classList.toggle('comm-write__cat-btn--active', btn.dataset.cat === _selectedCat));
    _bindWriteBack();
    _bindWriteCatBtns();
    _bindWriteSubmit();
  }

  function _bindWriteBack() {
    const section = document.querySelector('[data-page="community-write"]');
    const btn = section?.querySelector('[data-action="back"]');
    if (!btn) return;
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    newBtn.addEventListener('click', () => {
      if (_editingPostId) {
        _editingPostId = null;
        Router.navigate('community-post');
      } else {
        Router.navigate('community');
      }
    });
  }

  function _bindWriteCatBtns() {
    const section = document.querySelector('[data-page="community-write"]');
    const btns = section?.querySelectorAll('[data-cat]');
    if (!btns) return;
    btns.forEach(btn => {
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);
      newBtn.addEventListener('click', () => {
        _selectedCat = newBtn.dataset.cat;
        section.querySelectorAll('[data-cat]').forEach(b =>
          b.classList.toggle('comm-write__cat-btn--active', b.dataset.cat === _selectedCat));
      });
    });
  }

  function _bindWriteSubmit() {
    const form = document.getElementById('comm-write-form');
    if (!form) return;
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    newForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const titleEl   = document.getElementById('comm-write-title-input');
      const contentEl = document.getElementById('comm-write-content-input');
      const title   = titleEl?.value.trim();
      const content = contentEl?.value.trim();
      if (!title)   { showToast('제목을 입력해주세요.', 'error'); return; }
      if (!content) { showToast('내용을 입력해주세요.', 'error'); return; }

      const catMap = { free: '자유게시판', contest: '공모전 정보', review: '프로젝트 후기' };

      if (_editingPostId) {
        /* 수정 모드 */
        const post = POSTS.find(p => p.id === _editingPostId);
        if (post) {
          post.title    = title;
          post.content  = content;
          post.excerpt  = content.slice(0, 80) + (content.length > 80 ? '...' : '');
          post.tab      = _selectedCat;
          post.badge    = _selectedCat;
          post.badgeLabel = catMap[_selectedCat] || '자유게시판';
        }
        _currentTab = _selectedCat;
        _editingPostId = null;
        showToast('게시글이 수정됐어요!');
        Router.navigate('community-post');
      } else {
        /* 작성 모드 */
        const badgeLabel = catMap[_selectedCat] || '자유게시판';
        const newPost = {
          id: Date.now(),
          tab: _selectedCat,
          badge: _selectedCat,
          badgeLabel,
          title,
          excerpt: content.slice(0, 80) + (content.length > 80 ? '...' : ''),
          author: '김티모',
          authorInitial: '김',
          avatarClass: 'comm-card__avatar--primary',
          time: '방금 전',
          views: 0,
          likes: 0,
          comments: 0,
          content,
          commentList: []
        };
        POSTS.unshift(newPost);
        _currentTab = _selectedCat;

        if (titleEl)   titleEl.value   = '';
        if (contentEl) contentEl.value = '';

        showToast('게시글이 등록됐어요!');
        Router.navigate('community');
      }
    });
  }

  /* ── 저장 게시글 공개 API ── */
  function getSavedPosts() {
    return POSTS.filter(p => _savedPosts.has(p.id));
  }

  function setCurrentPost(postId) {
    _currentPostId = postId;
  }

  function _bindBackBtn() {
    const section = document.querySelector('[data-page="community-post"]');
    const btn = section?.querySelector('[data-action="back"]');
    if (btn) {
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);
      newBtn.addEventListener('click', () => Router.navigate('community'));
    }
  }

  /* ── 더보기 버튼 (내 게시글이면 수정/삭제) ── */
  function _bindMoreBtn(post) {
    const section = document.querySelector('[data-page="community-post"]');
    const btn = section?.querySelector('.comm-post__more');
    if (!btn) return;
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    if (post.author !== '김티모') {
      newBtn.style.visibility = 'hidden';
      return;
    }
    newBtn.style.visibility = 'visible';
    newBtn.addEventListener('click', () => _showEditDeleteSheet(post));
  }

  function _showEditDeleteSheet(post) {
    const sheet = document.getElementById('bottom-sheet');
    const overlay = document.getElementById('bottom-sheet-overlay');
    const list = sheet?.querySelector('.bottom-sheet__list');
    if (!sheet || !list) return;

    list.innerHTML = `
      <li role="menuitem">
        <button class="bottom-sheet__option" id="comm-edit-btn" type="button">✏️ &nbsp;수정하기</button>
      </li>
      <li role="menuitem">
        <button class="bottom-sheet__option bottom-sheet__option--danger" id="comm-delete-btn" type="button">🗑️ &nbsp;삭제하기</button>
      </li>`;

    sheet.setAttribute('aria-hidden', 'false');
    sheet.classList.add('is-open');
    overlay?.classList.add('is-visible');

    document.getElementById('comm-edit-btn')?.addEventListener('click', () => {
      closeBottomSheet();
      _editingPostId = post.id;
      Router.navigate('community-write');
    });

    document.getElementById('comm-delete-btn')?.addEventListener('click', () => {
      closeBottomSheet();
      _deletePost(post.id);
    });
  }

  function _deletePost(postId) {
    const idx = POSTS.findIndex(p => p.id === postId);
    if (idx !== -1) POSTS.splice(idx, 1);
    _savedPosts.delete(postId);
    showToast('게시글이 삭제됐어요.');
    Router.navigate('community');
  }

  return { init, initPost, initWrite, getSavedPosts, setCurrentPost };
})();
