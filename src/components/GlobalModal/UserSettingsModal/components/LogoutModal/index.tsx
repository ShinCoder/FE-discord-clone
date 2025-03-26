import { Box, Button, Modal, Typography, Zoom } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMutation } from '@tanstack/react-query';
import { memo, useCallback } from 'react';

import { useAppDispatch } from '~/redux/hooks';
import { clearAuthState } from '~/redux/slices/authSlice';
import { setLoading } from '~/redux/slices/statusSlice';
import { logout } from '~/services';

interface LogoutModalProps {
  open: boolean;
  onClose: () => void;
}

const LogoutModal = (props: LogoutModalProps) => {
  const { open, onClose } = props;
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSettled: () => {
      dispatch(setLoading(false));
    },
    onSuccess: () => {
      dispatch(clearAuthState());
      onClose();
    }
  });

  const handleLogout = useCallback(() => {
    logoutMutation.mutate();
  }, [logoutMutation]);

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Zoom in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            translate: '-50% -50%',
            width: '440px',
            maxHeight: '720px',
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '4px',
            backgroundColor: theme.dcPalette.primary[600],
            overflow: 'hidden'
          }}
        >
          <Typography
            component='h2'
            sx={{
              color: theme.dcPalette.text.normal,
              fontSize: '1.25rem',
              fontWeight: 600,
              lineHeight: 1.2,
              padding: '16px'
            }}
          >
            Log Out
          </Typography>
          <Typography
            sx={{
              flex: '1 1 auto',
              color: theme.dcPalette.text.normal,
              fontSize: '1rem',
              fontWeight: 400,
              lineHeight: 1.25,
              padding: '0 16px 20px 16px'
            }}
          >
            Are you sure you want to logout?
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '16px',
              backgroundColor: theme.dcPalette.primary[630]
            }}
          >
            <Button
              variant='text'
              disableRipple
              sx={{
                height: '38px',
                color: theme.dcPalette.text.normal,
                fontSize: '0.875rem',
                fontWeight: 500,
                lineHeight: '16px',
                textTransform: 'none',
                padding: '2px 16px',

                '&:hover': {
                  textDecoration: 'underline',
                  backgroundColor: 'transparent'
                }
              }}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              sx={{
                height: '38px',
                color: theme.dcPalette.white.base,
                fontSize: '0.875rem',
                fontWeight: 500,
                lineHeight: '16px',
                textTransform: 'none',
                padding: '2px 16px',
                backgroundColor: theme.dcPalette.button.dangerBackground,

                '&:active': {
                  backgroundColor: theme.dcPalette.button.dangerBackgroundActive
                },

                '&:hover': {
                  backgroundColor: theme.dcPalette.button.dangerBackgroundHover
                }
              }}
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </Box>
        </Box>
      </Zoom>
    </Modal>
  );
};

export default memo(LogoutModal);
