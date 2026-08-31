// Photos reelles hebergees sur le CDN Unsplash (licence libre).
const photo = (id, w = 900, h = 1100) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`

export const FAMILIES = ['Amber', 'Woody', 'Floral', 'Oriental', 'Fresh', 'Chypre']
export const GENDERS = ['Women', 'Men', 'Unisex']

// Contenances proposees et coefficient de prix (le 30 ml sert de reference).
export const VOLUMES = [
  { ml: 30, factor: 1 },
  { ml: 50, factor: 1.45 },
  { ml: 100, factor: 2.35 },
]

// Catalogue. `img` = identifiants Unsplash, du principal au secondaire.
const RAW = [
  {
    id: 1, name: 'Midnight Mystique', gender: 'Unisex', family: 'Amber',
    concentration: 'Eau de Parfum', price: 35.99, old_price: 45.99,
    rating: 4.8, reviews_count: 128, popularity: 96, is_new: false,
    longevity: '8-12 h', sillage: 'Strong',
    top: ['Bergamot', 'Pink pepper'], heart: ['Jasmine', 'Orris'],
    base: ['Amber', 'Vanilla', 'Sandalwood'],
    img: ['1615634260167-c8cdede054de', '1541643600914-78b084683601', '1592945403244-b3fbafd7f539'],
    description: 'A warm amber signature built for the hours after dark. Vanilla absolute and sandalwood settle into the skin and stay there.',
  },
  {
    id: 2, name: 'Opulent Aura', gender: 'Women', family: 'Floral',
    concentration: 'Eau de Parfum', price: 35.99, old_price: 45.99,
    rating: 4.9, reviews_count: 214, popularity: 100, is_new: false,
    longevity: '6-8 h', sillage: 'Moderate',
    top: ['Aldehydes', 'Neroli'], heart: ['May rose', 'Ylang-ylang'],
    base: ['Sandalwood', 'Musk'],
    img: ['1541643600914-78b084683601', '1592945403244-b3fbafd7f539', '1563170351-be82bc888aa4'],
    description: 'An aldehydic floral of rare balance: May rose and ylang-ylang lifted by neroli, grounded in a soft sandalwood base.',
  },
  {
    id: 3, name: 'Eternal Elegance', gender: 'Women', family: 'Floral',
    concentration: 'Eau de Toilette', price: 29.99, old_price: 39.99,
    rating: 4.7, reviews_count: 96, popularity: 81, is_new: false,
    longevity: '4-6 h', sillage: 'Intimate',
    top: ['Mandarin', 'Blackcurrant'], heart: ['Peony', 'White rose'],
    base: ['White musk', 'Cedar'],
    img: ['1592945403244-b3fbafd7f539', '1563170351-be82bc888aa4', '1585386959984-a4155224a1ad'],
    description: 'A crystalline bouquet of white rose and peony, wrapped in clean musk. Understated, luminous, endlessly wearable.',
  },
  {
    id: 4, name: 'Celestial Symphony', gender: 'Unisex', family: 'Oriental',
    concentration: 'Eau de Parfum', price: 39.99, old_price: 49.99,
    rating: 4.6, reviews_count: 143, popularity: 88, is_new: true,
    longevity: '8-12 h', sillage: 'Strong',
    top: ['Black coffee', 'Pear'], heart: ['Orange blossom', 'Jasmine'],
    base: ['Vanilla', 'Patchouli', 'Cedar'],
    img: ['1600612253971-422e7f7faeb6', '1610461888750-10bfc601b874', '1615634260167-c8cdede054de'],
    description: 'Black coffee and white flowers over a sweet vanilla heart, an addictive contrast of light and shadow.',
  },
  {
    id: 5, name: 'Noir Absolu', gender: 'Men', family: 'Woody',
    concentration: 'Eau de Parfum', price: 42.99, old_price: 54.99,
    rating: 4.8, reviews_count: 187, popularity: 94, is_new: false,
    longevity: '8-12 h', sillage: 'Strong',
    top: ['Calabrian bergamot', 'Black pepper'], heart: ['Sichuan pepper', 'Lavender'],
    base: ['Vetiver', 'Ambroxan', 'Cedar'],
    img: ['1698877577733-65ae7dee328c', '1610461888750-10bfc601b874', '1523293182086-7651a899d37f'],
    description: 'Mineral and magnetic. Black pepper sharpened by vetiver, poured into glass carved like polished obsidian.',
  },
  {
    id: 6, name: 'Azure Dune', gender: 'Men', family: 'Fresh',
    concentration: 'Eau de Toilette', price: 27.99, old_price: 34.99,
    rating: 4.5, reviews_count: 74, popularity: 70, is_new: true,
    longevity: '4-6 h', sillage: 'Moderate',
    top: ['Grapefruit', 'Mint'], heart: ['Marine accord', 'Nutmeg'],
    base: ['Driftwood', 'Ambergris'],
    img: ['1523293182086-7651a899d37f', '1587017539504-67cfbddac569', '1720423514789-15a33e59fc81'],
    description: 'Salt air and citrus peel. A bright, uncomplicated fresh scent for long days and warm evenings.',
  },
  {
    id: 7, name: 'Rouge Diamant', gender: 'Women', family: 'Chypre',
    concentration: 'Extrait de Parfum', price: 54.99, old_price: 69.99,
    rating: 4.9, reviews_count: 61, popularity: 76, is_new: true,
    longevity: '8-12 h', sillage: 'Strong',
    top: ['Pink pepper', 'Grapefruit'], heart: ['Rose absolute', 'Iris'],
    base: ['Oakmoss', 'Patchouli', 'Amber'],
    img: ['1608528577891-eb055944f2e7', '1585386959984-a4155224a1ad', '1594035910387-fea47794261f'],
    description: 'A modern chypre: rose absolute cut with oakmoss and patchouli. Confident without ever raising its voice.',
  },
  {
    id: 8, name: 'Eros Legacy', gender: 'Men', family: 'Fresh',
    concentration: 'Eau de Toilette', price: 31.99, old_price: 41.99,
    rating: 4.4, reviews_count: 152, popularity: 84, is_new: false,
    longevity: '6-8 h', sillage: 'Moderate',
    top: ['Italian bergamot', 'Green apple'], heart: ['Geranium', 'Tonka bean'],
    base: ['Cedarwood', 'Vetiver'],
    img: ['1587017539504-67cfbddac569', '1523293182086-7651a899d37f', '1610461888750-10bfc601b874'],
    description: 'A luminous burst of Italian bergamot and green apple, grounded by cedarwood and a smooth tonka trail.',
  },
  {
    id: 9, name: 'Golden Hour', gender: 'Unisex', family: 'Amber',
    concentration: 'Eau de Parfum', price: 44.99, old_price: 0,
    rating: 4.7, reviews_count: 89, popularity: 79, is_new: true,
    longevity: '8-12 h', sillage: 'Strong',
    top: ['Blood mandarin', 'Cinnamon'], heart: ['Rose', 'Spices'],
    base: ['Blond leather', 'Amber', 'Patchouli'],
    img: ['1633072437275-ec3344b4b966', '1615634260167-c8cdede054de', '1541643600914-78b084683601'],
    description: 'Cinnamon and blood mandarin melting into blond leather. A warm amber signature poured into a bar of gold.',
  },
  {
    id: 10, name: 'Blanc Cristal', gender: 'Women', family: 'Fresh',
    concentration: 'Eau de Toilette', price: 25.99, old_price: 32.99,
    rating: 4.3, reviews_count: 47, popularity: 58, is_new: false,
    longevity: '4-6 h', sillage: 'Intimate',
    top: ['Lemon', 'Freesia'], heart: ['Lily of the valley', 'Peony'],
    base: ['White musk', 'Blond woods'],
    img: ['1632495112970-30ce8340c2be', '1720423514789-15a33e59fc81', '1592945403244-b3fbafd7f539'],
    description: 'Soap-clean and quietly elegant. Lily of the valley over blond woods, the scent of pressed linen.',
  },
  {
    id: 11, name: 'Oud Royal', gender: 'Unisex', family: 'Oriental',
    concentration: 'Extrait de Parfum', price: 64.99, old_price: 84.99,
    rating: 5.0, reviews_count: 38, popularity: 72, is_new: true,
    longevity: '8-12 h', sillage: 'Strong',
    top: ['Saffron', 'Raspberry'], heart: ['Rose', 'Oud'],
    base: ['Agarwood', 'Amber', 'Musk'],
    img: ['1594035910387-fea47794261f', '1600612253971-422e7f7faeb6', '1608528577891-eb055944f2e7'],
    description: 'Saffron and rose folded into genuine agarwood. Our most concentrated blend, made in batches of two hundred.',
  },
  {
    id: 12, name: 'Jardin Voile', gender: 'Women', family: 'Floral',
    concentration: 'Eau de Parfum', price: 33.99, old_price: 42.99,
    rating: 4.6, reviews_count: 112, popularity: 68, is_new: false,
    longevity: '6-8 h', sillage: 'Moderate',
    top: ['Green mandarin', 'Pear'], heart: ['Orange blossom', 'Tuberose'],
    base: ['Cashmere wood', 'Musk'],
    img: ['1563170351-be82bc888aa4', '1592945403244-b3fbafd7f539', '1585386959984-a4155224a1ad'],
    description: 'Orange blossom and tuberose behind a veil of cashmere wood. A garden at dusk, just after the watering.',
  },
]

const slugify = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

export const MOCK_PERFUMES = RAW.map(({ img, top, heart, base, ...p }) => ({
  ...p,
  slug: slugify(p.name),
  is_on_sale: p.old_price > 0,
  notes: { top, heart, base },
  gallery: img.map((id) => photo(id)),
  image_url: photo(img[0], 600, 750),
  fallback_url: '/images/bottles/bottle-amber.png',
}))

export const PRICE_BOUNDS = {
  min: Math.floor(Math.min(...MOCK_PERFUMES.map((p) => p.price))),
  max: Math.ceil(Math.max(...MOCK_PERFUMES.map((p) => p.price))),
}

export const findPerfume = (idOrSlug) =>
  MOCK_PERFUMES.find(
    (p) => String(p.id) === String(idOrSlug) || p.slug === idOrSlug
  )

// Avis clients, tires d'un vivier fixe pour rester stables au rechargement.
const REVIEW_POOL = [
  { author: 'Amina B.', stars: 5, title: 'My signature now', text: 'Three sprays last me the whole day and I still catch it on my scarf the next morning.' },
  { author: 'Yassine K.', stars: 4, title: 'Beautiful, slightly sweet', text: 'Gorgeous opening. A touch sweeter than I expected on the dry-down, but I keep reaching for it.' },
  { author: 'Claire M.', stars: 5, title: 'Worth every euro', text: 'Bought it after a sample and immediately ordered the 100 ml. Compliments every single time.' },
  { author: 'Nadia R.', stars: 4, title: 'Elegant, not loud', text: 'Exactly what I wanted for the office. Present without taking over the room.' },
  { author: 'Omar T.', stars: 5, title: 'Excellent projection', text: 'People notice it from across the room for the first two hours, then it settles beautifully.' },
]

export const getReviews = (perfume) =>
  REVIEW_POOL.slice(0, 3 + (perfume.id % 3)).map((r, i) => ({
    ...r,
    id: `${perfume.id}-${i}`,
    date: new Date(2026, (perfume.id + i) % 12, 3 + ((perfume.id * 7 + i * 5) % 25))
      .toISOString()
      .slice(0, 10),
  }))

// Produits similaires : meme famille d'abord, puis meme genre, puis populaires.
export const getSimilar = (perfume, count = 4) =>
  MOCK_PERFUMES.filter((p) => p.id !== perfume.id)
    .sort((a, b) => {
      const score = (x) =>
        (x.family === perfume.family ? 2 : 0) + (x.gender === perfume.gender ? 1 : 0)
      return score(b) - score(a) || b.popularity - a.popularity
    })
    .slice(0, count)

// ---------------------------------------------------------------------------
// Carrousel du Hero : un flacon detoure + son texte par diapositive.
// ---------------------------------------------------------------------------
export const HERO_SLIDES = [
  {
    id: 'golden-hour', brand: 'Opulent', image: '/images/bottles/bottle-gold.png',
    bullets: [
      'A warm amber signature of cinnamon, blood mandarin and blond leather, poured into a bar of polished gold.',
      'Crafted with meticulous attention to blending aromatic ingredients, creating harmonious and captivating scents.',
    ],
  },
  {
    id: 'midnight-mystique', brand: 'Mystique', image: '/images/bottles/bottle-amber.png',
    bullets: [
      'Honeyed amber over vanilla absolute and sandalwood, a slow trail that lingers long after you leave the room.',
      'A fragrance has a profound ability to evoke emotions and memories, making it a powerful tool for self-expression.',
    ],
  },
  {
    id: 'noir-absolu', brand: 'Noir', image: '/images/bottles/bottle-oud.png',
    bullets: [
      'Black pepper and bergamot sharpened by vetiver, wrapped in a textured glass carved like polished obsidian.',
      'Built for the night: bold, mineral and magnetic, it holds its intensity from the first hour to the last.',
    ],
  },
  {
    id: 'eternal-elegance', brand: 'Eternal', image: '/images/bottles/bottle-azure.png',
    bullets: [
      'A crystalline bouquet of white rose, peony and clean musk, as luminous as the faceted flacon that holds it.',
      'Understated and timeless, it turns a simple gesture into a lasting impression wherever you go.',
    ],
  },
  {
    id: 'celestial-symphony', brand: 'Celestial', image: '/images/bottles/bottle-celestial.png',
    bullets: [
      'Cool bergamot and pink pepper drift over a soft cedar base, cut by a facet of crystalline musk.',
      'A radiant, confident sillage that captures attention without ever raising its voice.',
    ],
  },
]

export const HERO_BRANDS = HERO_SLIDES.map((slide) => slide.brand)
