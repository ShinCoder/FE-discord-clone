import { StorageKey } from '~/constants';
import authReducer, {
  AuthSlice,
  clearAuthState,
  setToken,
  setUserData
} from '~/redux/slices/authSlice';
import { writeLocalStorage, clearLocalStorage } from '~/utils';
import { ITokenDto, IUserWithSettingsDto } from '~shared/types/api';

vi.mock('~/utils', { spy: true });

describe('Redux-authSlice', () => {
  test('should return the initial state', () => {
    expect(authReducer(undefined, { type: 'unkncwn' })).toEqual({
      token: undefined
    });
  });

  test('should update token on setToken', () => {
    const previousState: AuthSlice = {
      token: undefined
    };

    const mockToken: ITokenDto = {
      accessToken: 'Mock_token',
      refreshToken: 'Mock_token'
    };

    expect(authReducer(previousState, setToken(mockToken))).toEqual({
      token: mockToken
    });

    expect(writeLocalStorage).toHaveBeenCalledWith(StorageKey.TOKEN, mockToken);
  });

  test('should update data on setUserData', () => {
    const previousState: AuthSlice = {
      token: undefined
    };

    const mockUserData: IUserWithSettingsDto = {
      id: 'id',
      email: 'email',
      username: 'username',
      displayName: 'displayName',
      dateOfBirth: '2000-01-01',
      bannerColor: 'blue',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
      settings: {
        dmSettings: {
          pinnedDms: []
        }
      }
    };

    expect(authReducer(previousState, setUserData(mockUserData))).toEqual({
      token: undefined,
      data: mockUserData
    });
  });

  test('should clear state on clearAuthState', () => {
    const previousState: AuthSlice = {
      token: {
        accessToken: 'Mock_token',
        refreshToken: 'Mock_token'
      },
      data: {
        id: 'id',
        email: 'email',
        username: 'username',
        displayName: 'displayName',
        dateOfBirth: '2000-01-01',
        bannerColor: 'blue',
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
        settings: {
          dmSettings: {
            pinnedDms: []
          }
        }
      }
    };

    expect(authReducer(previousState, clearAuthState())).toEqual({});

    expect(clearLocalStorage).toHaveBeenCalledWith(StorageKey.TOKEN);
  });
});
