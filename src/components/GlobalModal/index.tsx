import FriendRequestErrorModal from './FriendRequestErrorModal';
import ProfileModal from './ProfileModal';
import UserSettingsModal from './UserSettingsModal';

const GlobalModal = () => {
  return (
    <>
      <ProfileModal />
      <FriendRequestErrorModal />
      <UserSettingsModal />
    </>
  );
};

export default GlobalModal;
