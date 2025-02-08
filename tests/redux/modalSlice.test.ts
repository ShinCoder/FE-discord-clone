import modalReducer, {
  hideModal,
  ModalSlice,
  showModal
} from '~/redux/slices/modalSlice';

describe('Redux-modalSlice', () => {
  test('should return the initial state', () => {
    expect(modalReducer(undefined, { type: 'unkncwn' })).toEqual({});
  });

  test('should update modal data on showModal', () => {
    const previousState: ModalSlice = {};

    const mockModalKey = 'Mock_key';

    expect(
      modalReducer(
        previousState,
        showModal({
          key: mockModalKey
        })
      )
    ).toEqual({
      [mockModalKey]: {
        show: true
      }
    });
  });

  test('should update modal data on hideModal', () => {
    const mockModalKey = 'Mock_key';

    const previousState: ModalSlice = {
      [mockModalKey]: {
        show: true
      }
    };

    expect(modalReducer(previousState, hideModal(mockModalKey))).toEqual({
      [mockModalKey]: {
        show: false
      }
    });
  });
});
