export const ENV = process.env.PUBLIC_ENV || 'production';

export const ACCOUNTS_PARTNER_ID = process.env.PUBLIC_ACCOUNTS_PARTNER_ID;
export const ACCOUNTS_ENV = ENV === 'development' ? 'qa' : 'production';

export const API_ENDPOINT = process.env.PUBLIC_API_ENDPOINT!;
export const CDN_ENDPOINT = process.env.PUBLIC_CDN_ENDPOINT;
export const SENTRY_DSN = process.env.PUBLIC_SENTRY_DSN;

export const GOOGLE_TAG_MANAGER = process.env.PUBLIC_GOOGLE_TAG_MANAGER;
export const HOTJAR_ID = Number(process.env.PUBLIC_HOTJAR_ID);
export const HOTJAR_SNIPPET_VERSION = 6;

export const IS_DEV = ENV === 'development';

if (!API_ENDPOINT) console.log('API IN MOCK MODE');
