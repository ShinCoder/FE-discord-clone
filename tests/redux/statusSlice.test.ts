import statusReducer, {
  setErrorMessage,
  setLoading,
  StatusSlice
} from '~/redux/slices/statusSlice';

describe('Redux-statusSlice', () => {
  const mockMessage = 'Mock_message';

  test('should return the initial state', () => {
    expect(statusReducer(undefined, { type: 'unkncwn' })).toEqual({
      isLoading: false
    });
  });

  test('should update isLoading value on setLoading', () => {
    const previousState: StatusSlice = {
      isLoading: false
    };

    expect(statusReducer(previousState, setLoading(true))).toEqual({
      isLoading: true
    });
  });

  test('should update error value on setErrorMessage(string)', () => {
    const previousState: StatusSlice = {
      isLoading: false
    };

    expect(statusReducer(previousState, setErrorMessage(mockMessage))).toEqual({
      isLoading: false,
      error: mockMessage
    });
  });

  test('should clear error value on setErrorMessage(null)', () => {
    const previousState: StatusSlice = {
      isLoading: false,
      error: mockMessage
    };

    expect(statusReducer(previousState, setErrorMessage(null))).toEqual({
      isLoading: false
    });
  });
});
