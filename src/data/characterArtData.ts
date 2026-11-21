export interface CharacterArtItem {
  id: string;
  name: string;
  character: string;
  series: string;
  book: string;
  sex: 'Female' | 'Male';
  frontImage?: string;
  backImage?: string;
  role?: string;
  quote?: string;
  status: 'Available' | 'Coming Soon';
}

export const characterArtData: CharacterArtItem[] = [
  {
    id: 'char-dilkashi',
    name: 'Dilkashi',
    character: 'Dilkashi',
    series: '',
    book: 'To Mr. General',
    sex: 'Female',
    role: 'Female Protagonist',
    quote: 'She is such a silly girl, thinks he likes her.',
    status: 'Coming Soon',
  },
  {
    id: 'char-general',
    name: 'Mr. General',
    character: 'Mr. General',
    series: '',
    book: 'To Mr. General',
    sex: 'Male',
    role: 'Military Commander',
    quote: 'Sitting beside her in his uniform, smiling without saying a word.',
    status: 'Coming Soon',
  },
  {
    id: 'char-mystery',
    name: 'House No. 7 Lead',
    character: 'Mystery Protagonist',
    series: '',
    book: '???',
    sex: 'Female',
    role: 'Mythological Thriller Lead',
    quote: 'Behind ancient whispers and dark legends lies a secret that refuses to stay buried.',
    status: 'Coming Soon',
  },
];
