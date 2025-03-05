import {
  ILoginData,
  ILoginResult,
  IRegisterData,
  IVerifyData
} from '~shared/types/api';

import { apiClient, apiClientWithAuth } from './client';

export const login = (data: ILoginData) => {
  return apiClient.post<ILoginResult>('/auth/login', data);
};

export const register = (data: IRegisterData) => {
  return apiClient.post('/auth/register', data);
};

export const verify = (data: IVerifyData) => {
  return apiClient.patch('/auth/verify', data);
};

export const logout = () => {
  return apiClientWithAuth.post('/auth/logout');
};
