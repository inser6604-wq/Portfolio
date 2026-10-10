const STATIC_PRICES = ['12,000원', '10,800원', '7,000원'];

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

function parseRating(str) {
  if (!str) return { rating: '-', count: '' };
  const match = str.match(/^([\d.]+)\((\d+)\)/);
  if (match) return { rating: match[1], count: match[2] };
  return { rating: str, count: '' };
}

function renderLeaves(step) {
  const n = parseInt(step) || 0;
  let html = '';
  for (let i = 0; i < 4; i++) {
    html += i < n
      ? `<img src="image/map-leaf-icon.svg" alt="leaf-icon">`
      : `<img src="image/map-nonleaf-icon.svg" alt="leaf-icon">`;
  }
  return html;
}

function renderTags(tagsStr) {
  if (!tagsStr) return '';
  return tagsStr.split('|').filter(Boolean).map(t => {
    const label = TAG_LABEL[t.trim()] || t.trim();
    return `<span class="map-card-tag card-tag">${label}</span>`;
  }).join('');
}

function renderMenus(images, items) {
  if (!images) return '';
  const imgArr = images.split('|').filter(Boolean);
  const itemArr = items ? items.split('|').filter(Boolean) : [];
  return imgArr.map((img, i) => `
    <li class="map-detail-menu card img-box">
      <img src="image/map-detail/${img}" alt="${itemArr[i] || ''}">
      <div class="map-detail-menu-desc">
        <p>${itemArr[i] || ''}</p>
        ${STATIC_PRICES[i] ? `<span>${STATIC_PRICES[i]}</span>` : ''}
      </div>
    </li>`).join('');
}

function renderGallery(images) {
  if (!images) return '';
  const arr = images.split('|').filter(Boolean);
  return `
    <img class="map-detail-head-img1" src="image/map-detail/${arr[0] || ''}" alt="">
    <div class="map-detail-head-img-right">
      <img class="map-detail-head-img2" src="image/map-detail/${arr[1] || ''}" alt="">
      <img class="map-detail-head-img3" src="image/map-detail/${arr[2] || ''}" alt="">
    </div>`;
}

async function loadDetail() {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  if (!id) return;

  const { data, error } = await sb.from('restaurants').select('*').eq('id', id).single();
  if (error || !data) { console.error(error); return; }

  const { name, region, phone, vegan_step, tags, opening_hours, closed_days,
          status, review_rating, description, gallery_images, menu_image, menu_items, address } = data;

  const { rating, count } = parseRating(review_rating);
  const isEnd = status === '영업마감' || status === '영업 마감';
  const timeText = [opening_hours, closed_days ? `${closed_days} 휴무` : ''].filter(Boolean).join(' | ');

  document.querySelector('.map-detail-name').textContent = name;
  document.querySelector('.map-detail-place').textContent = region;
  document.querySelector('.map-detail-rating p').innerHTML = `${rating}<span>(리뷰 ${count}개)</span>`;
  document.querySelector('.map-detail-vegan-leaves').innerHTML = renderLeaves(vegan_step);
  document.querySelector('.map-detail-title .map-card-tags').innerHTML = renderTags(tags);

  const curEl = document.querySelector('.map-detail-cur');
  curEl.textContent = isEnd ? '영업 마감' : '영업 중';
  curEl.classList.toggle('map-cur-end', isEnd);

  document.querySelector('.map-detail-head-img-list').innerHTML = renderGallery(gallery_images);

  const defRights = document.querySelectorAll('.map-detail-def-right');
  defRights[0].textContent = timeText;
  defRights[1].textContent = address;
  defRights[2].textContent = phone;

  document.querySelector('.map-detail-sub-desc').textContent = description;
  document.querySelector('.map-detail-menu-list').innerHTML = renderMenus(menu_image, menu_items);
}

document.addEventListener('DOMContentLoaded', loadDetail);
