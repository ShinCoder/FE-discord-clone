import { joiResolver } from '@hookform/resolvers/joi';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import joi from 'joi';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import ControlledInputText from '~/components/ControlledInputText';
import { publicRoutes } from '~/constants';
import CustomButton from '~/elements/CustomButton';
import { useAppDispatch } from '~/redux/hooks';
import { setToken } from '~/redux/slices/authSlice';
import { setErrorMessage, setLoading } from '~/redux/slices/statusSlice';
import { login } from '~/services';
import { CustomErrorCode } from '~shared/constants';
import { ILoginData } from '~shared/types/api';
import { ICustomErrorData } from '~shared/types/common';

import { ForgotPasswordLink } from './elements';

interface LoginFormData {
  username: string;
  password: string;
}

const MainLoginForm = () => {
  const formSchema = useMemo(
    () =>
      joi.object({
        username: joi.string().messages({ 'string.empty': 'Required' }),
        password: joi.string().messages({ 'string.empty': 'Required' })
      }),
    []
  );

  const { handleSubmit, control, setError } = useForm<LoginFormData>({
    resolver: joiResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const theme = useTheme();

  const dispatch = useAppDispatch();

  const mutation = useMutation({
    mutationFn: (data: ILoginData) => login(data),
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSuccess: async (data) => {
      dispatch(setToken(data.data));
    },
    onError: (error) => {
      if (isAxiosError<ICustomErrorData>(error)) {
        if (
          error.response?.data.customCode ===
          CustomErrorCode.LOGIN__ACCOUNT_NOT_VERIFIED
        ) {
          setError('username', {
            message: 'Please verify your email first.'
          });
        } else if (error.response?.data.statusCode === 403) {
          setError('username', { message: 'Login or password is invalid.' });
          setError('password', { message: 'Login or password is invalid.' });
        } else {
          dispatch(
            setErrorMessage('Something went wrong, please try again later')
          );
        }
      }

      mutation.reset();
    },
    onSettled: () => {
      dispatch(setLoading(false));
    }
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleLogin = useCallback(
    handleSubmit((data) =>
      mutation.mutate({ email: data.username, password: data.password })
    ),
    []
  );

  return (
    <Box
      component='form'
      onSubmit={handleLogin}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(2.5)
      }}
    >
      <ControlledInputText
        control={control}
        name='username'
        label='Email or phone number'
        isRequired
      />
      <ControlledInputText
        control={control}
        name='password'
        label='Password'
        isPassword
        isRequired
        sx={{ marginTop: theme.spacing(2.5) }}
      />
      <ForgotPasswordLink to={publicRoutes.forgotPassword}>
        Forgot your password?
      </ForgotPasswordLink>
      <CustomButton
        type='submit'
        variant='contained'
      >
        Log In
      </CustomButton>
    </Box>
  );
};

export default MainLoginForm;
