import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';

import InputLabel from '~/components/InputLabel';
import { defaultTheme } from '~/constants';

describe('InputLabel', () => {
  const mockLabel = 'Mock_label';

  test('should display correct label', () => {
    render(<InputLabel label={mockLabel} />);

    const label = screen.queryByText(mockLabel);
    expect(label).toBeInTheDocument();

    const indicator = screen.queryByText('*');
    expect(indicator).not.toBeInTheDocument();
  });

  test('should display required indicator', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <InputLabel
          label={mockLabel}
          isRequired
        />
      </ThemeProvider>
    );

    const indicator = screen.queryByText('*');
    expect(indicator).toBeInTheDocument();
  });

  test('should display error', () => {
    const mockError = 'Mock_error';

    render(
      <ThemeProvider theme={defaultTheme}>
        <InputLabel
          label={mockLabel}
          error={mockError}
        />
      </ThemeProvider>
    );

    const error = screen.queryByText(mockError);
    expect(error).toBeInTheDocument();
  });
});
