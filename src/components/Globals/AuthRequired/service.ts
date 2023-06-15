import { post } from '@/api';
import { ACCOUNTS_ENV, IS_DEV, ACCOUNTS_PARTNER_ID } from '@/envs';
import { event } from '@/log';
import useAuthStore from '@/stores/auth';

declare global {
  interface Window {
    Eduzz: { Accounts: any };
  }
}

const accountsLoader = loadAccounts();

export async function initAccounts(theme: 'dark' | 'light') {
  const token = await getAccountsToken(undefined, theme);
  cleanUrl();

  if (!token) return;

  const response = await post('/auth/validate', { token });
  event('login', { userId: response.user.id });

  useAuthStore.getState().setTokens(response.authToken, response.refreshToken);
}

export async function logout() {
  event('logout');

  if (IS_DEV) localStorage.clear();
  window.Eduzz.Accounts.logout({ env: ACCOUNTS_ENV });
}

function cleanUrl() {
  const params = new URLSearchParams(new URL(window.location.href).search.slice(1));
  params.delete('accounts_token');
  params.delete('accounts_login_token');

  const newParams = params.toString() ? `?${params.toString()}` : '';
  window.history.pushState(null, '', `${window.location.origin}${window.location.pathname}${newParams}`);
}

declare global {
  interface Window {
    Eduzz: { Accounts: any };
  }
}

async function getAccountsToken(partnerId?: string, theme?: 'dark' | 'light') {
  await accountsLoader;
  partnerId = partnerId ?? ACCOUNTS_PARTNER_ID;

  return await new Promise<string>((resolve, reject) => {
    if (!partnerId) throw new Error('no accounts env');

    window.Eduzz.Accounts.login(partnerId, {
      env: ACCOUNTS_ENV,
      dark: theme === 'dark' ? 'true' : undefined
    }).subscribe({
      next: (result: string) => resolve(result),
      error: (err: any) => reject(err)
    });
  });
}

async function loadAccounts() {
  if (window.Eduzz?.Accounts) return;

  if (!(window as any).__verticalLoadingAccounts) {
    (window as any).__verticalLoadingAccounts = new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.eduzzcdn.com/accounts/accounts.js';
      script.type = 'text/javascript';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = err => reject(err);

      document.head.appendChild(script);
    });
  }

  return (window as any).__verticalLoadingAccounts;
}
