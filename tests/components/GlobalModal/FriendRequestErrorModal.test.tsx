import { ThemeProvider } from '@mui/material/styles';
import { act, fireEvent, render, screen } from '@testing-library/react';

import FriendRequestErrorModal from '~/components/GlobalModal/FriendRequestErrorModal';
import { defaultTheme, ModalKey } from '~/constants';
import ReduxProvider from '~/redux/ReduxProvider';
import { hideModal, showModal } from '~/redux/slices/modalSlice';
import { store } from '~/redux/store';

describe('FriendRequestErrorModal', () => {
  test('should show modal correctly with corresponding modalState', () => {
    render(
      <ReduxProvider>
        <ThemeProvider theme={defaultTheme}>
          <FriendRequestErrorModal />
        </ThemeProvider>
      </ReduxProvider>
    );

    // no further setup
    const mainText = screen.queryByText('FRIEND REQUEST FAILED');
    expect(mainText).not.toBeInTheDocument();

    // dispatch showModal without extra props
    act(() => {
      store.dispatch(showModal({ key: ModalKey.FRIEND_REQUEST_ERR }));
    });

    let subText = screen.queryByText(
      "Hm, didn't work. Double check that the username is correct."
    );
    expect(subText).toBeInTheDocument();

    // dispath showModal with extra prop isFriend
    act(() => {
      store.dispatch(
        showModal({
          key: ModalKey.FRIEND_REQUEST_ERR,
          extraProps: {
            isFriend: true
          }
        })
      );
    });

    subText = screen.queryByText("You're already friends with that user!");
    expect(subText).toBeInTheDocument();
  });

  // !! Need test later

  //   test('should close modal on button press', () => {
  //     store.dispatch(showModal({ key: ModalKey.FRIEND_REQUEST_ERR }));
  //     render(
  //       <ReduxProvider>
  //         <ThemeProvider theme={defaultTheme}>
  //           <FriendRequestErrorModal />
  //         </ThemeProvider>
  //       </ReduxProvider>
  //     );

  //     const mainText = screen.queryByText('FRIEND REQUEST FAILED');
  //     expect(mainText).toBeInTheDocument();

  //     const button = screen.getByRole('button');
  //     expect(button).toBeInTheDocument();
  //     expect(button).toHaveTextContent(/^Okay$/);

  //     fireEvent.click(button);

  //     expect(mainText).not.toBeVisible();
  //   });
});
