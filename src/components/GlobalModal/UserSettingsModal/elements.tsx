import { Box, Button, Tab, Typography } from '@mui/material';
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

export const NavSeparator = styled(Box)(({ theme }) => ({
  height: '1px',
  margin: '8px 10px',
  backgroundColor: theme.dcPalette.background.modifierAccent
}));

export const ContentPrimaryHeader = styled(Typography)(({ theme }) => ({
  color: theme.dcPalette.header.primary,
  fontSize: '1.5rem',
  fontWeight: 600,
  lineHeight: 1.25,
  userSelect: 'none'
})) as typeof Typography;

export const ContentSecondaryHeader = styled(Typography)(({ theme }) => ({
  color: theme.dcPalette.header.primary,
  fontSize: '1.25rem',
  fontWeight: 600,
  lineHeight: '24px',
  userSelect: 'none'
})) as typeof Typography;

export const ContentTabLabel = styled(Tab)(({ theme }) => ({
  minWidth: 'auto',
  minHeight: 'auto',
  color: theme.dcPalette.interactive.normal,
  fontSize: '1rem',
  fontWeight: 500,
  lineHeight: '20px',
  textTransform: 'none',
  padding: '0 0 12px 0',
  userSelect: 'none',

  '&.Mui-selected': {
    color: theme.dcPalette.interactive.active
  }
}));

export const ContentPrimaryButton = styled(Button)(({ theme }) => ({
  minWidth: '60px',
  height: '32px',
  minHeight: '32px',
  color: theme.dcPalette.button.filledBrandText,
  fontSize: '0.875rem',
  fontWeight: 500,
  lineHeight: '16px',
  textTransform: 'capitalize',
  padding: '2px 16px',
  borderRadius: '3px',
  backgroundColor: theme.dcPalette.button.filledBrandBackground,
  transition: 'all 0.5s ease',

  '&:active': {
    backgroundColor: theme.dcPalette.button.filledBrandBackgroundActive
  },

  '&:hover': {
    backgroundColor: theme.dcPalette.button.filledBrandBackgroundHover
  }
}));

export const ContentSecondaryButton = styled(ContentPrimaryButton)(
  ({ theme }) => ({
    color: theme.dcPalette.button.secondaryText,
    backgroundColor: theme.dcPalette.button.secondaryBackground,

    '&:active': {
      backgroundColor: theme.dcPalette.button.secondaryBackgroundActive
    },

    '&:hover': {
      backgroundColor: theme.dcPalette.button.secondaryBackgroundHover
    }
  })
);

export const ContentDangerButton = styled(ContentPrimaryButton)(
  ({ theme }) => ({
    color: theme.dcPalette.button.secondaryText,
    backgroundColor: theme.dcPalette.button.dangerBackground,

    '&:active': {
      backgroundColor: theme.dcPalette.button.dangerBackgroundActive
    },

    '&:hover': {
      backgroundColor: theme.dcPalette.button.dangerBackgroundHover
    }
  })
);

export const ContentOutlinedDangerButton = styled(ContentPrimaryButton)(
  ({ theme }) => ({
    color: theme.dcPalette.button.secondaryText,
    border: `1px solid ${theme.dcPalette.button.outlineDangerBorder}`,
    backgroundColor: 'transparent',

    '&:active': {
      borderColor: theme.dcPalette.button.dangerBackgroundActive,
      backgroundColor: theme.dcPalette.button.dangerBackgroundActive
    },

    '&:hover': {
      borderColor: theme.dcPalette.button.dangerBackground,
      backgroundColor: theme.dcPalette.button.dangerBackground
    }
  })
);

export const ContentSectionHeader = styled(Typography)(({ theme }) => ({
  color: theme.dcPalette.header.secondary,
  fontSize: '0.75rem',
  fontWeight: 700,
  lineHeight: 1.3,
  textTransform: 'uppercase',
  userSelect: 'none'
})) as typeof Typography;

export const ContentCommonText = styled(Typography)(({ theme }) => ({
  color: theme.dcPalette.header.secondary,
  fontSize: '0.875rem',
  fontWeight: 400,
  lineHeight: '20px',
  userSelect: 'none'
})) as typeof Typography;
