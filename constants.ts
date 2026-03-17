import { LinkItem } from './types';
import { Users, Camera } from './components/Icons';

export const HEADSHOT_URL = "/profile.jpeg";
export const N8N_WEBHOOK_URL = "https://divinecreative.app.n8n.cloud/webhook/bailey-contact";


export const linksData: LinkItem[] = [
  {
    id: 'family',
    title: 'About Our Ministry',
    url: 'divinecreative.org',
    href: 'https://divinecreative.org',
    icon: Users
  },
  {
    id: 'documentary',
    title: 'Vietnam Documentary',
    url: 'divinecreative.org/projects/vietnam-documentary',
    href: 'https://www.divinecreative.org/projects/vietnam-documentary',
    icon: Camera
  },
];