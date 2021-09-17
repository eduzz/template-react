import { atom, AtomEffect } from 'recoil';
import apiService from 'services/api';
import authService from 'services/auth';

export type AtomEffectAdapter = Parameters<AtomEffect<any>>[0];

export const atomAuthToken = atom<string>({
  key: 'authToken',
  default: null,
  effects_UNSTABLE: [authService.atomAuthTokenAdapter.connect(), apiService.atomAuthTokenAdapter.connect()]
});
