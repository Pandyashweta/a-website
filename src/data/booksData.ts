import toMrGeneralImg from '../assets/books/to-mr-genral.png';
import houseNoQuestionMarkImg from '../assets/books/house-no-.png';
import talesMainCoverImg from '../assets/books/tales-of-love/main-cover.png';
import talesBook1Img from '../assets/books/tales-of-love/book-1.png';
import talesBook2Img from '../assets/books/tales-of-love/book-2.png';
import talesBook3Img from '../assets/books/tales-of-love/book-3.png';
import talesBook4Img from '../assets/books/tales-of-love/book-4.png';
import talesBook5Img from '../assets/books/tales-of-love/book-5.png';
import talesBook6Img from '../assets/books/tales-of-love/book-6.png';
import talesBook7Img from '../assets/books/tales-of-love/book-7.png';

export interface BuyLink {
  label: string;
  url: string;
}

export interface BookItem {
  id: string;
  title: string;
  subtitle: string;
  series: string;
  genre: string;
  status: string;
  coverImage: string;
  aspectRatio?: 'vertical' | 'wide' | 'tall' | 'square';
  releaseDate: string;
  tropes: string[];
  hook: string;
  description: string;
  blurbParagraphs?: string[];
  narrator?: string;
  buyLinks: BuyLink[];
  audioLinks?: BuyLink[];
  moodboardImages: string[];
  playlistUrl: string;
  readUrl: string;
  contentNotes?: string[];
}

export interface SeriesItem {
  id: string;
  title: string;
  urduTitle?: string;
  subtitle: string;
  tagline?: string;
  description: string;
  coverImage: string;
  books: BookItem[];
}

const talesOfLoveBlurb = [
  '**Tales of Love** is a seven-book dark romance series that takes us on a journey at the sides of love.',
  'The whole book is set in a simple universe called #AraVerse.',
  'Each book is its own unique dark side of a love story.',
];

const talesOfLoveDescription =
  'Tales of Love is a seven-book dark romance series that takes us on a journey at the sides of love. The whole book is set in a simple universe called #AraVerse. Each book is its own unique dark side of a love story.';

export const talesOfLoveBooks: BookItem[] = [
  {
    id: 'tales-of-love-1',
    title: 'Tales of Love: Book I',
    subtitle: 'The Seven stages of Dark side of Love',
    series: 'Tales of Love',
    genre: 'Dark Romance',
    status: 'TBA',
    coverImage: talesBook1Img,
    aspectRatio: 'tall',
    releaseDate: 'TBA',
    tropes: ['Dark Romance', 'Interconnected Series'],
    hook: '',
    description: talesOfLoveDescription,
    blurbParagraphs: talesOfLoveBlurb,
    buyLinks: [],
    moodboardImages: [talesBook1Img, talesMainCoverImg],
    playlistUrl: '#',
    readUrl: 'https://www.wattpad.com/user/Araveink',
  },
  {
    id: 'tales-of-love-2',
    title: 'Tales of Love: Book II',
    subtitle: 'The Seven stages of Dark side of Love',
    series: 'Tales of Love',
    genre: 'Dark Romance',
    status: 'TBA',
    coverImage: talesBook2Img,
    aspectRatio: 'tall',
    releaseDate: 'TBA',
    tropes: ['Dark Romance', 'Interconnected Series'],
    hook: '',
    description: talesOfLoveDescription,
    blurbParagraphs: talesOfLoveBlurb,
    buyLinks: [],
    moodboardImages: [talesBook2Img, talesMainCoverImg],
    playlistUrl: '#',
    readUrl: 'https://www.wattpad.com/user/Araveink',
  },
  {
    id: 'tales-of-love-3',
    title: 'Tales of Love: Book III',
    subtitle: 'The Seven stages of Dark side of Love',
    series: 'Tales of Love',
    genre: 'Dark Romance',
    status: 'TBA',
    coverImage: talesBook3Img,
    aspectRatio: 'tall',
    releaseDate: 'TBA',
    tropes: ['Dark Romance', 'Interconnected Series'],
    hook: '',
    description: talesOfLoveDescription,
    blurbParagraphs: talesOfLoveBlurb,
    buyLinks: [],
    moodboardImages: [talesBook3Img, talesMainCoverImg],
    playlistUrl: '#',
    readUrl: 'https://www.wattpad.com/user/Araveink',
  },
  {
    id: 'tales-of-love-4',
    title: 'Tales of Love: Book IV',
    subtitle: 'The Seven stages of Dark side of Love',
    series: 'Tales of Love',
    genre: 'Dark Romance',
    status: 'TBA',
    coverImage: talesBook4Img,
    aspectRatio: 'tall',
    releaseDate: 'TBA',
    tropes: ['Dark Romance', 'Interconnected Series'],
    hook: '',
    description: talesOfLoveDescription,
    blurbParagraphs: talesOfLoveBlurb,
    buyLinks: [],
    moodboardImages: [talesBook4Img, talesMainCoverImg],
    playlistUrl: '#',
    readUrl: 'https://www.wattpad.com/user/Araveink',
  },
  {
    id: 'tales-of-love-5',
    title: 'Tales of Love: Book V',
    subtitle: 'The Seven stages of Dark side of Love',
    series: 'Tales of Love',
    genre: 'Dark Romance',
    status: 'TBA',
    coverImage: talesBook5Img,
    aspectRatio: 'tall',
    releaseDate: 'TBA',
    tropes: ['Dark Romance', 'Interconnected Series'],
    hook: '',
    description: talesOfLoveDescription,
    blurbParagraphs: talesOfLoveBlurb,
    buyLinks: [],
    moodboardImages: [talesBook5Img, talesMainCoverImg],
    playlistUrl: '#',
    readUrl: 'https://www.wattpad.com/user/Araveink',
  },
  {
    id: 'tales-of-love-6',
    title: 'Tales of Love: Book VI',
    subtitle: 'The Seven stages of Dark side of Love',
    series: 'Tales of Love',
    genre: 'Dark Romance',
    status: 'TBA',
    coverImage: talesBook6Img,
    aspectRatio: 'tall',
    releaseDate: 'TBA',
    tropes: ['Dark Romance', 'Interconnected Series'],
    hook: '',
    description: talesOfLoveDescription,
    blurbParagraphs: talesOfLoveBlurb,
    buyLinks: [],
    moodboardImages: [talesBook6Img, talesMainCoverImg],
    playlistUrl: '#',
    readUrl: 'https://www.wattpad.com/user/Araveink',
  },
  {
    id: 'tales-of-love-7',
    title: 'Tales of Love: Book VII',
    subtitle: 'The Seven stages of Dark side of Love',
    series: 'Tales of Love',
    genre: 'Dark Romance',
    status: 'TBA',
    coverImage: talesBook7Img,
    aspectRatio: 'tall',
    releaseDate: 'TBA',
    tropes: ['Dark Romance', 'Interconnected Series'],
    hook: '',
    description: talesOfLoveDescription,
    blurbParagraphs: talesOfLoveBlurb,
    buyLinks: [],
    moodboardImages: [talesBook7Img, talesMainCoverImg],
    playlistUrl: '#',
    readUrl: 'https://www.wattpad.com/user/Araveink',
  },
];

export const toMrGeneralBook: BookItem = {
  id: 'to-mr-general',
  title: 'TO MR. GENERAL',
  subtitle: 'A Dark Desi Romance Novel',
  series: '',
  genre: 'Dark Desi Romance',
  status: 'To be announced',
  coverImage: toMrGeneralImg,
  aspectRatio: 'tall',
  releaseDate: 'To be announced',
  tropes: [
    'Military Romance',
    'Enemies to Lovers',
    'Dark Desi Romance',
    'Forced Proximity',
    'High Tension & Passion',
    'Power Dynamics',
  ],
  hook: 'Can duty ever become love?',
  description:
    'To Mr. General is a standalone dark desi romance novel set within the #AraVerse. Can duty ever become love? A story of military discipline, fierce power dynamics, and unspoken passion. Official chapter updates and release schedules will be announced soon.',
  blurbParagraphs: [
    '**To Mr. General** is a standalone dark desi romance novel set within the #AraVerse.',
    'Can duty ever become love? A story of military discipline, fierce power dynamics, and unspoken passion.',
    'Official release dates, chapter updates, and publication schedules will be announced soon on author socials and on this website.',
  ],
  buyLinks: [
    { label: 'WATTPAD', url: 'https://www.wattpad.com/story/414575571-to-mr-general' },
    { label: 'STCK ME', url: 'https://skxielol.stck.me/story/2088406/To-Mr-General' },
  ],
  moodboardImages: [toMrGeneralImg],
  playlistUrl: '#',
  readUrl: 'https://www.wattpad.com/story/414575571-to-mr-general',
  contentNotes: [
    'Military authority & intense power dynamics',
    'Enemies to lovers tension',
    'Explicit romantic content (18+)',
    'Emotional angst & fiery confrontations',
  ],
};

export const comingSoonMysteryBook: BookItem = {
  id: 'coming-soon-mystery',
  title: '???',
  subtitle: 'A Dark Desi Mythological Thriller',
  series: '',
  genre: 'Dark Desi Mythological Thriller',
  status: 'Coming Soon',
  coverImage: houseNoQuestionMarkImg,
  aspectRatio: 'tall',
  releaseDate: 'Coming Soon',
  tropes: [
    'Desi Mythology',
    'Dark Psychological Thriller',
    'Buried Secrets',
    'High Suspense',
  ],
  hook: "Behind ancient whispers and dark legends lies a secret that refuses to stay buried.",
  description:
    'An upcoming dark desi mythological thriller by Aravé S. Stay tuned for upcoming title reveals and exclusive teasers.',
  blurbParagraphs: [
    'Behind ancient whispers and dark legends lies a secret that refuses to stay buried.',
    'Stay tuned for upcoming title reveals and exclusive teasers.'
  ],
  buyLinks: [
    { label: 'WATTPAD', url: 'https://www.wattpad.com/user/Araveink' },
  ],
  moodboardImages: [houseNoQuestionMarkImg],
  playlistUrl: '#',
  readUrl: 'https://www.wattpad.com/user/Araveink',
};

export const seriesData: SeriesItem[] = [
  {
    id: 'tales-of-love',
    title: 'Tales of Love',
    urduTitle: 'داستانِ عشق',
    subtitle: 'The Seven stages of Dark side of Love',
    tagline: 'Seven stages. Seven questions. One journey through love, obsession, and return.',
    description: talesOfLoveDescription,
    coverImage: talesMainCoverImg,
    books: talesOfLoveBooks,
  },
];

export const standaloneBooks: BookItem[] = [
  toMrGeneralBook,
];

export const booksData: BookItem[] = [
  ...talesOfLoveBooks,
  toMrGeneralBook,
  comingSoonMysteryBook,
];
