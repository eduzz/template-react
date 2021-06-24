export const ENV = (process.env.REACT_APP_ENV || 'production').trim();

export const API_ENDPOINT = (process.env.REACT_APP_API_ENDPOINT || '').trim();
export const CDN_ENDPOINT = (process.env.REACT_APP_CDN_ENDPOINT || '').trim();

if (!API_ENDPOINT) console.log('API IN MOCK MODE');

export const SENTRY_KEY = (process.env.REACT_APP_SENTRY_KEY || '').trim();

export const TOAST_DEFAULT_TIMEOUT = 3000;
export const TOAST_ERROR_TIMEOUT = 4000;

export const IS_DEVELOPMENT = ENV === 'development';
