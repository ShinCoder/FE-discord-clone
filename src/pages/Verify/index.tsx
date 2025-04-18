import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import PulsingEllipsis from '~/components/PulsingEllipsis';
import { protectedRoutes, publicRoutes } from '~/constants';
import CustomButton from '~/elements/CustomButton';
import { useAppDispatch } from '~/redux/hooks';
import { clearAuthState } from '~/redux/slices/authSlice';
import { verify } from '~/services';

import emailCheckedImg from './assets/email_checked.svg';
import emailErrorImg from './assets/email_error.svg';
import emailInfoImg from './assets/email_info.svg';

const Verify = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  const [state, setState] = useState<'pending' | 'success' | 'error'>(
    'pending'
  );

  const verifyMutation = useMutation({
    mutationFn: (token: string) => verify({ verifyToken: token }),
    onSuccess: () => {
      setState('success');
      dispatch(clearAuthState());
    },
    onError: () => {
      setState('error');
      dispatch(clearAuthState());
    }
  });

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) verifyMutation.mutate(token);
    else setState('error');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <Box
      sx={{
        width: '480px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(4),
        borderRadius: theme.dcShape.borderRadius.panel,
        backgroundColor: 'background.default'
      }}
    >
      <img
        src={
          state === 'success'
            ? emailCheckedImg
            : state === 'error'
              ? emailErrorImg
              : emailInfoImg
        }
        alt='status_image'
        width={0}
        height={0}
        style={{
          width: '100%',
          maxWidth: '186px',
          height: '100px',
          marginBottom: theme.spacing(2.5)
        }}
      />
      <Typography
        variant='h1'
        color='text.primary'
        textAlign='center'
        sx={
          state === 'success'
            ? {
                marginBottom: theme.spacing(5)
              }
            : {}
        }
      >
        {state === 'success'
          ? 'Email Verified!'
          : state === 'error'
            ? 'Email verification link has expired.'
            : 'Verifing your email'}
      </Typography>
      {state !== 'success' && (
        <Typography
          variant='subtitle1'
          color='text.secondary'
          sx={{ marginBottom: theme.spacing(5) }}
        >
          {state === 'error'
            ? 'Please log in and resend the link.'
            : 'This may take a moment.'}
        </Typography>
      )}
      {state === 'success' ? (
        <CustomButton
          variant='contained'
          sx={{ width: '100%' }}
          onClick={() => {
            navigate(protectedRoutes.app);
          }}
        >
          Continue to SChat
        </CustomButton>
      ) : state === 'error' ? (
        <CustomButton
          variant='contained'
          sx={{ width: '100%' }}
          onClick={() => {
            navigate(publicRoutes.login);
          }}
        >
          Log In
        </CustomButton>
      ) : (
        <CustomButton
          variant='white'
          sx={{
            width: '100%',
            backgroundColor: theme.dcPalette.button.secondaryBackground,
            pointerEvents: 'none'
          }}
        >
          <PulsingEllipsis />
        </CustomButton>
      )}
    </Box>
  );
};

export default Verify;
