(function () {
  'use strict';

  const PRODUCTS = [
    {
      id: 'p1',
      title: 'Heirloom lace shawl',
      description: 'Hand-finished botanical lace in merino silk. One-of-a-kind drape for evenings and gifting.',
      price: 124,
      category: 'Textiles',
      image: 'assets/crochet1.jpg',
      creator: 'Elena Vance',
      avatar: 'https://placehold.co/72x72/e8dfd9/8d3419?text=EV',
    },
    {
      id: 'p2',
      title: 'Embroidered linen tote',
      description: 'Botanical stem stitch on heavy linen. Reinforced straps and interior pocket.',
      price: 86,
      category: 'Textiles',
      image: 'assets/emb.jpg',
      creator: 'Mira Okonkwo',
      avatar: 'https://placehold.co/72x72/f3d8d0/8d3419?text=MO',
    },
    {
      id: 'p3',
      title: 'Chunky merino throw',
      description: 'Warm cable knit in undyed merino. Sized for sofa or reading nook.',
      price: 198,
      category: 'Textiles',
      image: 'assets/crochet2.jpg',
      creator: 'Elena Vance',
      avatar: 'https://placehold.co/72x72/e8dfd9/8d3419?text=EV',
    },
    {
      id: 'p4',
      title: 'Stoneware pour-over set',
      description: 'Matte glaze, thumb rest, and matching dripper. Dishwasher safe.',
      price: 72,
      category: 'Ceramics',
      image: 'assets/craft.jpg',
      creator: 'Jon Reyes',
      avatar: 'https://placehold.co/72x72/efe7e2/8d3419?text=JR',
    },
    {
      id: 'p5',
      title: 'Speckled ramen bowl pair',
      description: 'Food-safe stoneware with hand-trimmed foot. Sold as a set of two.',
      price: 58,
      category: 'Ceramics',
      image: 'assets/craft.jpg',
      creator: 'Sofia Lind',
      avatar: 'https://placehold.co/72x72/dceac8/5d5d5d?text=SL',
    },
    {
      id: 'p6',
      title: 'Letterpress thank-you pack',
      description: 'Twelve cotton cards with debossed border. Envelopes included.',
      price: 34,
      category: 'Paper & print',
      image: 'assets/mirror.png',
      creator: 'The Paper Mill Co.',
      avatar: 'https://placehold.co/72x72/ececec/8d3419?text=PM',
    },
    {
      id: 'p7',
      title: 'Monogrammed stationery suite',
      description: 'Custom initials, warm white stock, and wax seal starter kit.',
      price: 92,
      category: 'Paper & print',
      image: 'assets/mirror.png',
      creator: 'The Paper Mill Co.',
      avatar: 'https://placehold.co/72x72/ececec/8d3419?text=PM',
    },
    {
      id: 'p8',
      title: 'Forged brass cuff',
      description: 'Hammered texture with soft oval profile. Adjustable fit.',
      price: 64,
      category: 'Jewelry',
      image: 'assets/globe.png',
      creator: 'Amara Singh',
      avatar: 'https://placehold.co/72x72/fdf7f3/8d3419?text=AS',
    },
    {
      id: 'p9',
      title: 'River stone pendant',
      description: 'Tumbled local stone on silk cord. Each silhouette is unique.',
      price: 48,
      category: 'Jewelry',
      image: 'assets/creator.png',
      creator: 'Amara Singh',
      avatar: 'https://placehold.co/72x72/fdf7f3/8d3419?text=AS',
    },
    {
      id: 'p10',
      title: 'Arched wall mirror',
      description: 'Hand-cut glass with soft brass frame. Ready to hang.',
      price: 210,
      category: 'Home',
      image: 'assets/mirror.png',
      creator: 'Leo Park',
      avatar: 'https://placehold.co/72x72/e8dfd9/8d3419?text=LP',
    },
    {
      id: 'p11',
      title: 'Woven table runner',
      description: 'Neutral stripe in cotton and linen blend. Machine wash gentle.',
      price: 54,
      category: 'Home',
      image: 'assets/crochet2.jpg',
      creator: 'Mira Okonkwo',
      avatar: 'https://placehold.co/72x72/f3d8d0/8d3419?text=MO',
    },
    {
      id: 'p12',
      title: 'Studio desk calendar',
      description: 'Risograph months on recycled stock. Stand included.',
      price: 28,
      category: 'Paper & print',
      image: 'assets/calc.png',
      creator: 'The Paper Mill Co.',
      avatar: 'https://placehold.co/72x72/ececec/8d3419?text=PM',
    },
  ];

  const categories = ['All', ...new Set(PRODUCTS.map((p) => p.category))];

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatPrice(n) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
  }

  const searchInput = document.getElementById('store-search');
  const pillsRoot = document.getElementById('category-pills');
  const grid = document.getElementById('product-grid');
  const countEl = document.getElementById('storefront-count');
  const emptyEl = document.getElementById('storefront-empty');

  let activeCategory = 'All';

  function matchesSearch(p, q) {
    if (!q) return true;
    const hay = (p.title + ' ' + p.description + ' ' + p.creator + ' ' + p.category).toLowerCase();
    return hay.includes(q);
  }

  function matchesCategory(p) {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  }

  function getFiltered() {
    const q = searchInput.value.trim().toLowerCase();
    return PRODUCTS.filter((p) => matchesCategory(p) && matchesSearch(p, q));
  }

  function syncPillAria() {
    pillsRoot.querySelectorAll('.storefront-pill').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.category === activeCategory ? 'true' : 'false');
    });
  }

  function buildPills() {
    pillsRoot.innerHTML = '';
    categories.forEach(function (cat) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'storefront-pill';
      btn.textContent = cat;
      btn.dataset.category = cat;
      btn.addEventListener('click', function () {
        activeCategory = cat;
        syncPillAria();
        updateGrid();
      });
      pillsRoot.appendChild(btn);
    });
    syncPillAria();
  }

  function updateGrid() {
    const list = getFiltered();
    if (list.length === 0) {
      grid.innerHTML = '';
      emptyEl.hidden = false;
      countEl.textContent = 'No listings match your filters.';
      return;
    }

    emptyEl.hidden = true;
    countEl.textContent = list.length === 1 ? '1 listing' : list.length + ' listings';

    grid.innerHTML = list
      .map(function (p) {
        return (
          '<article class="product-card" data-id="' +
          esc(p.id) +
          '">' +
          '<a href="#" class="product-card-link">' +
          '<div class="product-card-image-wrap">' +
          '<img class="product-card-img" src="' +
          esc(p.image) +
          '" alt="" width="640" height="480" loading="lazy" />' +
          '<span class="product-card-badge">' +
          esc(p.category) +
          '</span>' +
          '</div>' +
          '<div class="product-card-body">' +
          '<h2 class="product-card-title">' +
          esc(p.title) +
          '</h2>' +
          '<p class="product-card-desc">' +
          esc(p.description) +
          '</p>' +
          '<div class="product-card-footer">' +
          '<span class="product-card-price">' +
          esc(formatPrice(p.price)) +
          '</span>' +
          '<span class="product-card-creator">' +
          '<img class="product-card-avatar" src="' +
          esc(p.avatar) +
          '" alt="" width="36" height="36" loading="lazy" />' +
          '<span class="product-card-creator-name">' +
          esc(p.creator) +
          '</span>' +
          '</span>' +
          '</div>' +
          '</div>' +
          '</a>' +
          '</article>'
        );
      })
      .join('');
  }

  buildPills();
  searchInput.addEventListener('input', updateGrid);
  updateGrid();
})();
