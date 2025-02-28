import {
  IAcceptFriendRequestData,
  IGetFriendRequestsResult,
  IGetFriendsResult,
  IGetMeResult,
  IIgnoreFriendRequestData,
  ISendFriendRequestData
} from '~shared/types/api';

import { apiClientWithAuth } from './client';

export const getMe = () => {
  return apiClientWithAuth.get<IGetMeResult>('/users/me');
};

export const getFriends = (accountId: string) => {
  return apiClientWithAuth.get<IGetFriendsResult>(
    `/users/${accountId}/friends`
  );
};

export const sendFriendRequest = (params: {
  accountId: string;
  data: ISendFriendRequestData;
}) => {
  return apiClientWithAuth.post(
    `/users/${params.accountId}/friend-request`,
    params.data
  );
};

export const getFriendRequests = (accountId: string) => {
  return apiClientWithAuth.get<IGetFriendRequestsResult>(
    `/users/${accountId}/friend-requests`
  );
};

export const acceptFriendRequest = (params: {
  accountId: string;
  targetId: string;
}) => {
  return apiClientWithAuth.patch(
    `/users/${params.accountId}/friend-request/accept`,
    { targetId: params.targetId } satisfies IAcceptFriendRequestData
  );
};

export const ignoreFriendRequest = (params: {
  accountId: string;
  targetId: string;
}) => {
  return apiClientWithAuth.patch(
    `/users/${params.accountId}/friend-request/ignore`,
    { targetId: params.targetId } satisfies IIgnoreFriendRequestData
  );
};

export const cancelFriendRequest = (params: {
  accountId: string;
  targetId: string;
}) => {
  return apiClientWithAuth.delete(
    `/users/${params.accountId}/friend-request/${params.targetId}`
  );
};

export const removeFriend = (params: {
  accountId: string;
  targetId: string;
}) => {
  return apiClientWithAuth.delete(
    `/users/${params.accountId}/friend/${params.targetId}`
  );
};
