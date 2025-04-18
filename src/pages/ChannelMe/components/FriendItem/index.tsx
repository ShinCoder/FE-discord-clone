import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { memo, useCallback, MouseEvent } from 'react';

import { ProfileModalExtraProps } from '~/components/GlobalModal/ProfileModal';
import UserAvatar from '~/components/UserAvatar';
import { ModalKey } from '~/constants';
import { useAppDispatch } from '~/redux/hooks';
import { showModal } from '~/redux/slices/modalSlice';
import {
  IUserDto,
  IUserWithSettingsDto,
  WithConnectionStatus,
  WithRelationship
} from '~shared/types/api';

import MoreButton from './components/MoreButton';

interface FriendItemProps {
  userData: IUserWithSettingsDto;
  data: IUserDto & WithRelationship & WithConnectionStatus;
  onDM: () => void;
  onRemove: () => void;
}

const FriendItems = (props: FriendItemProps) => {
  const { userData, data, onDM, onRemove } = props;
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const handleDm = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onDM();
    },
    [onDM]
  );

  const handleClick = useCallback(() => {
    dispatch(
      showModal({
        key: ModalKey.PROFILE,
        extraProps: { profile: data }
      } satisfies { key: string; extraProps: ProfileModalExtraProps })
    );
  }, [data, dispatch]);

  return (
    <Box
      onClick={handleClick}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '62px',
        borderTop: `1px solid ${theme.dcPalette.background.modifierAccent}`,
        borderBottom: '1px solid transparent',
        margin: '0 20px 0 30px',
        cursor: 'pointer',

        '&:hover': {
          padding: '16px 10px',
          borderColor: 'transparent',
          borderRadius: '8px',
          margin: '0 10px 0 20px',
          backgroundColor: theme.dcPalette.background.modifierHover,

          '& .hidden-username': {
            visibility: 'visible'
          },

          '& .action-button': {
            backgroundColor: theme.dcPalette.background.tertiary
          }
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '12px' }}>
        <UserAvatar
          src={data.avatar}
          alt={data.username}
          color={data.bannerColor}
          showStatus
          status={data.connectionStatus}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              component='span'
              sx={{
                fontSize: '1rem',
                fontWeight: 600,
                color: theme.dcPalette.header.primary
              }}
            >
              {data.displayName || data.username}
            </Typography>
            <Typography
              component='span'
              sx={{
                fontSize: '0/875rem',
                color: theme.dcPalette.header.secondary,
                marginLeft: '5px',
                visibility: 'hidden'
              }}
              className='hidden-username'
            >
              {data.username}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: '0.75rem',
              color: theme.dcPalette.header.secondary,
              textTransform: 'capitalize'
            }}
          >
            {data.connectionStatus?.toLowerCase() || 'Offline'}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', columnGap: '10px' }}>
        <Tooltip
          title='Message'
          placement='top'
        >
          <IconButton
            sx={{
              width: '36px',
              height: '36px',
              color: theme.dcPalette.interactive.normal,
              backgroundColor: theme.dcPalette.background.secondary,

              '&:hover': {
                color: theme.dcPalette.interactive.hover,
                backgroundColor: theme.dcPalette.background.secondary
              }
            }}
            className='action-button'
            onClick={handleDm}
          >
            <ChatBubbleIcon sx={{ width: '20px', height: '20px' }} />
          </IconButton>
        </Tooltip>
        <MoreButton
          userData={userData}
          data={data}
          onRemove={onRemove}
        />
      </Box>
    </Box>
  );
};

export default memo(FriendItems);
