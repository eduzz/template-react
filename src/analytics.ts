import { hotjar } from 'react-hotjar';

import { GOOGLE_TAG_MANAGER, HOTJAR_ID, HOTJAR_SNIPPET_VERSION } from './envs';
import { CurrentUser } from './stores/auth';

declare global {
  interface Window {
    gtag?: any;
    dataLayer: object[];
  }
}

export function setUser(currentUser: CurrentUser) {
  setHotjarUser({
    id: currentUser.id,
    email: currentUser.email,
    name: currentUser.name
  });

  setGoogleTagManagerUser({
    user_id: currentUser.id
  });
}

function setGoogleTagManagerUser(user: { user_id: number }) {
  if (!GOOGLE_TAG_MANAGER) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(user);

  window.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };

  const script = document.createElement('script');
  const head = document.getElementsByTagName('head')[0];
  script.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GOOGLE_TAG_MANAGER}');
  `;
  head.insertBefore(script, head.firstChild);
}

function setHotjarUser({ id, ...user }: { id: number; email: string; name: string }) {
  if (!HOTJAR_ID) return;
  hotjar.identify(String(id), user);
}

if (HOTJAR_ID) {
  hotjar.initialize(HOTJAR_ID, HOTJAR_SNIPPET_VERSION);
}
