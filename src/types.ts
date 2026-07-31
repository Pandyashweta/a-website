export interface NavItem {
  id: string;
  label: string;
  url: string;
  description?: string;
}

export interface SocialItem {
  id: string;
  name: string;
  icon: 'instagram' | 'youtube' | 'email' | 'spotify' | 'apple' | 'tiktok' | 'twitter' | 'discord';
  url: string;
}

export type PageSection = 'skxie' | 'extinctmuffin';
