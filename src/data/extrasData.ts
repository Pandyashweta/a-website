export interface ExtraLinkItem {
  id: string;
  name: string;
  url: string;
  description?: string;
}

export interface ExtrasData {
  moodboard: {
    id: string;
    title: string;
    description: string;
    links: ExtraLinkItem[];
  };
  playlist: {
    id: string;
    title: string;
    description: string;
    links: ExtraLinkItem[];
  };
  artBooks: {
    id: string;
    title: string;
    description: string;
    status: string;
  };
}

export const extrasData: ExtrasData = {
  moodboard: {
    id: 'mood-board',
    title: 'Mood board',
    description: 'Aesthetic visual collections, character moods, and atmospheric concepts.',
    links: [
      {
        id: 'dilkashi',
        name: 'Dilkashi',
        url: 'https://in.pinterest.com/skxielol/to-mr-general/',
        description: 'Official Pinterest mood board for Dilkashi',
      },
    ],
  },
  playlist: {
    id: 'playlist',
    title: 'Playlist',
    description: 'Curated track selections and ambient sounds capturing the emotional atmosphere.',
    links: [
      {
        id: 'dilkashi',
        name: 'Dilkashi',
        url: '#',
        description: 'Official soundtrack playlist for Dilkashi',
      },
    ],
  },
  artBooks: {
    id: 'art-books',
    title: 'Art - Books',
    description: 'Exclusive character illustrations, scene artworks, and visual companion pieces.',
    status: 'Coming Soon',
  },
};
