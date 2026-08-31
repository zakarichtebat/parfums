// Photos reelles hebergees sur le CDN Unsplash (licence libre).
// Remplace simplement l'URL pour utiliser tes propres visuels.
const photo = (id, w = 800, h = 1000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`

// ---------------------------------------------------------------------------
// ETAPE 1 : fausses donnees (mock) pour construire et tester le design
// sans dependre de l'API Laravel. Meme forme que la reponse JSON de l'API.
// ---------------------------------------------------------------------------
export const MOCK_PERFUMES = [
  {
    id: 1,
    name: 'Midnight Mystique',
    description: 'Ambre chaud, vanille et bois de santal pour les soirees inoubliables.',
    price: 35.99,
    old_price: 45.99,
    rating: 5.0,
    image_url: photo('1615634260167-c8cdede054de', 600, 750),
    fallback_url: '/images/perfume-1.svg',
    is_on_sale: false,
  },
  {
    id: 2,
    name: 'Opulent Aura',
    description: 'Un sillage epice et boise, signature des caracteres affirmes.',
    price: 35.99,
    old_price: 45.99,
    rating: 5.0,
    image_url: photo('1541643600914-78b084683601', 600, 750),
    fallback_url: '/images/perfume-2.svg',
    is_on_sale: true,
  },
  {
    id: 3,
    name: 'Eternal Elegance',
    description: 'Bouquet floral delicat de rose, pivoine et musc blanc.',
    price: 35.99,
    old_price: 45.99,
    rating: 5.0,
    image_url: photo('1592945403244-b3fbafd7f539', 600, 750),
    fallback_url: '/images/perfume-3.svg',
    is_on_sale: false,
  },
  {
    id: 4,
    name: 'Celestial Symphony',
    description: 'Notes fraiches de bergamote sur un fond de vetiver profond.',
    price: 35.99,
    old_price: 45.99,
    rating: 5.0,
    image_url: photo('1600612253971-422e7f7faeb6', 600, 750),
    fallback_url: '/images/perfume-4.svg',
    is_on_sale: true,
  },
]

// ---------------------------------------------------------------------------
// Carrousel du Hero : un flacon + son texte descriptif par diapositive.
// Le libelle correspond a la marque reellement visible sur la photo.
// ---------------------------------------------------------------------------
export const HERO_SLIDES = [
  {
    id: 'chanel',
    brand: 'Chanel',
    image: photo('1541643600914-78b084683601'),
    fallback: '/images/hero-bottle.svg',
    bullets: [
      'An amber floral built on ylang-ylang, May rose and a warm sandalwood base that lingers long after you leave the room.',
      'A timeless signature: crafted with meticulous attention to blending aromatic ingredients, creating harmonious and captivating scents.',
    ],
  },
  {
    id: 'versace',
    brand: 'Versace',
    image: photo('1587017539504-67cfbddac569'),
    fallback: '/images/perfume-3.svg',
    bullets: [
      'A luminous burst of Italian bergamot and green apple, grounded by cedarwood and a smooth tonka bean trail.',
      'Bold and magnetic, it evokes emotions and memories, making it a powerful tool for self-expression and personal connection.',
    ],
  },
  {
    id: 'prada',
    brand: 'Prada',
    image: photo('1610461888750-10bfc601b874'),
    fallback: '/images/perfume-4.svg',
    bullets: [
      'A dark, mineral composition of black pepper, patchouli and smoked leather, poured into architectural glass.',
      'Understated luxury: every facet is layered slowly so the fragrance unfolds hour after hour on the skin.',
    ],
  },
  {
    id: 'saint-laurent',
    brand: 'Saint Laurent',
    image: photo('1600612253971-422e7f7faeb6'),
    fallback: '/images/perfume-4.svg',
    bullets: [
      'Black coffee and white flowers over a sweet vanilla heart, an addictive contrast of light and shadow.',
      'Designed for the night, it turns a simple gesture into a lasting impression wherever you go.',
    ],
  },
  {
    id: 'red-diamond',
    brand: 'Red Diamond',
    image: photo('1608528577891-eb055944f2e7'),
    fallback: '/images/perfume-1.svg',
    bullets: [
      'Crisp grapefruit and pink pepper melt into a velvety amber base, cut by a facet of crystalline musk.',
      'A radiant, confident sillage that captures attention without ever raising its voice.',
    ],
  },
]

// Conserve pour compatibilite : libelles de la pagination verticale.
export const HERO_BRANDS = HERO_SLIDES.map((slide) => slide.brand)
