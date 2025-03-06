import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { memo, useCallback, useMemo, useState } from 'react';

import { ellipsisTextWrapStyle } from '~/utils';

interface PhoneNumberDisplayProps {
  phoneNumber: string;
}

const PhoneNumberDisplay = (props: PhoneNumberDisplayProps) => {
  const { phoneNumber } = props;
  const theme = useTheme();

  const [show, setShow] = useState<boolean>(false);
  const handleSwitchShow = useCallback(() => {
    setShow((pre) => !pre);
  }, []);

  const displayValue = useMemo(() => {
    if (show) return phoneNumber;

    let value = '';

    for (let i = 0; i < phoneNumber.length - 4; i++) {
      value += '*';
    }
    value += phoneNumber.slice(-4);

    return value;
  }, [phoneNumber, show]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        color: theme.dcPalette.header.primary,
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.25
      }}
    >
      <Typography
        sx={{
          font: 'inherit',
          ...ellipsisTextWrapStyle
        }}
      >
        {displayValue}
      </Typography>
      <Typography
        sx={{
          color: theme.dcPalette.text.link,
          fontSize: '0.875rem',
          fontWeight: 500,
          lineHeight: '16px',
          padding: '0 4px',
          cursor: 'pointer',
          userSelect: 'none',

          '&:hover': {
            textDecoration: 'underline'
          }
        }}
        onClick={handleSwitchShow}
      >
        {show ? 'Hide' : 'Reveal'}
      </Typography>
    </Box>
  );
};

export default memo(PhoneNumberDisplay);
