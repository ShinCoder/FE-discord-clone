import { Box, Tabs, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useCallback, useState } from 'react';

import UserAvatar from '~/components/UserAvatar';
import { ellipsisTextWrapStyle } from '~/utils';
import { IUserWithSettingsDto } from '~shared/types/api';

import {
  ContentCommonText,
  ContentDangerButton,
  ContentOutlinedDangerButton,
  ContentPrimaryButton,
  ContentPrimaryHeader,
  ContentSecondaryButton,
  ContentSecondaryHeader,
  ContentSectionHeader,
  ContentTabLabel
} from '../../elements';
import EmailDisplay from './components/EmailDisplay';
import PhoneNumberDisplay from './components/PhoneNumberDisplay';

interface MyAccountTabProps {
  userData: IUserWithSettingsDto;
  onNavigateToProfileTab: () => void;
}

const MyAccountTab = (props: MyAccountTabProps) => {
  const { userData, onNavigateToProfileTab } = props;
  const theme = useTheme();

  const [activeTab, setActiveTab] = useState<number>(0);

  const handleSetActiveTab = useCallback(
    (_: React.SyntheticEvent, tab: number) => {
      setActiveTab(tab);
    },
    []
  );

  const renderTabContent = useCallback(() => {
    switch (activeTab) {
      case 0:
        return (
          <Box>
            <Box
              sx={{
                position: 'relative',
                borderRadius: '8px',
                backgroundColor: theme.dcPalette.background.tertiary,
                overflow: 'hidden'
              }}
            >
              <Box
                sx={{
                  height: '100px',
                  minHeight: '100px',
                  backgroundColor: userData.bannerColor
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: '82px',
                  left: '16px',
                  borderRadius: '50%',
                  border: `6px solid ${theme.dcPalette.background.tertiary}`
                }}
              >
                <UserAvatar
                  src={userData.avatar}
                  alt={userData.username}
                  color={userData.bannerColor}
                  size='80px'
                />
              </Box>
              <Box
                sx={{
                  height: '76px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '16px 16px 0 120px'
                }}
              >
                <Typography
                  sx={{
                    color: theme.dcPalette.header.primary,
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    lineHeight: '24px'
                  }}
                >
                  {userData.displayName}
                </Typography>
                <ContentPrimaryButton onClick={onNavigateToProfileTab}>
                  Edit user profile
                </ContentPrimaryButton>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '24px',
                  padding: '16px',
                  borderRadius: '8px',
                  margin: '8px 16px 16px 16px',
                  backgroundColor: theme.dcPalette.background.secondary
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Box sx={{ marginRight: '16px' }}>
                    <ContentSectionHeader
                      component='h2'
                      sx={{ marginBottom: '4px' }}
                    >
                      Display name
                    </ContentSectionHeader>
                    <Typography
                      sx={{
                        color: theme.dcPalette.header.primary,
                        fontSize: '1rem',
                        fontWeight: 400,
                        lineHeight: 1.25,
                        ...ellipsisTextWrapStyle
                      }}
                    >
                      {userData.displayName}
                    </Typography>
                  </Box>
                  <ContentSecondaryButton onClick={onNavigateToProfileTab}>
                    Edit
                  </ContentSecondaryButton>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Box sx={{ marginRight: '16px' }}>
                    <ContentSectionHeader
                      component='h2'
                      sx={{ marginBottom: '4px' }}
                    >
                      Username
                    </ContentSectionHeader>
                    <Typography
                      sx={{
                        color: theme.dcPalette.header.primary,
                        fontSize: '1rem',
                        fontWeight: 400,
                        lineHeight: 1.25,
                        ...ellipsisTextWrapStyle
                      }}
                    >
                      {userData.username}
                    </Typography>
                  </Box>
                  <ContentSecondaryButton onClick={onNavigateToProfileTab}>
                    Edit
                  </ContentSecondaryButton>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Box sx={{ marginRight: '16px' }}>
                    <ContentSectionHeader
                      component='h2'
                      sx={{ marginBottom: '4px' }}
                    >
                      Email
                    </ContentSectionHeader>
                    <EmailDisplay email={userData.email} />
                  </Box>
                  <ContentSecondaryButton>Edit</ContentSecondaryButton>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Box sx={{ marginRight: '16px' }}>
                    <ContentSectionHeader
                      component='h2'
                      sx={{ marginBottom: '4px' }}
                    >
                      Phone Number
                    </ContentSectionHeader>
                    {userData.phoneNumber ? (
                      <PhoneNumberDisplay phoneNumber={userData.phoneNumber} />
                    ) : (
                      <Typography
                        sx={{
                          color: theme.dcPalette.header.primary,
                          fontSize: '1rem',
                          fontWeight: 400,
                          lineHeight: 1.25,
                          ...ellipsisTextWrapStyle
                        }}
                      >
                        You haven't added a phone number yet.
                      </Typography>
                    )}
                  </Box>
                  <ContentSecondaryButton>
                    {userData.phoneNumber ? 'Edit' : 'Add'}
                  </ContentSecondaryButton>
                </Box>
              </Box>
            </Box>
            <Box sx={{ marginTop: '40px' }}>
              <ContentSecondaryHeader
                component='h4'
                sx={{ paddingBottom: '20px' }}
              >
                Password and Authentication
              </ContentSecondaryHeader>
              <ContentPrimaryButton>Change Password</ContentPrimaryButton>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '32px',
                  paddingTop: '28px'
                }}
              >
                <Box>
                  <ContentSectionHeader
                    component='h5'
                    sx={{ paddingBottom: '8px' }}
                  >
                    Authenticator App
                  </ContentSectionHeader>
                  <ContentCommonText sx={{ paddingBottom: '20px' }}>
                    Protect your Discord account with an extra layer of
                    security. Once configured, you'll be required to enter your
                    password and complete one additional step in order to sign
                    in.
                  </ContentCommonText>
                  <ContentPrimaryButton>
                    Enable Authenticator App
                  </ContentPrimaryButton>
                </Box>
                <Box>
                  <ContentSectionHeader
                    component='h5'
                    sx={{ paddingBottom: '8px' }}
                  >
                    Security Keys
                  </ContentSectionHeader>
                  <ContentCommonText sx={{ paddingBottom: '20px' }}>
                    Add an additional layer of protection to your account with a
                    Security Key.
                  </ContentCommonText>
                  <ContentPrimaryButton>
                    Register a Security Key
                  </ContentPrimaryButton>
                </Box>
                <Box>
                  <ContentSectionHeader
                    component='h5'
                    sx={{ paddingBottom: '8px' }}
                  >
                    Account Removal
                  </ContentSectionHeader>
                  <ContentCommonText sx={{ paddingBottom: '20px' }}>
                    Disabling your account means you can recover it at any time
                    after taking this action.
                  </ContentCommonText>
                  <Box sx={{ display: 'flex', columnGap: '16px' }}>
                    <ContentDangerButton>Disable Account</ContentDangerButton>
                    <ContentOutlinedDangerButton>
                      Delete Account
                    </ContentOutlinedDangerButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        );
      default:
        return <Box>Probaly not coming soon</Box>;
    }
  }, [
    activeTab,
    onNavigateToProfileTab,
    theme.dcPalette.background.secondary,
    theme.dcPalette.background.tertiary,
    theme.dcPalette.header.primary,
    userData.avatar,
    userData.bannerColor,
    userData.displayName,
    userData.email,
    userData.phoneNumber,
    userData.username
  ]);

  return (
    <Box
      sx={{
        padding: '60px 40px 80px 40px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '32px'
        }}
      >
        <ContentPrimaryHeader component='h3'>My Account</ContentPrimaryHeader>
        <Tabs
          value={activeTab}
          onChange={handleSetActiveTab}
          sx={{
            minHeight: 'auto',
            borderBottom: `1px solid ${theme.dcPalette.background.modifierAccent}`
          }}
          slotProps={{
            list: {
              sx: {
                columnGap: '32px'
              }
            },
            indicator: {
              sx: {
                backgroundColor: theme.dcPalette.control.brandForeground
              }
            }
          }}
        >
          <ContentTabLabel
            label='Security'
            disableRipple
          />
          <ContentTabLabel
            label='Standing'
            disableRipple
          />
        </Tabs>
        {renderTabContent()}
      </Box>
    </Box>
  );
};

export default MyAccountTab;
