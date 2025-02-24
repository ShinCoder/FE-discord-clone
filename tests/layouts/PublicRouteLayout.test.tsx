import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import PublicRouteLayout from '~/layouts/PublicRouteLayout';
import ReduxProvider from '~/redux/ReduxProvider';
import { setToken } from '~/redux/slices/authSlice';
import { store } from '~/redux/store';

describe('PublicRouteLayout', () => {
  test('Should not redirect if user is not authenticated', () => {
    const history = createMemoryHistory({ initialEntries: ['/login'] });

    render(
      <ReduxProvider>
        <Router
          location={history.location}
          navigator={history}
        >
          <PublicRouteLayout />
        </Router>
      </ReduxProvider>
    );

    expect(history.location.pathname).toBe('/login');
  });

  test('Should redirect if user is authenticated', () => {
    const history = createMemoryHistory({ initialEntries: ['/login'] });
    store.dispatch(
      setToken({ accessToken: 'Mock_token', refreshToken: 'Mock_token' })
    );

    render(
      <ReduxProvider>
        <Router
          location={history.location}
          navigator={history}
        >
          <PublicRouteLayout />
        </Router>
      </ReduxProvider>
    );

    expect(history.location.pathname).toBe('/app');
  });
});
