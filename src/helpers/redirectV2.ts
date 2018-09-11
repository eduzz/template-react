import { BASEURL_V2 } from 'settings';

export default function redirectV2(path: string) {
  window.location.href = getUrlV2(path);
}

export function getUrlV2(path: string) {
  return `${BASEURL_V2}${path}`;
}