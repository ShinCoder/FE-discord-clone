import BlockIcon from '@mui/icons-material/Block';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { memo, useCallback, MouseEvent } from 'react';

import UserAvatar from '~/components/UserAvatar';
import {
  ERelationshipStatus,
  IUserDto,
  WithConnectionStatus,
  WithRelationship
} from '~shared/types/api';

interface DMListItemProps {
  data: IUserDto & WithRelationship & WithConnectionStatus;
  onClick: () => void;
  onDelete: () => void;
}

const DMListItem = (props: DMListItemProps) => {
  const { data, onClick, onDelete } = props;
  const theme = useTheme();

  const handleDelete = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onDelete();
    },
    [onDelete]
  );

  return (
    <Box
      sx={{
        height: '42px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: theme.dcPalette.channel.default,
        padding: '0 8px',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'all 0.3s',

        '&:hover': {
          color: theme.dcPalette.interactive.hover,
          backgroundColor: theme.dcPalette.background.modifierHover,
          opacity: 1,

          '.action-delete': {
            visibility: 'visible'
          },

          '.blocked': {
            display: 'none'
          },

          '>  *': {
            opacity: 1
          }
        }
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          columnGap: '12px',
          color: 'inherit',
          opacity:
            data.inRelationshipWith?.status === ERelationshipStatus.BLOCKED
              ? 0.3
              : 1
        }}
      >
        <UserAvatar
          src={data.avatar}
          alt={data.username}
          color={data.bannerColor}
          showStatus
          status={data.connectionStatus}
        />
        <Typography
          sx={{
            color: 'inherit',
            fontSize: '1rem',
            fontWeight: 500,
            lineHeight: '20px',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden'
          }}
        >
          {data.displayName || data.username}
        </Typography>
      </Box>
      <IconButton
        sx={{ width: '16px', height: '16px', visibility: 'hidden' }}
        disableRipple
        className='action-delete'
        onClick={handleDelete}
      >
        <CloseIcon
          sx={{
            width: '16px',
            height: '16px',
            color: theme.dcPalette.interactive.hover
          }}
        />
      </IconButton>
      {data.inRelationshipWith?.status === ERelationshipStatus.BLOCKED && (
        <BlockIcon
          className='blocked'
          sx={{
            width: 16,
            height: 16,
            color: theme.dcPalette.interactive.hover
          }}
        />
      )}
    </Box>
  );
};

export default memo(DMListItem);
