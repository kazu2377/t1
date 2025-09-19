(function () {
  'use strict';

  // --- Mock Data -----------------------------------------------------------
  const games = [
    {
      id: 'stardew',
      title: 'Stardew Valley',
      genre: 'Simulation',
      releaseDate: '2016-02-26',
      description: '田舎で農場を運営し、鉱山探索や住人との交流を楽しむスローライフゲーム。',
      image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8b?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'elden',
      title: 'ELDEN RING',
      genre: 'Action RPG',
      releaseDate: '2022-02-25',
      description: '広大なオープンフィールドを探索し、強大な敵に挑む高難度アクションRPG。',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'zelda',
      title: 'ゼルダの伝説 ティアーズ オブ ザ キングダム',
      genre: 'Adventure',
      releaseDate: '2023-05-12',
      description: 'ハイラルを舞台に、自由度の高い発想で謎を解くアクションアドベンチャー。',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'ff7r',
      title: 'FINAL FANTASY VII REMAKE',
      genre: 'JRPG',
      releaseDate: '2020-04-10',
      description: '伝説的RPGのリメイク。分作構成で、ミッドガル編を再構築。',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'hades',
      title: 'Hades',
      genre: 'Rogue-like Action',
      releaseDate: '2020-09-17',
      description: '冥界からの脱出を目指すテンポ良いローグライクアクション。',
      image: 'https://images.unsplash.com/photo-1548095115-45697e51380b?q=80&w=1200&auto=format&fit=crop'
    }
  ];

  const a = () =>console.log('ダミーの関数'); // ダミーの関数
  // Utilities ---------------------------------------------------------------
  const qs = (sel, el = document) => el.querySelector(sel);
  const qsa = (sel, el = document) => Array.from(el.querySelectorAll(sel));

  function formatDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${y}/${m}/${dd}`;
  }

  function getGameById(id) {
    return games.find(g => g.id === id);
  }

  // List Rendering ----------------------------------------------------------
  function renderList(filterText = '') {
    const listEl = qs('#gameList');
    if (!listEl) return;

    listEl.innerHTML = '';
    const frag = document.createDocumentFragment();
    const keyword = filterText.trim().toLowerCase();
    const filtered = keyword
      ? games.filter(g => g.title.toLowerCase().includes(keyword))
      : games;

    if (filtered.length === 0) {
      const empty = document.createElement('li');
      empty.className = 'card card--empty';
      empty.innerHTML = `
        <div class="card-body">
          <h2 class="title">該当するゲームはありません</h2>
          <p class="meta">キーワードを変更して検索してください。</p>
        </div>
      `;
      frag.appendChild(empty);
      listEl.appendChild(frag);
      return;
    }

    filtered.forEach(g => {
      const li = document.createElement('li');
      li.className = 'card';
      li.innerHTML = `
        <a href="./detail.html?id=${encodeURIComponent(g.id)}" aria-label="${g.title} の詳細">
          <img class="thumb" src="${g.image || ''}" alt="${g.title} のカバー画像" onerror="this.style.display='none'" />
          <div class="card-body">
            <h2 class="title">${g.title}</h2>
            <p class="meta">${g.genre}${g.releaseDate ? ' ・ 発売日: ' + formatDate(g.releaseDate) : ''}</p>
          </div>
        </a>
      `;
      frag.appendChild(li);
    });
    listEl.appendChild(frag);
  }

  // Detail Rendering --------------------------------------------------------
  function renderDetail() {
    const card = qs('#detailCard');
    if (!card) return;

    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const g = id ? getGameById(id) : null;

    if (!g) {
      card.innerHTML = `
        <p>該当するゲームが見つかりませんでした。</p>
        <p><a class="back-link" href="./list.html">一覧へ戻る</a></p>
      `;
      return;
    }

    card.innerHTML = `
      <div class="detail-hero">
        <img class="detail-thumb" src="${g.image || ''}" alt="${g.title} のカバー画像" onerror="this.style.display='none'" />
        <div>
          <h2 class="detail-title">${g.title}</h2>
          <p class="detail-meta">${g.genre} ・ 発売日: ${formatDate(g.releaseDate)}</p>
          <p class="detail-desc">${g.description}</p>
          <p style="margin-top:12px"><a class="back-link" href="./list.html">← 一覧へ戻る</a></p>
        </div>
      </div>
    `;
  }

  // Entry ------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.getAttribute('data-page');
    if (page === 'list') {
      renderList();
      const filterInput = qs('#filterInput');
      if (filterInput) {
        filterInput.addEventListener('input', ev => {
          renderList(ev.target.value || '');
        });
      }
    }
    if (page === 'detail') renderDetail();
  });

  // テスト用の簡易エクスポート。通常利用には影響しない。
  if (typeof window !== 'undefined') {
    window.__mockApp = {
      games,
      formatDate,
      getGameById,
      renderList,
      renderDetail
    };
  }
})();
