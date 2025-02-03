import { protectedRoutes } from 'constants';

import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from 'redux/hooks';

const PublicRouteLayout = () => {
  const authState = useAppSelector((state) => state.auth);

  return !authState.token ? <Outlet /> : <Navigate to={protectedRoutes.app} />;
};

export default PublicRouteLayout;
