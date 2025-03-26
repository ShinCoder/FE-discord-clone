import { Box } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { protectedRoutes } from '~/constants';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { setPinnedDms } from '~/redux/slices/authSlice';
import { setLoading } from '~/redux/slices/statusSlice';
import { unpinDm } from '~/services';

import DMListItem from './components/DMListItem';

const DMNav = () => {
  const { data: userData } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleItemClick = useCallback(
    (_id: string) => () => {
      const navTo = protectedRoutes.directMessages('absolute', _id);

      if (location.pathname !== navTo) navigate(navTo);
    },
    [location.pathname, navigate]
  );

  const unpinDmMutation = useMutation({
    mutationFn: unpinDm,
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSettled: () => {
      dispatch(setLoading(false));
    },
    onSuccess: (_, _variable) => {
      if (userData) {
        dispatch(
          setPinnedDms(
            userData.settings.dmSettings.pinnedDms.filter(
              (e) => e.id !== _variable.targetId
            )
          )
        );
      }
    }
  });

  const handleItemDelete = useCallback(
    (_id: string) => () => {
      if (userData) {
        unpinDmMutation.mutate({ accountId: userData.id, targetId: _id });
      }
    },
    [unpinDmMutation, userData]
  );

  return userData ? (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '1px' }}>
      {userData.settings.dmSettings.pinnedDms.map((_pin) => (
        <DMListItem
          key={_pin.id}
          data={_pin}
          onClick={handleItemClick(_pin.id)}
          onDelete={handleItemDelete(_pin.id)}
        />
      ))}
    </Box>
  ) : (
    <Box />
  );
};

export default DMNav;
