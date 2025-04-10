import { Box, Tooltip } from '@mui/material';
import { useCallback } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';

import { NavItemAvatar } from '../../elements';

type NavItemProps = {
  href: string;
  tooltip: string;
  type?: 'icon' | 'no-icon';
  icon?: string;
  shortenName?: string;
};

const NavItem = (props: NavItemProps) => {
  const { href, tooltip, type = 'icon', icon, shortenName } = props;
  const match = useMatch(props.href);
  const navigate = useNavigate();

  const active = match?.pathname === props.href;

  const handleClick = useCallback(() => {
    if (!active) navigate(href);
  }, [active, href, navigate]);

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
        title={tooltip}
        placement='right'
      >
        {type === 'icon' ? (
          <NavItemAvatar
            alt={shortenName}
            src={icon}
            active={active}
            onClick={handleClick}
          />
        ) : (
          <NavItemAvatar
            active={active}
            onClick={handleClick}
            alt={shortenName}
          >
            {shortenName}
          </NavItemAvatar>
        )}
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

export default NavItem;
