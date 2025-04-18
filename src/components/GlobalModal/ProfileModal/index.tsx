import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { Box, Button, Modal, Tooltip, Typography, Zoom } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import UserAvatar from '~/components/UserAvatar';
import { ModalKey, protectedRoutes } from '~/constants';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { hideModal } from '~/redux/slices/modalSlice';
import {
  ERelationshipStatus,
  IUserDto,
  WithConnectionStatus,
  WithRelationship
} from '~shared/types/api';

import { PrimaryActionBtn, SecondaryActionBtn } from './elments';
import { ModalState } from '../modal.types';

export interface ProfileModalExtraProps {
  profile: IUserDto & WithRelationship & Partial<WithConnectionStatus>;
  onAddFriend?: () => void;
  onAcceptFriend?: () => void;
  onIgnoreFriend?: () => void;
  onRemoveFriend?: () => void;
}

interface ProfileModalState extends ModalState {
  extraProps?: ProfileModalExtraProps;
}

const ProfileModal = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const modalState = useAppSelector((state) => state.modal)[
    ModalKey.PROFILE
  ] as ProfileModalState;

  const handleClose = useCallback(() => {
    dispatch(hideModal(ModalKey.PROFILE));
  }, [dispatch]);

  const handleDm = useCallback(() => {
    if (modalState?.extraProps?.profile) {
      const navTo = protectedRoutes.directMessages(
        'absolute',
        modalState.extraProps.profile.id
      );

      if (location.pathname !== navTo) navigate(navTo);
      dispatch(hideModal(ModalKey.PROFILE));
    }
  }, [dispatch, location.pathname, modalState?.extraProps?.profile, navigate]);

  const renderFriendAction = useCallback(() => {
    const relationshipStatus =
      modalState?.extraProps?.profile.inRelationshipWith?.status;
    // if there is incoming or outgoing friend request
    if (
      relationshipStatus &&
      [ERelationshipStatus.PENDING, ERelationshipStatus.REQUESTING].includes(
        relationshipStatus
      )
    ) {
      return (
        <Tooltip
          title='Pending'
          placement='top'
        >
          <Box>
            <Button
              disabled
              sx={{
                width: '32px',
                minWidth: 'auto',
                height: '32px',
                borderRadius: theme.dcShape.borderRadius.button,

                '&.Mui-disabled': {
                  color: theme.dcPalette.button.secondaryText,
                  backgroundColor:
                    theme.dcPalette.button.secondaryBackgroundDisabled,
                  cursor: 'not-allowed',
                  pointerEvents: 'auto',
                  opacity: 0.5
                }
              }}
            >
              <ManageAccountsIcon sx={{ width: '16px', height: '16px' }} />
            </Button>
          </Box>
        </Tooltip>
      );
    }

    // if friend or blocked
    if (
      relationshipStatus &&
      [ERelationshipStatus.FRIEND, ERelationshipStatus.BLOCKED].includes(
        relationshipStatus
      )
    )
      return <Box />;

    return (
      <Button
        onClick={() => {
          modalState.extraProps?.onAddFriend?.();
          handleClose();
        }}
        startIcon={<PersonAddAlt1Icon sx={{ width: '16px', height: '16px' }} />}
        sx={{
          height: '32px',
          color: theme.dcPalette.button.filledBrandText,
          textTransform: 'none',
          padding: '2px 16px',
          borderRadius: theme.dcShape.borderRadius.button,
          backgroundColor: theme.dcPalette.button.filledBrandBackground,

          '&:hover': {
            backgroundColor: theme.dcPalette.button.filledBrandBackgroundHover
          }
        }}
      >
        Add Friend
      </Button>
    );
  }, [
    handleClose,
    modalState?.extraProps,
    theme.dcPalette.button.filledBrandBackground,
    theme.dcPalette.button.filledBrandBackgroundHover,
    theme.dcPalette.button.filledBrandText,
    theme.dcPalette.button.secondaryBackgroundDisabled,
    theme.dcPalette.button.secondaryText,
    theme.dcShape.borderRadius.button
  ]);

  return (
    <Modal
      open={!!modalState?.show}
      onClose={handleClose}
    >
      <Zoom in={!!modalState?.show}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            translate: '-50% -50%',
            width: '600px',
            minHeight: '200px',
            borderRadius: '8px',
            backgroundColor: theme.dcPalette.primary[800],
            overflow: 'hidden'
          }}
        >
          {modalState?.extraProps?.profile && (
            <>
              <Box
                sx={{
                  height: '210px',
                  minHeight: '210px',
                  backgroundColor: modalState.extraProps.profile.bannerColor
                }}
              />
              <Box sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '-77px',
                    left: '24px',
                    borderRadius: '50%',
                    border: `9px solid ${theme.dcPalette.primary[800]}`
                  }}
                >
                  <UserAvatar
                    src={modalState.extraProps.profile.avatar}
                    alt={modalState.extraProps.profile.username}
                    color={modalState.extraProps.profile.bannerColor}
                    showStatus
                    status={modalState.extraProps.profile.connectionStatus}
                    size='120px'
                  />
                </Box>
                <Box
                  sx={{
                    height: '54px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    columnGap: '8px',
                    paddingTop: '16px',
                    paddingRight: '16px'
                  }}
                >
                  {renderFriendAction()}
                  <Button
                    startIcon={
                      <ChatBubbleIcon sx={{ width: '16px', height: '16px' }} />
                    }
                    variant='contained'
                    onClick={handleDm}
                    sx={{
                      height: '32px',
                      color: theme.dcPalette.button.secondaryText,
                      textTransform: 'none',
                      padding: '2px 16px',
                      borderRadius: theme.dcShape.borderRadius.button,
                      backgroundColor:
                        theme.dcPalette.button.secondaryBackground,

                      '&:hover': {
                        backgroundColor:
                          theme.dcPalette.button.secondaryBackgroundHover
                      }
                    }}
                  >
                    Message
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '12px',
                    height: '100%',
                    margin: '16px'
                  }}
                >
                  <Box>
                    <Typography
                      component='h1'
                      sx={{
                        color: theme.dcPalette.text.normal,
                        fontSize: '1.5rem',
                        lineHeight: 1.25,
                        fontWeight: 700
                      }}
                    >
                      {modalState.extraProps.profile.displayName ||
                        modalState.extraProps.profile.username}
                    </Typography>
                    <Typography
                      sx={{
                        color: theme.dcPalette.header.primary,
                        fontSize: '0.875rem',
                        lineHeight: '18px',
                        fontWeight: 400
                      }}
                    >
                      {modalState.extraProps.profile.username}
                    </Typography>
                  </Box>
                  {modalState.extraProps.profile.inRelationshipWith?.status ===
                    ERelationshipStatus.PENDING && (
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        backgroundColor: theme.dcPalette.background.modFaint
                      }}
                    >
                      <Typography
                        sx={{
                          color: theme.dcPalette.text.normal,
                          fontSize: '0.85rem',
                          fontWeight: 400,
                          lineHeight: 1.25
                        }}
                      >
                        <Typography
                          component='strong'
                          fontWeight={600}
                        >
                          {modalState.extraProps.profile.displayName ||
                            modalState.extraProps.profile.username}
                        </Typography>{' '}
                        sent you a friend request.
                      </Typography>
                      <Box sx={{ display: 'flex', columnGap: '8px' }}>
                        <PrimaryActionBtn
                          onClick={() => {
                            modalState.extraProps?.onAcceptFriend?.();
                            handleClose();
                          }}
                        >
                          Accept
                        </PrimaryActionBtn>
                        <SecondaryActionBtn
                          onClick={() => {
                            modalState.extraProps?.onIgnoreFriend?.();
                            handleClose();
                          }}
                        >
                          Ignore
                        </SecondaryActionBtn>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Zoom>
    </Modal>
  );
};

export default ProfileModal;
