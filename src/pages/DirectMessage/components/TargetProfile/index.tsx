import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { memo, useCallback } from 'react';

import UserAvatar from '~/components/UserAvatar';
import VerticalSeperator from '~/components/VerticalSeperator';
import {
  ERelationshipStatus,
  IUserDto,
  WithRelationship
} from '~shared/types/api';

import { PrimaryActionBtn, SecondaryActionBtn } from './elments';

interface TargetProfileProps {
  data: IUserDto & WithRelationship;
  onAddFriend: () => void;
  onAcceptFriend: () => void;
  onIgnoreFriend: () => void;
  onRemoveFriend: () => void;
  onBlockUser: () => void;
  onUnblockUser: () => void;
}

const TargetProfile = (props: TargetProfileProps) => {
  const {
    data,
    onAddFriend,
    onAcceptFriend,
    onIgnoreFriend,
    onRemoveFriend,
    onBlockUser,
    onUnblockUser
  } = props;
  const theme = useTheme();

  const renderFriendAction = useCallback(() => {
    // if have incoming friend request
    if (data.inRelationshipWith?.status === ERelationshipStatus.PENDING) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '8px' }}>
          <Typography
            sx={{
              color: theme.dcPalette.header.secondary,
              fontSize: '0.875rem',
              fontWeight: 400,
              lineHeight: 1.25
            }}
          >
            Sent you a friend request:
          </Typography>
          <PrimaryActionBtn onClick={onAcceptFriend}>Accept</PrimaryActionBtn>
          <SecondaryActionBtn onClick={onIgnoreFriend}>
            Ignore
          </SecondaryActionBtn>
        </Box>
      );
    }

    // if have outgoing friend request
    if (data.inRelationshipWith?.status === ERelationshipStatus.REQUESTING) {
      return <PrimaryActionBtn disabled>Friend Request Sent</PrimaryActionBtn>;
    }

    // if friend
    if (data.inRelationshipWith?.status === ERelationshipStatus.FRIEND) {
      return (
        <SecondaryActionBtn onClick={onRemoveFriend}>
          Remove Friend
        </SecondaryActionBtn>
      );
    }

    // if blocked
    if (data.inRelationshipWith?.status === ERelationshipStatus.BLOCKED) {
      return <Box />;
    }

    return (
      <PrimaryActionBtn onClick={onAddFriend}>Add Friend</PrimaryActionBtn>
    );
  }, [
    data.inRelationshipWith?.status,
    onAcceptFriend,
    onAddFriend,
    onIgnoreFriend,
    onRemoveFriend,
    theme.dcPalette.header.secondary
  ]);

  const renderBlockAction = useCallback(() => {
    if (data.inRelationshipWith?.status === ERelationshipStatus.BLOCKED) {
      return (
        <SecondaryActionBtn onClick={onUnblockUser}>Unblock</SecondaryActionBtn>
      );
    } else {
      return (
        <SecondaryActionBtn onClick={onBlockUser}>Block</SecondaryActionBtn>
      );
    }
  }, [data.inRelationshipWith?.status, onBlockUser, onUnblockUser]);

  return (
    <Box sx={{ padding: '16px' }}>
      <UserAvatar
        src={data.avatar}
        alt={data.username}
        color={data.bannerColor}
        showStatus={false}
        size='80px'
      />
      <Typography
        component='h3'
        sx={{
          color: theme.dcPalette.text.normal,
          fontSize: '2rem',
          fontWeight: 700,
          lineHeight: 1.25,
          margin: '8px 0'
        }}
      >
        {data.displayName || data.username}
      </Typography>
      <Typography
        component='h3'
        sx={{
          color: theme.dcPalette.text.normal,
          fontSize: '1.5rem',
          fontWeight: 500,
          lineHeight: 1.25,
          marginBottom: '20px'
        }}
      >
        {data.username}
      </Typography>
      <Typography
        sx={{
          color: theme.dcPalette.header.secondary,
          fontSize: '1rem',
          fontWeight: 400,
          lineHeight: 1.25
        }}
      >
        This is the beginning of your direct message history with{' '}
        <Typography
          component='strong'
          sx={{ fontWeight: 600 }}
        >
          {data.displayName || data.username}
        </Typography>
        .
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
        <Typography
          sx={{
            color: theme.dcPalette.header.secondary,
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1.25
          }}
        >
          No servers in common
        </Typography>
        <Box
          sx={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            margin: '0 16px',
            backgroundColor: theme.dcPalette.background.accent
          }}
        />
        {renderFriendAction()}
        <VerticalSeperator radius='4px' />
        {renderBlockAction()}
      </Box>
    </Box>
  );
};

export default memo(TargetProfile);
