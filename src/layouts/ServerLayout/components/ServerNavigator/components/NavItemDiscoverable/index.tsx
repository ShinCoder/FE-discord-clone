import ExploreIcon from '@mui/icons-material/Explore';
import { Box, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useCallback } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';

import { protectedRoutes } from '~/constants';

import { NavItemAvatar } from '../../elements';

const NavItemDiscoverable = () => {
  const match = useMatch(protectedRoutes.discoverServers);
  const navigate = useNavigate();
  const theme = useTheme();

  const active = match?.pathname === protectedRoutes.discoverServers;

  const handleClick = useCallback(() => {
    if (!active) navigate(protectedRoutes.discoverServers);
  }, [active, navigate]);

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: (theme) => theme.spacing(1)
      }}
    >
      <Tooltip
        title='Explore Discoverable Servers'
        placement='right'
      >
        <NavItemAvatar
          active={active}
          onClick={handleClick}
          color={theme.dcPalette.green[360]}
          selectedBackgroundColor={theme.dcPalette.green[360]}
        >
          <ExploreIcon />
        </NavItemAvatar>
      </Tooltip>
      <Box
        sx={{
          width: '8px',
          height: '48px',
          position: 'absolute',
          left: 0,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Box
          className='nav-item-pill'
          component='span'
          sx={{
            width: '8px',
            height: '40px',
            borderRadius: '0 4px 4px 0',
            marginLeft: (theme) => `-${theme.spacing(0.5)}`,
            backgroundColor: (theme) => theme.dcPalette.header.primary,
            transition: 'all 0.3s ease-out',
            transformOrigin: 'center center',
            scale: 0
          }}
        />
      </Box>
    </Box>
  );
};

export default NavItemDiscoverable;
