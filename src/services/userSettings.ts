import {
  IPinDirectMessageData,
  IPinDirectMessageResult
} from '~shared/types/api';

import { apiClientWithAuth } from './client';

export const pinDm = (params: { accountId: string; targetId: string }) => {
  return apiClientWithAuth.post<IPinDirectMessageResult>(
    `/users/${params.accountId}/settings/direct-message/pin`,
    { targetId: params.targetId } satisfies IPinDirectMessageData
  );
};

export const unpinDm = (params: { accountId: string; targetId: string }) => {
  return apiClientWithAuth.delete(
    `/users/${params.accountId}/settings/direct-message/pin/${params.targetId}`
  );
};
