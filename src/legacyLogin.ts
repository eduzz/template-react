import { COOKIE_DOMAIN } from 'settings';

const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
  const parts = cookie.split('=');

  try {
    acc[parts[0]] = JSON.parse(decodeURIComponent(parts[1]));
  } catch (err) {
    acc[parts[0]] = parts[1];
  }

  return acc;
}, {} as any);

if (cookies.userSession) {
  if (!cookies.userSession.token) {
    localStorage.clear();

    const date = new Date();
    date.setTime(date.getTime() - (1000 * 60 * 60 * 24));
    window.document.cookie = `userSession=; domain=${COOKIE_DOMAIN}; path=/; expires=${date.toUTCString()}`;
  } else {
    localStorage.setItem('authToken', JSON.stringify(cookies.userSession));
  }
}