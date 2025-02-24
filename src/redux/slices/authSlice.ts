import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { StorageKey } from '~/constants';
import {
  clearLocalStorage,
  readLocalStorage,
  writeLocalStorage
} from '~/utils';
import { ITokenDto, IUserWithSettingsDto } from '~shared/types/api';

export interface AuthSlice {
  token?: {
    accessToken?: string;
    refreshToken?: string;
  };
  data?: IUserWithSettingsDto;
}

const initialState: AuthSlice = {
  token: readLocalStorage(StorageKey.TOKEN, undefined)
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<ITokenDto>) => {
      state.token = action.payload;
      writeLocalStorage(StorageKey.TOKEN, action.payload);
    },
    setUserData: (state, action: PayloadAction<IUserWithSettingsDto>) => {
      state.data = action.payload;
    },
    clearAuthState: () => {
      clearLocalStorage(StorageKey.TOKEN);
      return {};
    }
    // setPinnedDms: (state, action: PayloadAction<Array<AccountDto>>) => {
    //   if (state.data) {
    //     state.data.userSettings.dmSettings.pinnedDms = action.payload;
    //   }
    // }
  }
});

export const { setToken, setUserData, clearAuthState /* setPinnedDms*/ } =
  authSlice.actions;

export default authSlice.reducer;
