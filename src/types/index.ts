export interface NavItem {
  id: string;
  label: string;
  url: string;
}

export interface SocialItem {
  id: string;
  name: string;
  icon: string;
  url: string;
}

export interface SubscriberData {
  id: string;
  email: string;
  firstName?: string | null;
  status: 'UNVERIFIED' | 'SUBSCRIBED' | 'UNSUBSCRIBED' | 'BOUNCED';
  createdAt: string;
  tags?: string[];
}

export interface NewsletterData {
  id: string;
  title: string;
  slug: string;
  contentMarkdown: string;
  contentHtml: string;
  status: 'DRAFT' | 'SCHEDULED' | 'SENT' | 'ARCHIVED';
  scheduledAt?: string | null;
  sentAt?: string | null;
  createdAt: string;
}

export interface DashboardMetrics {
  totalSubscribers: number;
  todaySubscribers: number;
  monthlyGrowthRate: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
  unsubscribeRate: number;
}
