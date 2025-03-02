import { useCallback, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

import GlobalModal from '~/components/GlobalModal';
import { publicRoutes } from '~/constants';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { setPinnedDms } from '~/redux/slices/authSlice';
import { setSocket } from '~/redux/slices/socketSlice';
import { SocketEvents } from '~shared/constants';
import { IReceiveDmPinData } from '~shared/types/socket/userSettings-socket.types';

const ProtectedRouteLayout = () => {
  const authState = useAppSelector((state) => state.auth);
  const { socket: socketState } = useAppSelector((state) => state.socket);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let socket: Socket;

    if (authState.token) {
      socket = io(`${import.meta.env.VITE_SOCKET_URL}/chat`, {
        auth: {
          token: authState.token.accessToken
        }
      });
      dispatch(setSocket(socket));
    }

    return () => {
      socket?.disconnect();
      dispatch(setSocket(undefined));
    };
  }, [authState.token, dispatch]);

  const onReceiveDmPin = useCallback(
    (_data: IReceiveDmPinData) => {
      if (
        authState.data &&
        authState.data.settings.dmSettings.pinnedDms.findIndex(
          (e) => e.id === _data.newPin.id
        ) === -1
      ) {
        dispatch(
          setPinnedDms([
            _data.newPin,
            ...authState.data.settings.dmSettings.pinnedDms
          ])
        );
      }
    },
    [authState.data, dispatch]
  );

  useEffect(() => {
    if (socketState) {
      socketState.on(SocketEvents.receiveDmPin, onReceiveDmPin);
    }

    return () => {
      socketState?.off(SocketEvents.receiveDmPin, onReceiveDmPin);
    };
  }, [onReceiveDmPin, socketState]);

  return authState.token ? (
    <>
      <GlobalModal />
      <Outlet />
    </>
  ) : (
    <Navigate to={publicRoutes.login} />
  );
};

export default ProtectedRouteLayout;
