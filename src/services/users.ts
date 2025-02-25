import { IGetMeResult } from '~shared/types/api';

import { apiClientWithAuth } from './client';

export const getMe = () => {
  return apiClientWithAuth.get<IGetMeResult>('/users/me');
};
