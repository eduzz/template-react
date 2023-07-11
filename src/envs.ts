export const ENV = import.meta.env.VITE_ENV || 'production';

export const ACCOUNTS_PARTNER_ID = import.meta.env.VITE_ACCOUNTS_PARTNER_ID;
export const ACCOUNTS_ENV = ENV === 'development' ? 'qa' : 'production';

export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
export const CDN_ENDPOINT = import.meta.env.VITE_CDN_ENDPOINT;
export const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;

export const GOOGLE_TAG_MANAGER = import.meta.env.VITE_GOOGLE_TAG_MANAGER;
export const HOTJAR_ID = import.meta.env.VITE_HOTJAR_ID;
export const HOTJAR_SNIPPET_VERSION = 6;

export const IS_DEV = ENV === 'development';

if (!API_ENDPOINT) console.log('API IN MOCK MODE');
