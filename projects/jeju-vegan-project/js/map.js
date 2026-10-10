const STATIC_DATA = {
  '카페901':        { speak: '신선하고 혼밥하기 좋아요! 다음에 또 오고 싶어요 ㅎㅎ',                                          course: '🍊서귀포 코스' },
  '그날의조각':     { speak: '비건 디저트 맛집! 비건이 아닌 친구랑 가도 모두 만족했어요.',                                    course: '🏕️한라산 코스' },
  '루루비건':       { speak: '분위기가 너무 좋아요! 유기농 제품이 많아서 자주 오게 됩니다.',                                   course: '🏝️한림공원 코스' },
  '비건테이블 바람':{ speak: '비건 파스타가 이렇게 맛있는지 몰랐네요~ 다음에 또 방문할게요!',                                  course: '🌊협재·금능 코스' },
  'AND유CAFE':      { speak: '아침마다 꼭 들러서 사갑니다. 덕분에 항상 든든하게 하루를 시작해요~^^',                           course: '🌊협재·금능 코스' },
  '다소니 Dasoni':  { speak: '고즈넉한 분위기, 정갈한 음식, 시골집에 놀러온 느낌으로 따뜻한 한 끼를 먹을 수 있는 곳이에요~',  course: '🍊서귀포 코스' },
  '러빙헛':         { speak: '뜨끈한 뚝배기 생각날 때마다 방문하는 곳이에요. 논비건 친구들도 맛있다고 하네요!',               course: '🏝️한림공원 코스' },
  '선샤인워크':     { speak: '방문할때마다 친절하게 맞아주셔서 기분 좋게 구매하고 갑니다.',                                    course: null },
  '숲속의 도토리':  { speak: '식당 이름처럼 도토리 맛집입니다 ㅎㅎ!! 다음에 또 올게요~',                                      course: null },
  '푸른솔맑은향':   { speak: '여기만큼 연잎밥 맛있는 곳 못 봤네요. 최고입니다.',                                             course: null },
};

const TAG_LABEL = {
  '완전비건':      '🌱 완전 비건',
  '완전 비건':     '🌱 완전 비건',
  '비건옵션':      '🥗 비건 옵션',
  '비건 옵션':     '🥗 비건 옵션',
  '베지테리언':    '🍽️ 베지테리언',
  '논비건':        '🍖 논비건',
  '글루텐프리':    '🫘 글루텐프리',
  '반려동물동반':  '🐾 반려동물 동반',
  '반려동물 동반': '🐾 반려동물 동반',
  '주차가능':      '🚗 주차가능',
  '주차 가능':     '🚗 주차가능',
  '혼밥':          '#혼밥',
  '논비건동행':    '#논비건 동행',
  '논비건 동행':   '#논비건 동행',
  '가족외식':      '#가족 외식',
  '가족 외식':     '#가족 외식',
  '아이동반':      '#아이 동반',
  '아이 동반':     '#아이 동반',
};

const FILTER_GROUPS = {
  'map-filter1': 'status',
  'map-filter2': 'audience',
  'map-filter3': 'vegan',
  'map-filter4': 'extra',
  'map-filter5': 'course',
};

const mapState = {
  restaurants: [],
  query: '',
  filters: {
    status: new Set(),
    audience: new Set(),
    vegan: new Set(),
    extra: new Set(),
    course: new Set(),
  },
  isExpanded: false,
};

function normalize(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[🌱🥗🍽️🍖🫘🐾🚗🏕️🍊🌊🏝️#·\s]/g, '');
}

function getFilterGroup(button) {
  return Object.entries(FILTER_GROUPS).find(([className]) => button.closest(`.${className}`))?.[1] || null;
}

function getButtonValue(button) {
  return normalize(button.textContent);
}

function getRestaurantTags(restaurant) {
  return String(restaurant.tags || '')
    .split('|')
    .filter(Boolean)
    .map(normalize);
}

function matchesAny(values, candidates) {
  return values.size === 0 || [...values].some((value) => candidates.includes(value));
}

function isRestaurantMatched(restaurant) {
  const query = normalize(mapState.query);
  const searchable = [restaurant.name, restaurant.address, restaurant.region]
    .map(normalize)
    .join('');
  const tags = getRestaurantTags(restaurant);
  const course = normalize(STATIC_DATA[restaurant.name]?.course);

  return (
    (!query || searchable.includes(query)) &&
    matchesAny(mapState.filters.status, [normalize(restaurant.status)]) &&
    matchesAny(mapState.filters.audience, tags) &&
    matchesAny(mapState.filters.vegan, tags) &&
    matchesAny(mapState.filters.extra, tags) &&
    matchesAny(mapState.filters.course, course ? [course] : [])
  );
}

function hasActiveSearchOrFilters() {
  return Boolean(mapState.query.trim()) || Object.values(mapState.filters).some((values) => values.size > 0);
}

function parseRating(str) {
  if (!str) return { rating: '-', count: '' };
  const match = str.match(/^([\d.]+)\((\d+)\)/);
  if (match) return { rating: match[1], count: match[2] };
  return { rating: str, count: '' };
}

function renderTags(tagsStr) {
  if (!tagsStr) return '';
  return tagsStr.split('|').filter(Boolean).map(t => {
    const label = TAG_LABEL[t.trim()] || t.trim();
    return `<span class="map-card-tag card-tag">${label}</span>`;
  }).join('');
}

function renderStatusBadge(status) {
  const isEnd = status === '영업마감' || status === '영업 마감';
  return isEnd
    ? `<span class="map-info-cur map-list-cur map-cur-end map-list-end">영업 마감</span>`
    : `<span class="map-info-cur map-list-cur">영업 중</span>`;
}

function renderCard(restaurant, index, shouldHide) {
  const { id, name, address, opening_hours, closed_days, status, review_rating, tags, gallery_images } = restaurant;
  const { rating, count } = parseRating(review_rating);
  const thumb = gallery_images ? gallery_images.split('|')[0] : '';
  const timeText = [opening_hours, closed_days ? `${closed_days} 휴무` : ''].filter(Boolean).join(' | ');
  const delay = (index * 0.1).toFixed(1);
  const hiddenClass = shouldHide ? ' map-hidden' : '';
  const { speak, course } = STATIC_DATA[name] || {};
  return `
    <li class="map-place-card card place-card${hiddenClass}">
      <a href="map-detail.html?id=${id}" class="map-place-card-inner">
        <img class="map-place-card-img" src="image/map-detail/${thumb}" alt="${name}">
        <div class="map-card-inner">
          <div class="map-card-top">
            <p class="map-card-title">${name}</p>
            <p class="card-place">${address}</p>
            <p class="card-time">${timeText}</p>
            <div class="card-rating like-btn">
              <img class="like-icon" src="image/map-star-icon.svg" alt="star-icon">
              <p>${rating} <span>(${count})</span></p>
            </div>
          </div>
          ${speak ? `<p class="map-card-speak">${speak}</p>` : ''}
          <div class="map-card-tags card-tags">
            ${renderTags(tags)}
          </div>
        </div>
        ${renderStatusBadge(status)}
        ${course ? `<span class="map-info-cur map-course-badge">${course}</span>` : ''}
      </a>
    </li>`;
}

function updatePins(restaurants) {
  const visibleNames = new Set(restaurants.map((restaurant) => restaurant.name));
  document.querySelectorAll('.map-pin[data-restaurant-name]').forEach((pin) => {
    const isVisible = visibleNames.has(pin.dataset.restaurantName);
    pin.hidden = !isVisible;
    pin.setAttribute('aria-hidden', String(!isVisible));
  });
}

function updateMoreButton(resultCount, isFiltered) {
  const button = document.querySelector('.map-list-tab');
  if (!button) return;

  const canExpand = !isFiltered && resultCount > 5;
  button.hidden = !canExpand;
  if (!canExpand) return;

  button.classList.toggle('active', !mapState.isExpanded);
  const icon = button.querySelector('img');
  if (icon) icon.style.transform = mapState.isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
  const label = button.querySelector('.map-list-tab-label');
  if (label) label.textContent = mapState.isExpanded ? '접기' : '더보기';
}

function renderResults() {
  const list = document.querySelector('.map-card-list');
  const emptyMessage = document.querySelector('.map-empty-message');
  if (!list || !emptyMessage) return;

  const isFiltered = hasActiveSearchOrFilters();
  const results = mapState.restaurants.filter(isRestaurantMatched);
  const visibleLimit = isFiltered || mapState.isExpanded ? results.length : 5;

  list.innerHTML = results.map((restaurant, index) => renderCard(restaurant, index, index >= visibleLimit)).join('');
  emptyMessage.hidden = results.length !== 0;
  updatePins(results);
  updateMoreButton(results.length, isFiltered);
}

function resetFilters() {
  mapState.query = '';
  mapState.isExpanded = false;
  Object.values(mapState.filters).forEach((values) => values.clear());
  const searchInput = document.querySelector('.map-search input');
  if (searchInput) searchInput.value = '';
  document.querySelectorAll('.map-btn.active').forEach((button) => button.classList.remove('active'));
  renderResults();
}

function bindMapControls() {
  const searchInput = document.querySelector('.map-search input');
  const resetButton = document.querySelector('#map-reset');
  const applyButton = document.querySelector('.map-apply');
  const moreButton = document.querySelector('.map-list-tab');

  document.querySelectorAll('.map-btn').forEach((button) => {
    const group = getFilterGroup(button);
    if (!group) return;

    button.addEventListener('click', () => {
      const value = getButtonValue(button);
      const values = mapState.filters[group];
      if (values.has(value)) {
        values.delete(value);
        button.classList.remove('active');
      } else {
        values.add(value);
        button.classList.add('active');
      }
      mapState.isExpanded = false;
      renderResults();
    });
  });

  searchInput?.addEventListener('input', () => {
    mapState.query = searchInput.value;
    mapState.isExpanded = false;
    renderResults();
  });

  resetButton?.addEventListener('click', resetFilters);
  applyButton?.addEventListener('click', (event) => {
    event.preventDefault();
    renderResults();
  });
  moreButton?.addEventListener('click', () => {
    mapState.isExpanded = !mapState.isExpanded;
    renderResults();
  });
}

async function loadRestaurants() {
  const { data, error } = await sb.from('restaurants').select('*').order('id');
  if (error) { console.error('Supabase error:', error); return; }

  mapState.restaurants = data || [];
  renderResults();
}

document.addEventListener('DOMContentLoaded', () => {
  bindMapControls();
  loadRestaurants();
});
