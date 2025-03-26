import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { memo, ReactNode } from 'react';

interface NavItemProps {
  label: string;
  active?: boolean;
  onClick: () => void;
  endAdornment?: ReactNode;
}

const NavItem = (props: NavItemProps) => {
  const { label, active = false, onClick, endAdornment } = props;
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
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
      }}
      onClick={onClick}
    >
      <Typography sx={{ font: 'inherit' }}>{label}</Typography>
      {endAdornment}
    </Box>
  );
};

export default memo(NavItem);
