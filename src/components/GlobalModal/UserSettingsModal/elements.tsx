import { Box, BoxProps, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const NavHeader = styled(Typography)(({ theme }) => ({
  color: theme.dcPalette.channel.default,
  fontSize: '0.75rem',
  fontWeight: 700,
  lineHeight: 1.3,
  textTransform: 'uppercase',
  padding: '6px 10px',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  userSelect: 'none'
}));

export const NavItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active'
})<BoxProps & { active?: boolean }>(({ theme, active = false }) => ({
  color: theme.dcPalette.interactive.normal,
  fontSize: '1rem',
  fontWeight: 500,
  lineHeight: '20px',
  padding: '6px 10px',
  borderRadius: '4px',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  userSelect: 'none',

  ...(active && {
    color: theme.dcPalette.interactive.active,
    backgroundColor: theme.dcPalette.background.modifierSelected,
    cursor: 'default'
  }),

  ...(!active && {
    '&:hover': {
      color: theme.dcPalette.interactive.hover,
      backgroundColor: theme.dcPalette.background.modifierHover
    }
  })
}));

export const NavSeparator = styled(Box)(({ theme }) => ({
  height: '1px',
  margin: '8px 10px',
  backgroundColor: theme.dcPalette.background.modifierAccent
}));
