import {
  IGetDirectMessagesQuery,
  IGetDirectMessagesResult
} from '~shared/types/api';

import { apiClientWithAuth } from './client';

export const getDirectMessages = (options: IGetDirectMessagesQuery) => {
  return apiClientWithAuth.get<IGetDirectMessagesResult>('/direct-messages', {
    params: options
  });
};
