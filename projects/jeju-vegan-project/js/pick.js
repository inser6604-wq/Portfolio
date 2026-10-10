function renderPickCard(restaurant, index) {
  const { id, name, region, opening_hours, description, tags, menu_image } = restaurant;
  const thumb = menu_image ? menu_image.split('|')[0] : '';
  const firstTag = tags ? tags.split('|')[0].trim() : '';
  const delay = (index * 0.1).toFixed(1);
  const extraClass = index >= 6 ? ' card-extra card-hidden' : '';

  return `
    <li class="card place-card${extraClass}" data-sr-delay="${delay}">
      <div class="card-img img-box">
        <img src="image/map-detail/${thumb}" alt="${name}">
      </div>
      <div class="card-body">
        <div class="tag-list">
          ${firstTag ? `<span class="tag">${firstTag}</span>` : ''}
          ${region ? `<span class="tag">${region}</span>` : ''}
        </div>
        <h3 class="card-title">${name}</h3>
        <p class="card-desc">${description || ''}</p>
        <div class="pick-card-info">
          <span>${opening_hours || ''}</span>
          <span>${region || ''}</span>
        </div>
      </div>
    </li>`;
}

async function loadPickCards() {
  const { data, error } = await sb.from('restaurants').select('*').order('id');
  if (error) { console.error('Supabase error:', error); return; }

  const list = document.querySelector('.pick-rest .card-list');
  if (!list) return;
  list.innerHTML = data.map((r, i) => renderPickCard(r, i)).join('');

  // 더보기 버튼 재초기화 (동적 렌더링 후)
  const moreBtn = document.querySelector('.card-more-btn');
  if (!moreBtn) return;
  const extraCards = list.querySelectorAll('.card-extra');
  const icon = moreBtn.querySelector('.card-more-icon');
  const label = moreBtn.querySelector('.card-more-label');

  moreBtn.replaceWith(moreBtn.cloneNode(true)); // 기존 이벤트 제거
  const newBtn = document.querySelector('.card-more-btn');

  newBtn.addEventListener('click', function () {
    const isOpen = newBtn.classList.contains('is-open');
    if (!isOpen) {
      extraCards.forEach(function (card, i) {
        card.classList.remove('card-hidden');
        setTimeout(function () { card.classList.add('is-visible'); }, i * 80 + 30);
      });
      newBtn.classList.add('is-open');
      if (label) label.textContent = '접기';
    } else {
      extraCards.forEach(function (card) {
        card.classList.remove('is-visible');
        card.classList.add('card-hidden');
      });
      newBtn.classList.remove('is-open');
      if (label) label.textContent = '더보기';
    }
    if (icon) icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
  });
}

document.addEventListener('DOMContentLoaded', loadPickCards);
