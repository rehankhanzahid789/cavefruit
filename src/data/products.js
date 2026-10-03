// Single source of truth for every flavor. Product pages, cards and the gallery all read from here.
const pack = (file, alt) => ({ file, alt, kind: 'pack', position: 'center 50%' });
const girl = (file, alt) => ({ file, alt, kind: 'lifestyle', position: 'center 24%' });

export const products = [
  {
    slug: 'dragon-fruit',
    no: 1,
    name: 'Dragon Fruit',
    weight: '100 Gram',
    fruit: 'dragon fruit',
    oneLiner: 'Pink outside. Wild inside. Every crunch is a tiny neon party.',
    description:
      'Bright magenta dragon fruit, freeze-dried until it shatters. Sweet, juicy-ish and loud in the best way. Warning: the pouch disappears fast.',
    facts: [
      { label: 'Crunch level', value: 'Shatter-crisp' },
      { label: 'Flavor vibe', value: 'Sweet, bold, main-character energy' },
      { label: 'Ingredient', value: '100% real dragon fruit' },
    ],
    theme: {
      bg: '#D9A9EE',
      deep: '#5E1F55',
      accent: '#C2187A',
      ink: '#2A0F24',
      onDeep: '#FFFFFF',
      soft: '#EBD0F6',
      line: '#5E1F55',
      btnBg: '#5E1F55',
      btnInk: '#FFFFFF',
      slice: 'dragon',
    },
    cardImage: 'dragonfruit-1.webp',
    ctaImage: 'dragonfruit-3.webp',
    images: [
      pack('dragonfruit-1.webp', 'Dragon Fruit pouch on a pink pedestal beside fresh dragon fruit'),
      girl('dragonfruit-2.webp', 'Smiling girl holding a Dragon Fruit pouch with a bowl of crunchy dragon fruit'),
      pack('dragonfruit-3.webp', 'Dragon Fruit pouches lined up in a pink and lilac neon set'),
      pack('dragonfruit-4.webp', 'Dragon Fruit pouch surrounded by dragon fruit slices and crunchy pieces'),
      girl('dragonfruit-5.webp', 'Girl snacking on a freeze-dried dragon fruit chip while holding the pouch'),
    ],
  },
  {
    slug: 'banana-punch',
    no: 2,
    name: 'Banana Punch',
    weight: '100 Gram',
    fruit: 'banana',
    oneLiner: 'Fruit, but make it crunchy. Sunshine in a pouch.',
    description:
      'Golden banana slices freeze-dried to a clean, sweet snap. It tastes like a sunny day with a little attitude. Hard to stop at one chip.',
    facts: [
      { label: 'Crunch level', value: 'Golden snap' },
      { label: 'Flavor vibe', value: 'Sunny, sweet and a little cheeky' },
      { label: 'Ingredient', value: '100% real banana' },
    ],
    theme: {
      bg: '#F8EE9B',
      deep: '#7DAF22',
      accent: '#FFD93B',
      ink: '#2A0F24',
      onDeep: '#2A0F24',
      soft: '#FCF8CF',
      line: '#2A0F24',
      btnBg: '#9CCB3B',
      btnInk: '#2A0F24',
      slice: 'banana',
    },
    cardImage: 'banana-1.webp',
    ctaImage: 'banana-4.webp',
    images: [
      pack('banana-1.webp', 'Banana Punch pouch in a bright yellow and green snack shop set'),
      girl('banana-2.webp', 'Laughing girl in sunglasses holding a Banana Punch pouch'),
      girl('banana-3.webp', 'Girl biting a crunchy banana chip with a Banana Punch pouch in hand'),
      pack('banana-4.webp', 'Three Banana Punch pouches on a yellow counter'),
      pack('banana-5.webp', 'Banana Punch pouch surrounded by banana chips and fresh bananas'),
    ],
  },
  {
    slug: 'strawberry',
    no: 3,
    name: 'Strawberry',
    weight: '100 Gram',
    fruit: 'strawberry',
    oneLiner: 'Berry bold. Tangy-sweet, loud and ridiculously snackable.',
    description:
      'Ripe red strawberries, freeze-dried so every bite crunches then melts. Tangy, sweet and a little dramatic. Your new favorite crunch.',
    facts: [
      { label: 'Crunch level', value: 'Crisp pop, then melt' },
      { label: 'Flavor vibe', value: 'Sweet-tart and dramatic' },
      { label: 'Ingredient', value: '100% real strawberry' },
    ],
    theme: {
      bg: '#D61C62',
      deep: '#7A1745',
      accent: '#E3263A',
      ink: '#FFFFFF',
      onDeep: '#FFFFFF',
      soft: '#FFD3E3',
      line: '#7A1745',
      btnBg: '#FFFFFF',
      btnInk: '#7A1745',
      slice: 'strawberry',
    },
    cardImage: 'strawberry-4.webp',
    ctaImage: 'strawberry-3.webp',
    images: [
      pack('strawberry-1.webp', 'Strawberry pouch on a pink table with strawberries and heart sunglasses'),
      girl('strawberry-2.webp', 'Girl playfully eating a freeze-dried strawberry above a bowl of berries'),
      pack('strawberry-3.webp', 'Strawberry pouches in a pink neon heart set'),
      pack('strawberry-4.webp', 'Strawberry pouch front and center on a pink counter'),
      girl('strawberry-5.webp', 'Girl laughing while holding a Strawberry pouch to the camera'),
    ],
  },
];

export const getProduct = (slug) => products.find((p) => p.slug === slug);
export const otherProducts = (slug) => products.filter((p) => p.slug !== slug);

// The six "girl" photos power the lifestyle collage on the home page.
export const lifestyleShots = [
  { product: products[0], image: products[0].images[1], caption: 'Snack Mood', ratio: '4 / 5' },
  { product: products[1], image: products[1].images[1], caption: 'Main Character Crunch', ratio: '1 / 1' },
  { product: products[2], image: products[2].images[1], caption: 'Zero Boring', ratio: '4 / 5' },
  { product: products[1], image: products[1].images[2], caption: 'Crunch Break', ratio: '4 / 5' },
  { product: products[0], image: products[0].images[4], caption: 'Snack Loud', ratio: '1 / 1' },
  { product: products[2], image: products[2].images[4], caption: 'Pink Hour', ratio: '4 / 5' },
];

export const IMG_W = 1120;
export const IMG_H = 1400;
