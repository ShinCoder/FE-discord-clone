import { Box, Button, Grid2, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import ChannelTextarea from '~/components/ChannelTextarea';
import { ProfileModalExtraProps } from '~/components/GlobalModal/ProfileModal';
import UserAvatar from '~/components/UserAvatar';
import { ModalKey, protectedRoutes } from '~/constants';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { showModal } from '~/redux/slices/modalSlice';
import { setLoading } from '~/redux/slices/statusSlice';
import {
  acceptFriendRequest,
  blockUser,
  ignoreFriendRequest,
  getUserProfile,
  removeFriend,
  sendFriendRequest,
  unblockUser
} from '~/services';
import {
  processMessageForDisplay,
  ProcessedMessageDate,
  concatenateProcessedMessages
} from '~/utils';
import { SocketEvents } from '~shared/constants';
import { EMessageType } from '~shared/types/api';
import {
  IJoinDirectMessageRoomData,
  ILeaveDirectMessageRoomData,
  IReceiveDirectMessageDto,
  IReceiveFailedDirectMessageDto,
  ISendDirectMessageData
} from '~shared/types/socket';

import MessageArea from './components/MessageArea';
import { ProfileSectionHeader, ProfileSectionText } from './elements';

const DirectMessage = () => {
  const theme = useTheme();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { socket } = useAppSelector((state) => state.socket);
  const { data: userData } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (id === userData?.id) {
      navigate(protectedRoutes.myChannels, { replace: true });
    }
  }, [id, navigate, userData?.id]);

  // Get target profile
  const { data: targetData, refetch } = useQuery({
    queryKey: ['user-profile', id],
    queryFn: ({ queryKey }) => {
      if (queryKey[1]) {
        return getUserProfile(queryKey[1]);
      }
    },
    enabled: false
  });

  const profile = useMemo(() => targetData?.data, [targetData?.data]);

  const addFriendMutation = useMutation({
    mutationFn: sendFriendRequest,
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSettled: () => {
      dispatch(setLoading(false));
    },
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      dispatch(
        showModal({
          key: ModalKey.FRIEND_REQUEST_ERR
        })
      );
    }
  });

  const acceptRequestMutation = useMutation({
    mutationFn: acceptFriendRequest,
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSettled: () => {
      dispatch(setLoading(false));
    },
    onSuccess: () => {
      refetch();
    }
  });

  const ignoreRequestMutation = useMutation({
    mutationFn: ignoreFriendRequest,
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSettled: () => {
      dispatch(setLoading(false));
    },
    onSuccess: () => {
      refetch();
    }
  });

  const removeFriendMutation = useMutation({
    mutationFn: removeFriend,
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSettled: () => {
      dispatch(setLoading(false));
    },
    onSuccess: () => {
      refetch();
    }
  });

  const blockMutation = useMutation({
    mutationFn: blockUser,
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSettled: () => {
      dispatch(setLoading(false));
    },
    onSuccess: () => {
      refetch();
    }
  });

  const unblockMutation = useMutation({
    mutationFn: unblockUser,
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSettled: () => {
      dispatch(setLoading(false));
    },
    onSuccess: () => {
      refetch();
    }
  });

  const handleAddFriend = useCallback(() => {
    if (userData && profile) {
      addFriendMutation.mutate({
        accountId: userData.id,
        data: { targetId: profile.id }
      });
    }
  }, [addFriendMutation, profile, userData]);

  const handleRemoveFriend = useCallback(() => {
    if (userData && profile) {
      removeFriendMutation.mutate({
        accountId: userData.id,
        targetId: profile.id
      });
    }
  }, [profile, removeFriendMutation, userData]);

  const handleAcceptRequest = useCallback(() => {
    if (userData && profile) {
      acceptRequestMutation.mutate({
        accountId: userData.id,
        targetId: profile.id
      });
    }
  }, [acceptRequestMutation, profile, userData]);

  const handleIgnoreRequest = useCallback(() => {
    if (userData && profile) {
      ignoreRequestMutation.mutate({
        accountId: userData.id,
        targetId: profile.id
      });
    }
  }, [userData, profile, ignoreRequestMutation]);

  const handleBlockUser = useCallback(() => {
    if (userData && profile) {
      blockMutation.mutate({ accountId: userData.id, targetId: profile.id });
    }
  }, [blockMutation, profile, userData]);

  const handleUnblockUser = useCallback(() => {
    if (userData && profile) {
      unblockMutation.mutate({ accountId: userData.id, targetId: profile.id });
    }
  }, [unblockMutation, profile, userData]);

  const handleOpenProfileModal = useCallback(() => {
    if (profile) {
      dispatch(
        showModal({
          key: ModalKey.PROFILE,
          extraProps: {
            profile,
            onAddFriend: handleAddFriend,
            onAcceptFriend: handleAcceptRequest,
            onIgnoreFriend: handleIgnoreRequest,
            onRemoveFriend: handleRemoveFriend
          }
        } satisfies { key: string; extraProps: ProfileModalExtraProps })
      );
    }
  }, [
    dispatch,
    handleAcceptRequest,
    handleAddFriend,
    handleIgnoreRequest,
    handleRemoveFriend,
    profile
  ]);

  // Get target profile --end

  // Get dm
  const [dms, setDms] = useState<Array<ProcessedMessageDate>>([]);
  const [dmsNumber, setDmsNumber] = useState<number>(0);

  useEffect(() => {
    setDms([]);
    setDmsNumber(0);
  }, [id]);

  const handleAddDms = useCallback((_data: Array<ProcessedMessageDate>) => {
    setDms((pre) => concatenateProcessedMessages(_data, pre));
  }, []);
  const handleAddDmsNumber = useCallback((_data: number) => {
    setDmsNumber((pre) => pre + _data);
  }, []);
  // Get dm --end

  // Send & receive dm
  useEffect(() => {
    if (socket && id) {
      socket.emit(SocketEvents.joinDirectMessageRoom, {
        targetId: id
      } satisfies IJoinDirectMessageRoomData);
    }

    return () => {
      if (socket && id) {
        socket.emit(SocketEvents.leaveDirectMessageRoom, {
          targetId: id
        } satisfies ILeaveDirectMessageRoomData);
      }
    };
  }, [id, profile, socket]);

  useEffect(() => {
    const onReceiveDm = (_data: IReceiveDirectMessageDto) => {
      if (userData && profile) {
        setDms((pre) =>
          concatenateProcessedMessages(
            pre,
            processMessageForDisplay({
              messages: [_data.message],
              senders: [userData, profile]
            })
          )
        );
        setDmsNumber((pre) => pre + 1);
      }
    };

    const onReceiveFailedDm = (_data: IReceiveFailedDirectMessageDto) => {
      if (userData && profile) {
        setDms((pre) =>
          concatenateProcessedMessages(
            pre,
            processMessageForDisplay({
              messages: [_data.message],
              senders: [userData, profile]
            })
          )
        );
      }
    };
    if (socket && id) {
      socket.on(SocketEvents.receiveDirectMessage, onReceiveDm);
      socket.on(SocketEvents.receiveFailedDirectMessage, onReceiveFailedDm);
    }

    return () => {
      socket?.off(SocketEvents.receiveDirectMessage, onReceiveDm);
      socket?.off(SocketEvents.receiveFailedDirectMessage, onReceiveFailedDm);
    };
  }, [id, profile, socket, userData]);

  const sendDm = useCallback(
    (data: { message: string }) => {
      if (socket && id) {
        // !!! HARD CODED
        socket.emit(SocketEvents.sendDirectMessage, {
          targetId: id,
          content: data.message,
          type: EMessageType.TEXT
        } satisfies ISendDirectMessageData);
      }
    },
    [id, socket]
  );
  // Send & receive dm --end

  useEffect(() => {
    if (id) {
      const fetch = async () => {
        try {
          dispatch(setLoading(true));
          await refetch();
        } catch {
          /* empty */
        } finally {
          dispatch(setLoading(false));
        }
      };
      fetch();
    }
  }, [dispatch, id, refetch]);

  return id ? (
    profile && userData && (
      <Box style={{ flex: 1 }}>
        <Box
          sx={{
            height: theme.dcShape.defaultHeight.header,
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(1),
            boxShadow: theme.dcShape.boxShadow.elevationLow
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                columnGap: '12px',
                paddingLeft: '8px'
              }}
              onClick={handleOpenProfileModal}
            >
              <UserAvatar
                alt={profile.id}
                src={profile.avatar}
                color={profile.bannerColor}
                showStatus
                status={profile.connectionStatus}
              />
              <Tooltip title={profile.displayName || profile.username}>
                <Box sx={{ cursor: 'pointer' }}>
                  <Typography
                    component='h1'
                    sx={{
                      color: theme.dcPalette.text.normal,
                      fontSize: '1rem',
                      lineHeight: '1.25',
                      fontWeight: 600
                    }}
                  >
                    {profile.displayName || profile.username}
                  </Typography>
                </Box>
              </Tooltip>
            </Box>
          </Box>
        </Box>
        <Grid2
          container
          height={`calc(100dvh - ${theme.dcShape.defaultHeight.header})`}
        >
          <Grid2
            size={{ xs: 12, lg: 8 }}
            height='100%'
          >
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <MessageArea
                sender={userData}
                target={profile}
                dms={dms}
                onAddDms={handleAddDms}
                dmsNumber={dmsNumber}
                onAddDmsNumber={handleAddDmsNumber}
                onAddFriend={handleAddFriend}
                onAcceptFriend={handleAcceptRequest}
                onIgnoreFriend={handleIgnoreRequest}
                onRemoveFriend={handleRemoveFriend}
                onBlockUser={handleBlockUser}
                onUnblockUser={handleUnblockUser}
              />
              <ChannelTextarea onSubmit={sendDm} />
            </Box>
          </Grid2>
          <Grid2
            size={{ xs: 0, lg: 4 }}
            sx={{ maxHeight: '100%' }}
          >
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderLeft: `1px solid ${theme.dcPalette.background.modifierAccent}`,
                backgroundColor: theme.dcPalette.background.secondaryAlt,
                overflow: 'hidden'
              }}
            >
              <Box sx={{ flex: 1, overflow: 'auto', scrollbarWidth: 'none' }}>
                <Box
                  sx={{
                    height: '120px',
                    minHeight: '120px',
                    backgroundColor: profile.bannerColor
                  }}
                />
                <Box sx={{ position: 'relative' }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '-70px',
                      left: '16px',
                      borderRadius: '50%',
                      border: `9px solid ${theme.dcPalette.primary[800]}`
                    }}
                  >
                    <UserAvatar
                      src={profile.avatar}
                      alt={profile.username}
                      color={profile.bannerColor}
                      showStatus
                      status={profile.connectionStatus}
                      size='80px'
                    />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      rowGap: '12px',
                      padding: '50px 16px 12px 16px'
                    }}
                  >
                    <Box>
                      <Typography
                        component='h2'
                        sx={{
                          color: theme.dcPalette.text.normal,
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          lineHeight: 1.2
                        }}
                      >
                        {profile.displayName}
                      </Typography>
                      <Typography
                        sx={{
                          color: theme.dcPalette.header.primary,
                          fontSize: '0.875rem',
                          fontWeight: 400,
                          lineHeight: '18px'
                        }}
                      >
                        {profile.username}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '12px',
                        padding: '12px',
                        borderRadius: '8px',
                        backgroundColor: theme.dcPalette.background.modFaint
                      }}
                    >
                      {profile.about && (
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: '8px'
                          }}
                        >
                          <ProfileSectionHeader component='h2'>
                            About Me
                          </ProfileSectionHeader>
                          <ProfileSectionText>
                            {profile.about}
                          </ProfileSectionText>
                        </Box>
                      )}
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          rowGap: '8px'
                        }}
                      >
                        <ProfileSectionHeader component='h2'>
                          Member Since
                        </ProfileSectionHeader>
                        <ProfileSectionText>
                          {dayjs(profile.createdAt).format('MMM DD, YYYY')}
                        </ProfileSectionText>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Button
                sx={{
                  height: '44px',
                  color: theme.dcPalette.interactive.normal,
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  lineHeight: '16px',
                  textTransform: 'none',
                  borderTop: `1px solid ${theme.dcPalette.border.subtle}`,
                  borderRadius: 0,

                  '&:hover': {
                    color: theme.dcPalette.interactive.hover
                  }
                }}
                onClick={handleOpenProfileModal}
              >
                View Full Profile
              </Button>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    )
  ) : (
    <Navigate
      to={protectedRoutes.myChannels}
      replace
    />
  );
};

export default DirectMessage;
