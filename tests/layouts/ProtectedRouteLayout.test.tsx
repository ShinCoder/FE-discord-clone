import { ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { defaultTheme } from '~/constants';
import ProtectedRouteLayout from '~/layouts/ProtectedRouteLayout';
import ReduxProvider from '~/redux/ReduxProvider';
import { setToken } from '~/redux/slices/authSlice';
import { store } from '~/redux/store';

describe('ProtectedRouteLayout', () => {
  test('Should redirect if user is not authenticated', () => {
    const history = createMemoryHistory({ initialEntries: ['/app'] });

    render(
      <ReduxProvider>
        <Router
          location={history.location}
          navigator={history}
        >
          <ProtectedRouteLayout />
        </Router>
      </ReduxProvider>
    );

    expect(history.location.pathname).toBe('/login');
  });

  test('Should not redirect if user is authenticated', () => {
    const history = createMemoryHistory({ initialEntries: ['/app'] });
    store.dispatch(
      setToken({ accessToken: 'Mock_token', refreshToken: 'Mock_token' })
    );

    render(
      <ReduxProvider>
        <ThemeProvider theme={defaultTheme}>
          <Router
            location={history.location}
            navigator={history}
          >
            <ProtectedRouteLayout />
          </Router>
        </ThemeProvider>
      </ReduxProvider>
    );

    expect(history.location.pathname).toBe('/app');
  });
});
