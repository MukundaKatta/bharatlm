import { IndicLanguage } from '@/types';

export const defaultLocale: IndicLanguage = 'en';

export const locales: IndicLanguage[] = [
  'en', 'hi', 'ta', 'te', 'kn', 'ml',
  'bn', 'mr', 'gu', 'pa', 'od', 'as', 'ur', 'sa',
];

export type Messages = typeof import('./locales/en.json');
