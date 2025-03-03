import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ProfileSectionHeader = styled(Typography)(({ theme }) => ({
  color: theme.dcPalette.header.primary,
  fontSize: '0.75rem',
  fontWeight: 600,
  lineHeight: 1.3
}));

export const ProfileSectionText = styled(Typography)(({ theme }) => ({
  color: theme.dcPalette.text.normal,
  fontSize: '0.875rem',
  fontWeight: 400,
  lineHeight: 1.2
}));
