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
    id: 'opulent-aura',
    brand: 'Opulent',
    image: '/images/bottles/bottle-gold.png',
    bullets: [
      'A warm amber signature of cinnamon, blood mandarin and blond leather, poured into a bar of polished gold.',
      'Crafted with meticulous attention to blending aromatic ingredients, creating harmonious and captivating scents.',
    ],
  },
  {
    id: 'midnight-mystique',
    brand: 'Mystique',
    image: '/images/bottles/bottle-amber.png',
    bullets: [
      'Honeyed amber over vanilla absolute and sandalwood, a slow trail that lingers long after you leave the room.',
      'A fragrance has a profound ability to evoke emotions and memories, making it a powerful tool for self-expression.',
    ],
  },
  {
    id: 'noir-absolu',
    brand: 'Noir',
    image: '/images/bottles/bottle-oud.png',
    bullets: [
      'Black pepper and bergamot sharpened by vetiver, wrapped in a textured glass carved like polished obsidian.',
      'Built for the night: bold, mineral and magnetic, it holds its intensity from the first hour to the last.',
    ],
  },
  {
    id: 'eternal-elegance',
    brand: 'Eternal',
    image: '/images/bottles/bottle-azure.png',
    bullets: [
      'A crystalline bouquet of white rose, peony and clean musk, as luminous as the faceted flacon that holds it.',
      'Understated and timeless, it turns a simple gesture into a lasting impression wherever you go.',
    ],
  },
  {
    id: 'celestial-symphony',
    brand: 'Celestial',
    image: '/images/bottles/bottle-celestial.png',
    bullets: [
      'Cool bergamot and pink pepper drift over a soft cedar base, cut by a facet of crystalline musk.',
      'A radiant, confident sillage that captures attention without ever raising its voice.',
    ],
  },
]

// Conserve pour compatibilite : libelles de la pagination verticale.
export const HERO_BRANDS = HERO_SLIDES.map((slide) => slide.brand)
