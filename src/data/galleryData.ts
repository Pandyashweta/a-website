export interface GalleryItem {
  id: string;
  frontImage: string;
  backImage?: string; // Optional back image for 3D card flip on hover
}

export const galleryData: GalleryItem[] = [
  {
    id: 'gal-dbd',
    frontImage: '/assets/gallery/posters/DBD-white.png',
    backImage: '/assets/gallery/posters/DBD-black.png',
  },
  {
    id: 'gal-mirror',
    frontImage: '/assets/gallery/posters/mirror-white.png',
    backImage: '/assets/gallery/posters/mirror-black.png',
  },
];
