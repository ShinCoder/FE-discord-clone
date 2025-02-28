import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import AppRouter from './AppRouter';
import CustomToaster from './components/CustomToaster';
import GlobalLoadingState from './components/GlobalLoadingState';
import { defaultTheme } from './constants';

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: (failureCount, error: any) => {
              if (
                error?.data?.message === 'Unauthorized' &&
                error?.data.statusCode === 401
              )
                return false;
              return failureCount > 2 ? false : true;
            }
          }
        }
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <GlobalLoadingState />
        <CustomToaster />
        <AppRouter />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
