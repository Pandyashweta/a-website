import aRoyalMistressImg from '../assets/books/a-royal-mistress-1.png';
import becomingTheItGirlImg from '../assets/books/becoming-the-it-girl-1.png';
import goldenGooseImg from '../assets/books/golden-goose-1.png';
import houseNo7Img from '../assets/books/house-no-7-1.png';

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
    id: 'book-1',
    title: 'A ROYAL MISTRESS',
    subtitle: 'A Story of Power, Passion, and Treason',
    series: '',
    genre: 'Royal Romance',
    status: 'Available Now',
    coverImage: aRoyalMistressImg,
    aspectRatio: 'tall',
    releaseDate: 'October 20, 2024',
    tropes: ['Forbidden Romance', 'Royal High Society', 'Secret Liaisons', 'Power Struggle'],
    hook: "Behind closed palace doors, love is the most dangerous treason of all.",
    description:
      'Behind closed palace doors lies a world of secret royal liaisons, dangerous political games, and an impossible desire that could shatter a kingdom.',
    blurbParagraphs: [
      'Behind closed palace doors lies a world of secret royal liaisons and dangerous political games.',
      'When an unexpected passion sparks between high royalty and an unyielding lover, royalty becomes a golden cage.',
      'Power, secrets, and unspoken desires collide in a story where love is the most dangerous treason of all.'
    ],
    narrator: 'Jacob Morgan, Emily Woo Zeller',
    buyLinks: [
      { label: 'AMAZON', url: 'https://amazon.com/author/skxie' },
      { label: 'WATTPAD', url: 'https://wattpad.com/user/skxielol' },
      { label: 'STCK ME', url: 'https://skxielol.stck.me' },
      { label: 'GOODREADS', url: 'https://goodreads.com/skxie' },
    ],
    moodboardImages: [
      aRoyalMistressImg,
      becomingTheItGirlImg,
      goldenGooseImg,
      houseNo7Img,
    ],
    playlistUrl: '#',
    readUrl: 'https://wattpad.com/user/skxielol',
    contentNotes: [
      'Forbidden royal romance & secrecy',
      'High society political intrigue & blackmail',
      'Explicit romantic content (18+)',
      'Power imbalance & dangerous liaisons',
      'Emotional angst & heartbreak',
    ],
  },
  {
    id: 'book-2',
    title: 'BECOMING THE IT GIRL',
    subtitle: 'Fame, Ambition, and the Price of Perfection',
    series: '',
    genre: 'Contemporary Romance',
    status: 'Available Now',
    coverImage: becomingTheItGirlImg,
    aspectRatio: 'wide',
    releaseDate: 'April 27, 2025',
    tropes: ['High Society', 'Fame & Glamour', 'Opposites Attract', 'Public Persona'],
    hook: "Stepping into the spotlight means keeping the truth hidden behind flawless smiles.",
    description:
      'Stepping into the spotlight means navigating high society, intense media glamour, and keeping the truth hidden behind flawless smiles.',
    blurbParagraphs: [
      'Stepping into the spotlight means navigating high society and intense media glamour.',
      'As ambition drives her to the top of the social ladder, the line between her true self and her public persona begins to blur.',
      'An electrifying tale of fashion, fortune, and the high price of becoming everyone’s ultimate obsession.'
    ],
    narrator: 'Aiden Snow, Cindy Kay',
    buyLinks: [
      { label: 'STCK ME', url: 'https://skxielol.stck.me' },
      { label: 'WATTPAD', url: 'https://wattpad.com/user/skxielol' },
    ],
    moodboardImages: [
      becomingTheItGirlImg,
      aRoyalMistressImg,
      goldenGooseImg,
      houseNo7Img,
    ],
    playlistUrl: '#',
    readUrl: 'https://skxielol.stck.me',
    contentNotes: [
      'Public scrutiny & media pressure',
      'High fashion & social ladder rivalry',
      'Explicit romantic content (18+)',
      'Panic & anxiety under intense spotlight',
      'Secrets & hidden identities',
    ],
  },
  {
    id: 'book-3',
    title: 'GOLDEN GOOSE',
    subtitle: 'Fortune Favors the Bold',
    series: '',
    genre: 'Romantic Suspense',
    status: 'Available Now',
    coverImage: goldenGooseImg,
    aspectRatio: 'tall',
    releaseDate: 'October 24, 2025',
    tropes: ['High Finance', 'Corporate Empire', 'Hidden Motives', 'Dangerous Attraction'],
    hook: "In a high-stakes game of wealth and power, one lucrative secret changes everything.",
    description:
      'In a high-stakes game of wealth and power, one lucrative secret changes everything, sparking a relentless chase for ultimate control.',
    blurbParagraphs: [
      'In a high-stakes world of corporate moguls and golden opportunities, fortune always favors the bold.',
      'When an extraordinary secret turns her into the ultimate prize, powerful rivals compete to claim her loyalty.',
      'A thrilling story of high finance, hidden motives, and unyielding ambition.'
    ],
    narrator: 'Shane East, Stella Bloom',
    buyLinks: [
      { label: 'AMAZON', url: 'https://amazon.com/author/skxie' },
      { label: 'WATTPAD', url: 'https://wattpad.com/user/skxielol' },
      { label: 'STCK ME', url: 'https://skxielol.stck.me' },
      { label: 'GOODREADS', url: 'https://goodreads.com/skxie' },
    ],
    moodboardImages: [
      goldenGooseImg,
      houseNo7Img,
      aRoyalMistressImg,
      becomingTheItGirlImg,
    ],
    playlistUrl: '#',
    readUrl: 'https://wattpad.com/user/skxielol',
    contentNotes: [
      'High-stakes corporate power plays',
      'Dangerous attraction & rivalry',
      'Explicit romantic content (18+)',
      'Threats of extortion & financial sabotage',
      'Moral ambiguity & deceptive alliances',
    ],
  },
  {
    id: 'book-4',
    title: 'HOUSE NO. 7',
    subtitle: 'Some Secrets Are Better Left Buried',
    series: '',
    genre: 'Dark Mystery Romance',
    status: 'Coming Soon',
    coverImage: houseNo7Img,
    aspectRatio: 'square',
    releaseDate: 'April 30, 2026',
    tropes: ['Gothic Estate', 'Unraveling Mysteries', 'Dark Romance', 'Forbidden Past'],
    hook: "Behind the pristine gates of House No. 7 lie haunting mysteries that refuse to stay buried.",
    description:
      'Behind the pristine gates of House No. 7 lie haunting mysteries and dark truths that refuse to stay hidden.',
    blurbParagraphs: [
      'Behind the pristine gates of House No. 7 lie haunting mysteries and dark truths.',
      'Unraveling the history of the grand estate uncovers forgotten promises and whispers that echo through empty halls.',
      'A gripping suspense romance where every shadow holds a story and every room conceals a secret.'
    ],
    narrator: 'Teddy Hamilton, Laura Horowitz',
    buyLinks: [
      { label: 'WATTPAD', url: 'https://wattpad.com/user/skxielol' },
      { label: 'STCK ME', url: 'https://skxielol.stck.me' },
    ],
    moodboardImages: [
      houseNo7Img,
      goldenGooseImg,
      becomingTheItGirlImg,
      aRoyalMistressImg,
    ],
    playlistUrl: '#',
    readUrl: 'https://amazon.com/author/skxie',
    contentNotes: [
      'Dark gothic atmosphere & mystery',
      'Mentions of past estate trauma',
      'Explicit romantic content (18+)',
      'Intense psychological suspense',
      'Family secrets & buried past',
    ],
  },
];
