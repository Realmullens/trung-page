import { LinkItem } from './types';
import { Users, MessageSquare } from './components/Icons';

export const HEADSHOT_URL = "https://dcm-ministry-pages.s3.us-east-2.amazonaws.com/sophia-cyr-profile.jpg";
export const UPDATES_URL = "https://opturl.com/8ZV0mKwz";
export const N8N_WEBHOOK_URL = "https://divinecreative.app.n8n.cloud/webhook/bailey-contact";


export const linksData: LinkItem[] = [
  {
    id: 'updates',
    title: 'Receive My Updates',
    url: 'sophiacyr.org/updates',
    href: UPDATES_URL,
    icon: MessageSquare
  },
  {
    id: 'family',
    title: 'About Our Ministry',
    url: 'divinecreative.org',
    href: 'https://divinecreative.org',
    icon: Users
  },
];