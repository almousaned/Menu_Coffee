/**
 * CUPFFEE — Premium Café Menu
 * script.js — Data, Rendering & Interactivity
 *
 * Features:
 *  - Full menu data (all 25 categories from the original menu)
 *  - Dynamic DOM rendering from structured data
 *  - Live search with highlighting
 *  - Category filter navigation (tabs)
 *  - Sticky nav with active-section detection (IntersectionObserver)
 *  - Smooth scroll to sections
 *  - Dark / Light theme toggle (persisted in localStorage)
 *  - Scroll-triggered fade-in animations
 *  - Back-to-top button
 *  - Category nav horizontal scroll controls
 */

'use strict';

/* ═══════════════════════════════════════════════════════════════
   MENU DATA
   Organized exactly as per the original printed menu (10 pages)
═══════════════════════════════════════════════════════════════ */
const MENU_DATA = [

  /* ── PAGE 1: PETIT DÉJEUNER ── */
  {
    id: 'petit-dejeuner',
    label: 'Petit Déjeuner',
    navLabel: 'Petit Déj.',
    icon: '🌅',
    layout: 'featured',   // render items as large featured cards
    sections: [
      {
        name: null,
        items: [
          {
            name: 'BONJOUR',
            price: 9,
            featured: true,
            description: 'Café au choix + Jus + (Croissant ou Cake) + Eau 0.5 L'
          },
          {
            name: 'MATINAL',
            price: 20,
            featured: true,
            description: 'Café au choix + Jus + (Croissant ou Cake ou bien Pain Perdu) + (Mini Omelette ou Toast Oeuf Poché) + Fondant au Chocolat + Beurre + Confiture + Nutella + Pain + Yaourt + Granola + Eau 0.5 L'
          },
          {
            name: 'SALÉ',
            price: 25,
            featured: true,
            description: 'Café au choix + Jus + Croissant Salé + (Mini-Omelette ou Toast Oeuf Poché) + Charcuterie + Harissa + Fraidoux + Mayonnaise, Nuggets, Boule Fromagère + Pain + Yaourt + Granola + Eau 0.5 L'
          },
          {
            name: 'PACHA',
            price: 36,
            featured: true,
            description: 'Café au choix + Jus + (Croissant ou Cake ou bien Pain Perdu) + (Mini-Omelette ou Toast Oeuf Poché) + (Mini-Crêpe Nutella ou Mini-Gaufre) + Charcuterie Fromage + Nuggets + Boule Fromagère + Yaourt + Granola + Fondant Chocolat + Beurre + Confiture + Nutella + Harissa + Mayonnaise + Pain + Eau 0.5 L'
          },
          {
            name: 'BAMBINO',
            price: 16,
            featured: true,
            tag: 'free',
            tagLabel: '🎁 Free Gift',
            description: 'Café au Lait + Grain d\'Or + Jus + (Mini Gaufre ou Mini Crêpe Nutella) + Yaourt + Surprise'
          }
        ]
      }
    ]
  },

  /* ── PAGE 2: CAFÉ & BOISSONS CHAUDES ── */
  {
    id: 'cafe',
    label: 'Café & Chaud',
    navLabel: 'Café',
    icon: '☕',
    layout: 'list',
    sections: [
      {
        name: 'CAFÉ',
        framed: false,
        items: [
          { name: 'Express',         price: 3.3  },
          { name: 'Americain',       price: 3.5  },
          { name: 'Cappucin',        price: 3.5  },
          { name: 'Café Crème',      price: 4    },
          { name: 'Café Turc',       price: 5    }
        ]
      },
      {
        name: 'CAFÉ AROMATISÉ',
        framed: true,
        items: [
          { name: 'Chocolat au Lait',   price: 5 },
          { name: 'Cappucino',          price: 7 },
          { name: 'Caramel',            price: 7 },
          { name: 'Nescafé',            price: 7 },
          { name: 'Noisette',           price: 7 },
          { name: 'Supplément Nestlé',  price: 3 }
        ]
      },
      {
        name: 'CHOCOLAT CHAUD',
        framed: true,
        items: [
          { name: 'Classique',         price: 10 },
          { name: 'Nutella Chantilly', price: 12 }
        ]
      },
      {
        name: 'CUP COOKIE CAFÉ',
        framed: true,
        tag: 'new',
        tagLabel: 'NEW',
        items: [
          { name: 'Cup Cookie Expresso / Cappucin',   price: 6  },
          { name: 'Cup Cookie Americain / Café Crème',price: 8  },
          { name: 'Cup Cookie Iced Coffee',           price: 12 },
          { name: 'Cup Cookie Chocolat Chaud',        price: 13 },
          { name: 'Cup Cookie Yaourt Glacé / 1 Topping', price: 15 },
          { name: 'Cup Cookie Yaourt Glacé Pacha',    price: 18 }
        ]
      }
    ]
  },

  /* ── PAGE 3: VIENNOISERIE & DESSERTS ── */
  {
    id: 'viennoiserie',
    label: 'Viennoiserie & Desserts',
    navLabel: 'Viennoiserie',
    icon: '🥐',
    layout: 'list',
    sections: [
      {
        name: 'VIENNOISERIE',
        framed: false,
        items: [
          { name: 'Croissant Nature',      price: 3.5 },
          { name: 'Pain au Chocolat',      price: 3.5 },
          { name: 'Cake / Muffin',         price: 3.5 },
          { name: 'Cake Citron',           price: 4   },
          { name: 'Croissant Amande',      price: 4.5 },
          { name: 'Amandine Claudana',     price: 6   },
          { name: 'Miscovich',             price: 6   },
          { name: 'Gâteau Turc Trilece',   price: 6   },
          { name: 'Croissant Salé',        price: 7   }
        ]
      },
      {
        name: 'CAFÉ GOURMAND',
        framed: true,
        gourmand: true,
        price: 12,
        description: 'Café au choix + Cheesecake ou Sansebastian ou Tiramisu ou Fondant au Chocolat ou Pain Perdu',
        items: []
      },
      {
        name: 'ARTICLES SUCRÉS GOURMANDS',
        framed: false,
        items: [
          { name: 'Cheesecake',                          price: 10 },
          { name: 'Tiramisu',                            price: 11 },
          { name: 'Fondant au Chocolat + Boule de Glace',price: 11 },
          { name: 'Cheesecake Sansebastian',             price: 12 }
        ]
      }
    ]
  },

  /* ── PAGE 4: CAFÉ GLACÉ, MILKSHAKE & FRAPPUCINO ── */
  {
    id: 'boissons-froides-cafe',
    label: 'Café Glacé & Shakes',
    navLabel: 'Café Glacé',
    icon: '🧋',
    layout: 'list',
    sections: [
      {
        name: 'CAFÉ GLACÉ',
        framed: false,
        items: [
          { name: 'Vanille',   price: 8  },
          { name: 'Noisette',  price: 8  },
          { name: 'Caramel',   price: 8  },
          { name: 'Nutella',   price: 10 },
          { name: 'Speculoos', price: 10 }
        ]
      },
      {
        name: 'MILKSHAKE',
        framed: true,
        items: [
          { name: 'Oreo',      price: 12 },
          { name: 'Caramel',   price: 12 },
          { name: 'Vanille',   price: 12 },
          { name: 'Nutella',   price: 14 },
          { name: 'Speculoos', price: 14 }
        ]
      },
      {
        name: 'FRAPPUCINO',
        framed: true,
        items: [
          { name: 'Caramel',   price: 10 },
          { name: 'Noisette',  price: 10 },
          { name: 'Speculoos', price: 12 },
          { name: 'Nutella',   price: 12 }
        ]
      }
    ]
  },

  /* ── PAGE 5: JUS, COCKTAILS, MOJITO & SMOOTHIE ── */
  {
    id: 'boissons',
    label: 'Jus, Cocktails & Smoothies',
    navLabel: 'Boissons Froides',
    icon: '🥤',
    layout: 'two-col',
    sections: [
      {
        name: 'JUS',
        col: 1,
        items: [
          { name: 'Citronnade', price: 7  },
          { name: 'Orange',     price: 7  },
          { name: 'Fraise',     price: 10 },
          { name: 'Kiwi',       price: 12 }
        ]
      },
      {
        name: 'COCKTAILS',
        col: 2,
        items: [
          { name: 'Fraise Banane',           price: 12 },
          { name: 'Lait de Poule',           price: 12 },
          { name: 'Granit Citron Menthe',    price: 12 },
          { name: 'Granit Bleu',             price: 13 },
          { name: 'Kiwi Banane',             price: 14 },
          { name: 'Fraise Kiwi Banane',      price: 15 },
          { name: 'Banane-Dattes-Fruits Secs', price: 16 }
        ]
      },
      {
        name: 'MOJITO',
        col: 1,
        items: [
          { name: 'Virgin',        price: 10 },
          { name: 'Bleu / Yellow', price: 11 },
          { name: 'Fruits Rouges', price: 13 },
          { name: 'Énergétique',   price: 15 }
        ]
      },
      {
        name: 'SMOOTHIE',
        col: 2,
        items: [
          { name: 'Ananas Piña Colada', price: 12 },
          { name: 'Fruits Rouges',      price: 13 },
          { name: 'Kiwi Banane',        price: 13 },
          { name: 'Pêche',              price: 13 }
        ]
      }
    ]
  },

  /* ── PAGE 6: YAOURT GLACÉ ── */
  {
    id: 'yaourt-glace',
    label: 'Yaourt Glacé',
    navLabel: 'Yaourt Glacé',
    icon: '🍦',
    layout: 'list',
    sections: [
      {
        name: 'YAOURT GLACÉ',
        framed: false,
        tag: 'new',
        tagLabel: 'NEW',
        items: [
          {
            name: 'BAMBINO',
            price: 11,
            description: 'Yaourt Glacé + Nutella + Sprinkles'
          },
          {
            name: 'LOTUS',
            price: 14,
            description: 'Yaourt Glacé + Sauce Speculoos + Lotus'
          },
          {
            name: 'CHOCO LOVER',
            price: 13,
            description: 'Yaourt Glacé + Nutella + Fruits Secs'
          },
          {
            name: 'FRUITÉ',
            price: 14,
            description: 'Yaourt Glacé + Fruits de Saison'
          },
          {
            name: 'PISTACHIO',
            price: 15,
            description: 'Yaourt Glacé + Sauce Pistache + Pistache'
          }
        ]
      }
    ]
  },

  /* ── PAGE 7: CRÊPE-PAIN PERDU (sucré) & GAUFRE-PANCAKE ── */
  {
    id: 'crepe-sucre',
    label: 'Crêpes & Gaufres',
    navLabel: 'Crêpes',
    icon: '🫓',
    layout: 'list',
    sections: [
      {
        name: 'CRÊPE — PAIN PERDU',
        framed: false,
        items: [
          { name: 'Nutella',                                          price: 11 },
          { name: 'Oreo',                                             price: 12 },
          { name: 'Speculoos',                                        price: 12 },
          { name: 'Caramel Beurre Salé',                              price: 12 },
          { name: 'Fruits Rouges',                                    price: 13 },
          { name: 'Nutella Fruits Frais',                             price: 15 },
          { name: 'Nutella Fruits Secs',                              price: 15 },
          { name: 'Pistache Fruits Rouge',                            price: 16 },
          { name: 'Crêpe Tagliatelle + Chocolat Blanc + Fruits Secs + Fruits', price: 16 }
        ]
      },
      {
        name: 'GAUFRE — PANCAKE',
        framed: true,
        items: [
          { name: 'Nutella',             price: 12 },
          { name: 'Speculoos',           price: 14 },
          { name: 'Nutella Fruits Frais',price: 17 },
          { name: 'Nutella Fruits Secs', price: 17 }
        ]
      }
    ]
  },

  /* ── PAGE 8: SALÉ (Crêpe/Omelette/Pain Perdu, Tacos/Sandwich, Plat) ── */
  {
    id: 'sale',
    label: 'Salé',
    navLabel: 'Salé',
    icon: '🍽️',
    layout: 'list',
    sections: [
      {
        name: 'CRÊPE — OMELETTE — PAIN PERDU',
        framed: false,
        items: [
          { name: 'Jambon Fromage',                         price: 11 },
          { name: 'Thon Fromage',                           price: 13 },
          { name: 'Végétarien : Légumes Sautés + Fromage',  price: 13 },
          { name: 'Pepperoni + Oignon Caramélisé',          price: 13 },
          { name: 'Jambon + Œuf + Fromage',                 price: 14 },
          { name: 'Poulet Panée',                           price: 15 },
          { name: 'Poulet Sauce Champignon',                price: 16 }
        ]
      },
      {
        name: 'TACOS — SANDWICH',
        framed: true,
        items: [
          { name: 'Thon',                    price: 14 },
          { name: 'Escalope Panée',          price: 16 },
          { name: 'Escalope Grillée',        price: 16 },
          { name: 'Poulet Sauce Champignon', price: 18 }
        ]
      },
      {
        name: 'PLAT',
        framed: true,
        items: [
          { name: 'Escalope Grillée',        price: 20 },
          { name: 'Escalope Panée',          price: 22 },
          { name: 'Poulet Sauce Champignon', price: 25 }
        ]
      }
    ]
  },

  /* ── PAGE 9: THÉ, BOISSON, JAWJEM & CHICHA ── */
  {
    id: 'the-chicha',
    label: 'Thé, Boisson & Chicha',
    navLabel: 'Thé & Chicha',
    icon: '🌿',
    layout: 'list',
    sections: [
      {
        name: 'THÉ',
        framed: false,
        items: [
          { name: 'Thé Vert',           price: 2.8 },
          { name: 'Thé à la Menthe',    price: 4   },
          { name: 'Thé Infusion',       price: 6   },
          { name: 'Thé Amande',         price: 7   },
          { name: 'Thé aux Fruits Secs',price: 9   },
          { name: 'Thé Pignon',         price: 12  }
        ]
      },
      {
        name: 'BOISSON',
        framed: false,
        items: [
          { name: 'Eau 0.5 L',           price: 2  },
          { name: 'Eau 1 L',             price: 4  },
          { name: 'Soda Canette',        price: 6  },
          { name: 'Boisson Énergétique', price: 12 }
        ]
      },
      {
        name: 'JAWJEM',
        framed: false,
        items: [
          { name: 'Jwajem Pacha', price: 15 }
        ]
      },
      {
        name: 'CHICHA',
        framed: false,
        items: [
          { name: 'Chicha', price: 10 },
          { name: 'Love',   price: 12 }
        ]
      }
    ]
  }
];

/* ═══════════════════════════════════════════════════════════════
   RENDERING
═══════════════════════════════════════════════════════════════ */

/**
 * Format a price number (e.g. 3.3 → "3.3", 10 → "10")
 */
function formatPrice(price) {
  return Number.isInteger(price) ? String(price) : price.toFixed(1);
}

/**
 * Build standard price HTML (value + DT superscript)
 */
function priceHTML(price) {
  return `<span class="item-price">
    <span class="price-value">${formatPrice(price)}</span
    ><sup class="price-dt">DT</sup>
  </span>`;
}

/**
 * Build the badge price (dark green seal) for featured items
 */
function priceBadgeHTML(price) {
  return `<div class="price-badge" aria-label="${formatPrice(price)} DT">
    <span class="price-value">${formatPrice(price)}</span>
    <span class="price-dt">DT</span>
  </div>`;
}

/**
 * Build a tag pill (NEW / FREE GIFT / etc.)
 */
function tagHTML(tag, label) {
  if (!tag) return '';
  return `<span class="item-tag item-tag--${tag}">${label}</span>`;
}

/**
 * Build a single FEATURED menu item (breakfast combos)
 */
function renderFeaturedItem(item) {
  const tag = item.tag ? tagHTML(item.tag, item.tagLabel) : '';
  return `
  <li class="menu-item menu-item--featured fade-in" role="article">
    <div class="item-left">
      <p class="item-name">${item.name}${tag}</p>
      ${item.description ? `<p class="item-desc">${item.description}</p>` : ''}
    </div>
    ${priceBadgeHTML(item.price)}
  </li>`;
}

/**
 * Build a single STANDARD list item
 */
function renderListItem(item) {
  const tag = item.tag ? tagHTML(item.tag, item.tagLabel) : '';
  const desc = item.description ? `<p class="item-desc">${item.description}</p>` : '';
  return `
  <li class="menu-item fade-in" role="article">
    <div class="item-left">
      <p class="item-name">${item.name}${tag}</p>
      ${desc}
    </div>
    ${priceHTML(item.price)}
  </li>`;
}

/**
 * Build a CAFÉ GOURMAND box (special single-item featured box)
 */
function renderGourmandBox(section) {
  return `
  <div class="gourmand-box fade-in" role="article">
    <div class="gourmand-desc">
      <p class="item-name">${section.name}</p>
      <p class="item-desc">${section.description}</p>
    </div>
    ${priceBadgeHTML(section.price)}
  </div>`;
}

/**
 * Build a sub-section block (with optional frame, optional tag)
 */
function renderSubsection(section) {
  if (!section.items || section.items.length === 0) {
    // Gourmand-style single item
    if (section.gourmand) return renderGourmandBox(section);
    return '';
  }

  const titleTag = section.tag ? tagHTML(section.tag, section.tagLabel) : '';
  const header = section.name
    ? `<div class="subsection-header">
         <h3 class="subsection-title">${section.name}${titleTag}</h3>
         <span class="subsection-line" aria-hidden="true"></span>
       </div>`
    : '';

  const items = section.items
    .map(item => renderListItem(item))
    .join('');

  const inner = `${header}<ul class="menu-list">${items}</ul>`;

  if (section.framed) {
    return `<div class="menu-subsection subsection-framed">${inner}</div>`;
  }
  return `<div class="menu-subsection">${inner}</div>`;
}

/**
 * Build the two-column layout for drinks (Jus, Cocktails, Mojito, Smoothie)
 */
function renderTwoColSection(category) {
  // Separate into two columns by col property
  const col1 = category.sections.filter(s => s.col === 1);
  const col2 = category.sections.filter(s => s.col === 2);

  function colBlock(sections) {
    return sections.map(section => {
      const items = section.items.map(item => renderListItem(item)).join('');
      return `<div class="menu-subsection">
        <div class="subsection-header">
          <h3 class="subsection-title">${section.name}</h3>
          <span class="subsection-line" aria-hidden="true"></span>
        </div>
        <ul class="menu-list">${items}</ul>
        <hr class="dashed-sep" aria-hidden="true"/>
      </div>`;
    }).join('');
  }

  return `<div class="two-col-grid">
    <div>${colBlock(col1)}</div>
    <div>${colBlock(col2)}</div>
  </div>`;
}

/**
 * Build an entire menu section (a full page / nav category)
 */
function renderSection(category) {
  let body = '';

  if (category.layout === 'featured') {
    const items = category.sections[0].items
      .map(item => renderFeaturedItem(item))
      .join('');
    body = `<ul class="menu-list">${items}</ul>`;

  } else if (category.layout === 'two-col') {
    body = renderTwoColSection(category);

  } else {
    // Standard list layout
    body = category.sections
      .map(section => renderSubsection(section))
      .join('<hr class="dashed-sep" aria-hidden="true"/>');
  }

  return `
  <section class="menu-section fade-in" id="${category.id}" aria-labelledby="title-${category.id}">
    <header class="section-header">
      <span class="section-icon" aria-hidden="true">${category.icon}</span>
      <div class="section-title-wrap">
        <h2 class="section-title" id="title-${category.id}">${category.label}</h2>
        <span class="section-line" aria-hidden="true"></span>
      </div>
    </header>
    ${body}
  </section>`;
}

/**
 * Main render: inject all sections into #menu-container
 */
function renderMenu() {
  const container = document.getElementById('menu-container');
  if (!container) return;

  const html = MENU_DATA
    .map((cat, i) => {
      const divider = i > 0
        ? `<div class="section-divider" aria-hidden="true"><span>✦</span></div>`
        : '';
      return divider + renderSection(cat);
    })
    .join('');

  container.innerHTML = html;
}

/**
 * Build category nav tabs
 */
function renderNavTabs() {
  const track = document.getElementById('cat-nav-track');
  if (!track) return;

  track.innerHTML = MENU_DATA.map(cat =>
    `<button
      class="cat-tab"
      data-target="${cat.id}"
      aria-label="Aller à ${cat.label}"
    >
      <span class="cat-tab__icon" aria-hidden="true">${cat.icon}</span>
      <span>${cat.navLabel}</span>
    </button>`
  ).join('');
}

/* ═══════════════════════════════════════════════════════════════
   SEARCH
═══════════════════════════════════════════════════════════════ */
let searchTimeout = null;

function normalizeStr(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Walk all rendered items and show/hide based on query.
 * Also highlights matching text.
 */
function performSearch(query) {
  const q = normalizeStr(query.trim());
  const banner   = document.getElementById('search-banner');
  const termSpan = document.getElementById('search-term-display');
  const countSpan= document.getElementById('search-count');
  const clearBtn = document.getElementById('search-clear');

  // Remove all previous highlights
  document.querySelectorAll('mark.search-highlight').forEach(m => {
    m.replaceWith(document.createTextNode(m.textContent));
  });
  // Re-merge adjacent text nodes
  document.getElementById('menu-container').normalize();

  if (!q) {
    // Clear search state
    banner.hidden = true;
    clearBtn.hidden = true;
    document.querySelectorAll('.menu-section, .menu-item, .menu-subsection, .gourmand-box, .section-divider')
      .forEach(el => el.classList.remove('is-hidden-by-search'));

    // Show no-results if present
    const nr = document.querySelector('.no-results');
    if (nr) nr.remove();
    return;
  }

  clearBtn.hidden = false;
  termSpan.textContent = query.trim();

  let visibleCount = 0;

  // Process each menu section
  document.querySelectorAll('.menu-section').forEach(section => {
    let sectionHasMatch = false;

    // Check all items within this section
    section.querySelectorAll('.menu-item').forEach(itemEl => {
      const nameEl = itemEl.querySelector('.item-name');
      const descEl = itemEl.querySelector('.item-desc');
      const text   = (nameEl ? nameEl.textContent : '') + ' ' + (descEl ? descEl.textContent : '');
      const normalText = normalizeStr(text);

      if (normalText.includes(q)) {
        itemEl.classList.remove('is-hidden-by-search');
        sectionHasMatch = true;
        visibleCount++;
        // Highlight matches
        highlightText(nameEl, q);
        if (descEl) highlightText(descEl, q);
      } else {
        itemEl.classList.add('is-hidden-by-search');
      }
    });

    // Check gourmand boxes
    section.querySelectorAll('.gourmand-box').forEach(box => {
      const text = normalizeStr(box.textContent);
      if (text.includes(q)) {
        box.classList.remove('is-hidden-by-search');
        sectionHasMatch = true;
      } else {
        box.classList.add('is-hidden-by-search');
      }
    });

    // Show/hide the whole section and its divider
    const sectionId = section.id;
    const dividers = document.querySelectorAll('.section-divider');

    if (sectionHasMatch) {
      section.classList.remove('is-hidden-by-search');
    } else {
      section.classList.add('is-hidden-by-search');
    }
  });

  // Hide section dividers that are between two hidden sections
  document.querySelectorAll('.section-divider').forEach(div => {
    div.classList.remove('is-hidden-by-search');
  });

  // Update banner
  banner.hidden = false;
  countSpan.textContent = `${visibleCount} résultat${visibleCount !== 1 ? 's' : ''}`;

  // No results message
  let nr = document.querySelector('.no-results');
  if (visibleCount === 0) {
    if (!nr) {
      nr = document.createElement('div');
      nr.className = 'no-results';
      nr.innerHTML = `
        <div class="no-results-icon">🔍</div>
        <h3>Aucun résultat trouvé</h3>
        <p>Aucun article ne correspond à "<strong>${escapeHTML(query.trim())}</strong>".<br>Essayez un autre terme.</p>`;
      document.getElementById('menu-container').appendChild(nr);
    }
  } else if (nr) {
    nr.remove();
  }
}

/**
 * Highlight occurrences of query within a text element (leaf only)
 */
function highlightText(el, query) {
  if (!el) return;
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
  const nodes = [];
  let node;
  while ((node = walker.nextNode())) nodes.push(node);

  nodes.forEach(textNode => {
    const text = textNode.textContent;
    const normalText = normalizeStr(text);
    const idx = normalText.indexOf(query);
    if (idx === -1) return;

    const before = text.slice(0, idx);
    const match  = text.slice(idx, idx + query.length);
    const after  = text.slice(idx + query.length);

    const frag = document.createDocumentFragment();
    if (before) frag.appendChild(document.createTextNode(before));
    const mark = document.createElement('mark');
    mark.className = 'search-highlight';
    mark.textContent = match;
    frag.appendChild(mark);
    if (after) frag.appendChild(document.createTextNode(after));
    textNode.parentNode.replaceChild(frag, textNode);
  });
}

function escapeHTML(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function clearSearch() {
  const input = document.getElementById('search-input');
  if (input) { input.value = ''; input.focus(); }
  performSearch('');
}

/* ═══════════════════════════════════════════════════════════════
   DARK MODE
═══════════════════════════════════════════════════════════════ */
function initTheme() {
  const saved = localStorage.getItem('cupffee-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  applyTheme(theme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('cupffee-theme', theme);

  const moonIcon = document.getElementById('icon-moon');
  const sunIcon  = document.getElementById('icon-sun');
  if (moonIcon) moonIcon.style.display = theme === 'light' ? 'block' : 'none';
  if (sunIcon)  sunIcon.style.display  = theme === 'dark'  ? 'block' : 'none';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

/* ═══════════════════════════════════════════════════════════════
   ACTIVE SECTION DETECTION
   Uses IntersectionObserver to highlight the correct nav tab
═══════════════════════════════════════════════════════════════ */
let sectionObserver = null;

function initSectionObserver() {
  const sections = document.querySelectorAll('.menu-section');
  if (!sections.length) return;

  const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 108;

  sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activateTab(entry.target.id);
        }
      });
    },
    {
      rootMargin: `-${headerH + 20}px 0px -55% 0px`,
      threshold: 0
    }
  );

  sections.forEach(s => sectionObserver.observe(s));
}

function activateTab(sectionId) {
  document.querySelectorAll('.cat-tab').forEach(tab => {
    if (tab.dataset.target === sectionId) {
      tab.classList.add('is-active');
      // Scroll tab into view within the nav track
      tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    } else {
      tab.classList.remove('is-active');
    }
  });
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL-TRIGGERED FADE-IN ANIMATIONS
═══════════════════════════════════════════════════════════════ */
let fadeObserver = null;

function initFadeObserver() {
  fadeObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));
}

/* ═══════════════════════════════════════════════════════════════
   BACK-TO-TOP BUTTON
═══════════════════════════════════════════════════════════════ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ═══════════════════════════════════════════════════════════════
   CATEGORY NAV SCROLL CONTROLS
═══════════════════════════════════════════════════════════════ */
function initNavScrollControls() {
  const track  = document.getElementById('cat-nav-track');
  const btnL   = document.getElementById('nav-left');
  const btnR   = document.getElementById('nav-right');
  if (!track || !btnL || !btnR) return;

  const SCROLL_AMT = 200;

  btnL.addEventListener('click', () => {
    track.scrollBy({ left: -SCROLL_AMT, behavior: 'smooth' });
  });
  btnR.addEventListener('click', () => {
    track.scrollBy({ left: SCROLL_AMT, behavior: 'smooth' });
  });

  // Hide arrows if not needed
  const updateArrows = () => {
    btnL.style.opacity = track.scrollLeft > 0 ? '1' : '0.3';
    btnR.style.opacity = (track.scrollLeft + track.clientWidth) < track.scrollWidth - 4 ? '1' : '0.3';
  };

  track.addEventListener('scroll', updateArrows, { passive: true });
  window.addEventListener('resize', updateArrows);
  updateArrows();
}

/* ═══════════════════════════════════════════════════════════════
   SMOOTH SCROLL TO SECTION ON TAB CLICK
═══════════════════════════════════════════════════════════════ */
function initTabClicks() {
  const track = document.getElementById('cat-nav-track');
  if (!track) return;

  track.addEventListener('click', e => {
    const tab = e.target.closest('.cat-tab');
    if (!tab) return;

    const target = document.getElementById(tab.dataset.target);
    if (!target) return;

    const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 108;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH - 12;
    window.scrollTo({ top, behavior: 'smooth' });
  });
}

/* ═══════════════════════════════════════════════════════════════
   HERO CTA SMOOTH SCROLL
═══════════════════════════════════════════════════════════════ */
function initHeroCta() {
  const cta = document.getElementById('hero-cta');
  if (!cta) return;
  cta.addEventListener('click', e => {
    e.preventDefault();
    const first = document.querySelector('.menu-section');
    if (!first) return;
    const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 108;
    const top = first.getBoundingClientRect().top + window.scrollY - headerH - 12;
    window.scrollTo({ top, behavior: 'smooth' });
  });
}

/* ═══════════════════════════════════════════════════════════════
   INIT — Wire everything together
═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  /* 1. Theme */
  initTheme();
  document.getElementById('theme-toggle')
    ?.addEventListener('click', toggleTheme);

  /* 2. Render nav tabs */
  renderNavTabs();

  /* 3. Render full menu */
  renderMenu();

  /* 4. Search */
  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear');
  const bannerClear = document.getElementById('search-banner-clear');

  searchInput?.addEventListener('input', e => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => performSearch(e.target.value), 200);
  });

  searchClear?.addEventListener('click', clearSearch);
  bannerClear?.addEventListener('click', clearSearch);

  /* 5. Observers */
  initSectionObserver();
  initFadeObserver();

  /* 6. Back to top */
  initBackToTop();

  /* 7. Nav controls */
  initNavScrollControls();
  initTabClicks();
  initHeroCta();

  /* 8. Activate first tab immediately */
  const firstTab = document.querySelector('.cat-tab');
  if (firstTab) firstTab.classList.add('is-active');

  /* 9. Keyboard accessibility: Enter/Space on tab = click */
  document.getElementById('cat-nav-track')?.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.target.closest('.cat-tab')?.click();
    }
  });

});
