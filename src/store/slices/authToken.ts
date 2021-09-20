import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import storageService from 'services/storage';

export const authTokenSlice = createSlice({
  name: 'authToken',
  initialState: { value: storageService.get<string>('auth-token') },
  reducers: {
    set: (state, { payload: newToken }: PayloadAction<string>) => {
      newToken ? storageService.set('auth-token', newToken) : storageService.remove('auth-token');
      state.value = newToken;
    }
  }
});
