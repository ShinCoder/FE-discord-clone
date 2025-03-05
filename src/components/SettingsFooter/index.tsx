import SettingsIcon from '@mui/icons-material/Settings';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { memo, useCallback } from 'react';

import { ModalKey } from '~/constants';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { showModal } from '~/redux/slices/modalSlice';
import { ellipsisTextWrapStyle } from '~/utils';

import UserAvatar from '../UserAvatar';

const SettingsFooter = () => {
  const theme = useTheme();

  const { data } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleOpenSetting = useCallback(() => {
    dispatch(showModal({ key: ModalKey.USER_SETTINGS }));
  }, [dispatch]);

  return data ? (
    <Box
      sx={{
        height: '52px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 8px',
        backgroundColor: theme.dcPalette.background.secondaryAlt
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', paddingRight: '8px' }}>
        <UserAvatar
          src={data.avatar}
          alt={data.username}
          color={data.bannerColor}
        />
        <Box sx={{ padding: '4px 0 4px 8px' }}>
          <Typography
            sx={{
              color: theme.dcPalette.header.primary,
              fontSize: '0.875rem',
              fontWeight: 500,
              userSelect: 'none',
              ...ellipsisTextWrapStyle
            }}
          >
            {data.displayName}
          </Typography>
          <Typography
            sx={{
              color: theme.dcPalette.header.secondary,
              fontSize: '0.75rem',
              fontWeight: 400,
              userSelect: 'none',
              ...ellipsisTextWrapStyle
            }}
          >
            {data.username}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Tooltip
          title='User Settings'
          placement='top'
        >
          <IconButton
            disableRipple
            sx={{
              width: '32px',
              height: '32px',
              color: theme.dcPalette.interactive.normal,
              borderRadius: '4px',

              ':hover': {
                color: theme.dcPalette.interactive.hover,
                backgroundColor: theme.dcPalette.background.modifierSelected,

                '> *': { animationPlayState: 'running' }
              }
            }}
            onClick={handleOpenSetting}
          >
            <SettingsIcon
              sx={{
                width: '20px',
                height: '20px',
                '@keyframes spin': {
                  to: {
                    transform: 'rotate(360deg)'
                  }
                },
                animationName: 'spin',
                animationDuration: '2s',
                animationFillMode: 'both',
                animationIterationCount: 'infinite',
                animationPlayState: 'paused'
              }}
            />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  ) : undefined;
};

export default memo(SettingsFooter);
