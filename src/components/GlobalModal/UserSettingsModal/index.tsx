import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Dialog,
  IconButton,
  Input,
  Typography,
  Zoom
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useCallback, useState } from 'react';

import { ModalKey } from '~/constants';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { hideModal } from '~/redux/slices/modalSlice';
import { getScrollbarStyle } from '~/utils';

import LogoutModal from './components/LogoutModal';
import MyAccountTab from './components/MyAccountTab';
import { NavHeader, NavSeparator } from './elements';
import NavItem from './NavItem';

enum SettingNavTab {
  'My Account' = 'My Account',
  'Profile' = 'Profile',
  'Content & Social' = 'Content & Social',
  'Data & Privacy' = 'Data & Privacy',
  'Family Center' = 'Family Center',
  'Authorized Apps' = 'Authorized Apps',
  'Devices' = 'Devices',
  'Connections' = 'Connections',
  'Clips' = 'Clips'
}

const UserSettingsModal = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { data: userData } = useAppSelector((state) => state.auth);
  const modalState = useAppSelector((state) => state.modal)[
    ModalKey.USER_SETTINGS
  ];

  const handleClose = useCallback(() => {
    dispatch(hideModal(ModalKey.USER_SETTINGS));
  }, [dispatch]);

  const [activeTab, setActiveTab] = useState<SettingNavTab>(
    SettingNavTab['My Account']
  );

  const handleSetActiveTab = useCallback(
    (tab: SettingNavTab) => () => {
      setActiveTab(tab);
    },
    []
  );

  const [logoutModalOpen, setLogoutModalOpen] = useState<boolean>(false);
  const handleOpenLogoutModal = useCallback(() => {
    setLogoutModalOpen(true);
  }, []);
  const handleCloseLogoutModal = useCallback(() => {
    setLogoutModalOpen(false);
  }, []);

  const renderContent = useCallback(() => {
    switch (activeTab) {
      case SettingNavTab['My Account']:
        return (
          userData && (
            <MyAccountTab
              userData={userData}
              onNavigateToProfileTab={handleSetActiveTab(SettingNavTab.Profile)}
            />
          )
        );
      default:
        return <Box>Probaly not coming soon</Box>;
    }
  }, [activeTab, handleSetActiveTab, userData]);

  return (
    <Dialog
      fullScreen
      open={!!modalState?.show}
      onClose={handleClose}
      slots={{ transition: Zoom }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          backgroundColor: theme.dcPalette.background.primary
        }}
      >
        <Box
          sx={{
            flex: '1 0 218px',
            display: 'flex',
            justifyContent: 'flex-end',
            backgroundColor: theme.dcPalette.background.secondary,
            overflowX: 'hidden',
            overflowY: 'auto',
            scrollbarGutter: 'stable',
            ...getScrollbarStyle('thin')
          }}
        >
          <Box
            component='nav'
            sx={{
              width: '218px',
              maxWidth: '218px',
              height: 'fit-content',
              flex: '1 0 auto',
              padding: '60px 6px 60px 20px'
            }}
          >
            <Box sx={{ marginBottom: '20px' }}>
              <Input
                disableUnderline
                sx={{
                  height: '34px',
                  fontSize: '16px',
                  lineHeight: '32px',
                  padding: '0 8px',
                  borderRadius: '4px',
                  backgroundColor: theme.dcPalette.background.tertiary
                }}
                placeholder='Search'
                endAdornment={
                  <SearchIcon
                    sx={{
                      width: '20px',
                      height: '20px',
                      color: theme.dcPalette.text.muted
                    }}
                  />
                }
              />
            </Box>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', rowGap: '2px' }}
            >
              <NavHeader>User settings</NavHeader>
              <NavItem
                active={activeTab === SettingNavTab['My Account']}
                onClick={handleSetActiveTab(SettingNavTab['My Account'])}
                label={SettingNavTab['My Account']}
              />
              <NavItem
                active={activeTab === SettingNavTab['Profile']}
                onClick={handleSetActiveTab(SettingNavTab['Profile'])}
                label={SettingNavTab['Profile']}
              />
              <NavItem
                active={activeTab === SettingNavTab['Content & Social']}
                onClick={handleSetActiveTab(SettingNavTab['Content & Social'])}
                label={SettingNavTab['Content & Social']}
              />
              <NavItem
                active={activeTab === SettingNavTab['Data & Privacy']}
                onClick={handleSetActiveTab(SettingNavTab['Data & Privacy'])}
                label={SettingNavTab['Data & Privacy']}
              />
              <NavItem
                active={activeTab === SettingNavTab['Family Center']}
                onClick={handleSetActiveTab(SettingNavTab['Family Center'])}
                label={SettingNavTab['Family Center']}
              />
              <NavItem
                active={activeTab === SettingNavTab['Authorized Apps']}
                onClick={handleSetActiveTab(SettingNavTab['Authorized Apps'])}
                label={SettingNavTab['Authorized Apps']}
              />
              <NavItem
                active={activeTab === SettingNavTab['Devices']}
                onClick={handleSetActiveTab(SettingNavTab['Devices'])}
                label={SettingNavTab['Devices']}
              />
              <NavItem
                active={activeTab === SettingNavTab['Connections']}
                onClick={handleSetActiveTab(SettingNavTab['Connections'])}
                label={SettingNavTab['Connections']}
              />
              <NavItem
                active={activeTab === SettingNavTab['Clips']}
                onClick={handleSetActiveTab(SettingNavTab['Clips'])}
                label={SettingNavTab['Clips']}
              />
              <NavSeparator />
              <NavItem
                onClick={handleOpenLogoutModal}
                label='Log Out'
                endAdornment={
                  <LogoutIcon
                    sx={{ width: '16px', height: '16px', color: 'inherit' }}
                  />
                }
              />
              <NavSeparator />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            flex: '1 1 800px',
            display: 'flex',
            overflowX: 'hidden',
            overflowY: 'auto',
            ...getScrollbarStyle()
          }}
        >
          <Box
            sx={{
              maxWidth: '740px',
              minWidth: '460px',
              height: 'fit-content',
              minHeight: '100%',
              flex: '1 1 auto',
              padding: '60px 40px 80px 40px'
            }}
          >
            {renderContent()}
          </Box>
          <Box
            sx={{
              position: 'relative',
              flex: '0 0 36px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: '60px'
            }}
          >
            <Box sx={{ position: 'fixed' }}>
              <IconButton
                sx={{
                  width: '36px',
                  height: '36px',
                  color: theme.dcPalette.interactive.normal,
                  border: `2px solid ${theme.dcPalette.interactive.normal}`,

                  '&:hover': {
                    color: theme.dcPalette.interactive.hover,
                    borderColor: theme.dcPalette.interactive.hover,

                    '+ *': {
                      color: theme.dcPalette.interactive.hover
                    }
                  }
                }}
                onClick={handleClose}
              >
                <CloseIcon sx={{ width: '18px', height: '18px' }} />
              </IconButton>
              <Typography
                sx={{
                  color: theme.dcPalette.interactive.normal,
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  textAlign: 'center',
                  paddingTop: '8px'
                }}
              >
                ESC
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <LogoutModal
        open={logoutModalOpen}
        onClose={handleCloseLogoutModal}
      />
    </Dialog>
  );
};

export default UserSettingsModal;
