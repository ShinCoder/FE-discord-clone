import { apiClientWithAuth } from './client';

export const unpinDm = (params: { accountId: string; targetId: string }) => {
  return apiClientWithAuth.delete(
    `/users/${params.accountId}/settings/direct-message/pin/${params.targetId}`
  );
};
