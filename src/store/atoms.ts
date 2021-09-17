import { atom, AtomEffect } from 'recoil';
import authService from 'services/auth';

export type AtomEffectAdapter = Parameters<AtomEffect<any>>[0];

export const atomAuthToken = atom<string>({
  key: 'authToken',
  default: undefined,
  effects_UNSTABLE: [authService.atomAuthTokenAdapter.connect()]
});
