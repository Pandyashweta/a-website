import toMrGeneralImg from '../assets/books/to-mr-genral.png';
import houseNoQuestionMarkImg from '../assets/books/house-no-.png';

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

export const booksData: BookItem[] = [
  {
    id: 'to-mr-general',
    title: 'TO MR. GENERAL',
    subtitle: 'A Dark Desi Romance Novel',
    series: '',
    genre: 'Dark Desi Romance',
    status: 'Available Now',
    coverImage: toMrGeneralImg,
    aspectRatio: 'tall',
    releaseDate: '2026',
    tropes: [
      'Military Romance',
      'Enemies to Lovers',
      'Dark Desi Romance',
      'Forced Proximity',
      'High Tension & Passion',
      'Power Dynamics',
    ],
    hook: 'She is such a silly girl, thinks he likes her.',
    description:
      "What a beautiful wedding that was, she thought as he sat beside her quietly, admiring the audacity of her own belief that the marriage would work out. He wasn't going to stay for more than three days a month, yet here he was, sitting beside her in his uniform, smiling without saying a word. Why would he even need to speak? It's not like he sees her as his wife anyway.",
    blurbParagraphs: [
      "What a beautiful wedding that was, she thought as he sat beside her quietly, admiring the audacity of her own belief that the marriage would work out. He wasn't going to stay for more than three days a month, yet here he was, sitting beside her in his uniform, smiling without saying a word.",
      'Why would he even need to speak?',
      "_It's not like he sees her as his wife anyway._",
      'UPDATES ON BOOK - WATTPAD: Every Saturday 12:30 PM IST',
      'UPDATES ON BOOK - Stck.me: Every Thursday 12:30 PM IST',
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
  },
  {
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
      'An upcoming dark desi mythological thriller by skxie. Stay tuned for upcoming title reveals and exclusive teasers.',
    blurbParagraphs: [
      'Behind ancient whispers and dark legends lies a secret that refuses to stay buried.',
      'Stay tuned for upcoming title reveals and exclusive teasers.'
    ],
    buyLinks: [
      { label: 'WATTPAD', url: 'https://wattpad.com/user/skxielol' },
    ],
    moodboardImages: [houseNoQuestionMarkImg],
    playlistUrl: '#',
    readUrl: 'https://wattpad.com/user/skxielol',
  },
];
