export const ENV = (process.env.REACT_APP_ENV || 'production').trim();

export const BRANCH_NAME = (process.env.REACT_APP_BRANCH_NAME || '').trim();

export const API_ENDPOINT = (process.env.REACT_APP_API_ENDPOINT || '').trim();
if (!API_ENDPOINT) throw new Error('Please provide an API_ENDPOINT');

export const SENTRY_KEY = (process.env.REACT_APP_SENTRY_KEY || '').trim();

export const IS_DEVELOPMENT = ENV === 'development';
export const IS_QA = BRANCH_NAME !== '';

export const TOAST_DEFAULT_TIMEOUT = 3000;
export const TOAST_ERROR_TIMEOUT = 15000;

export const BASEURL_V2 = (process.env.REACT_APP_BASEURL_V2 || '').trim();
export const CERTIFICATE_URL = (process.env.REACT_APP_CERTIFICATE_URL || '').trim();
export const CDN_URL = (process.env.REACT_APP_CDN || '').trim();
export const REACT_APP_LEARNER = (process.env.REACT_APP_LEARNER || '').trim();

export const COOKIE_DOMAIN = (process.env.REACT_APP_COOKIE_DOMAIN || '').trim();

export const BUILD_NUMBER = process.env.REACT_APP_BUILD_NUMBER;
export const BUILD_DATE = process.env.REACT_APP_BUILD_DATE;