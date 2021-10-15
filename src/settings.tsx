export const ENV = (import.meta.env.REACT_APP_ENV as string) || 'production';

export const API_ENDPOINT = (import.meta.env.REACT_APP_API_ENDPOINT as string) || '';
export const CDN_ENDPOINT = (import.meta.env.REACT_APP_CDN_ENDPOINT as string) || '';

if (!API_ENDPOINT) console.log('API IN MOCK MODE');

export const SENTRY_KEY = (import.meta.env.REACT_APP_SENTRY_KEY as string) || '';

export const TOAST_DEFAULT_TIMEOUT = 3000;
export const TOAST_ERROR_TIMEOUT = 4000;

export const IS_DEVELOPMENT = ENV === 'development';
