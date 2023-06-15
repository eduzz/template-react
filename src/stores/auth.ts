import { create } from 'zustand';
import { combine } from 'zustand/middleware';

import decodeJWTToken from '@/helpers/jwt';

export interface CurrentUser {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  belt?: string;
  tag?: 'lite' | 'pro' | 'unity' | 'partner';
  isClubeBlack?: boolean;
  isSupport?: boolean;
  supportId?: number;
}

const useAuthStore = create(
  combine(
    {
      authToken: null as string | null,
      refreshToken: null as string | null
    },
    (set, get) => ({
      isAuthenticated() {
        return !!get()?.authToken;
      },
      currentUser() {
        const authToken = get().authToken;
        if (!authToken) return undefined;
        return decodeJWTToken<CurrentUser>(authToken);
      },
      setTokens(authToken: string, refreshToken: string) {
        set({ authToken, refreshToken });
      },
      setAuthToken(authToken: string) {
        set({ authToken });
      },
      clear() {
        set({ authToken: undefined, refreshToken: undefined });
      }
    })
  )
);

export default useAuthStore;
