import { joiResolver } from '@hookform/resolvers/joi';
import { Box, Input, Tabs } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import joi from 'joi';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import ControlledInputText from '~/components/ControlledInputText';
import { IUserWithSettingsDto } from '~shared/types/api';

import {
  ContentPrimaryButton,
  ContentPrimaryHeader,
  ContentSectionHeader,
  ContentTabLabel
} from '../../elements';
import ColorPicker from './components/ColorPicker';

interface ProfileTabProps {
  userData: IUserWithSettingsDto;
}

interface FormData {
  displayName: string;
  pronouns: string;
  bannerColor: string;
  about: string;
}

const ProfileTab = (props: ProfileTabProps) => {
  const { userData } = props;
  const theme = useTheme();

  const [activeTab, setActiveTab] = useState<number>(0);

  const handleSetActiveTab = useCallback(
    (_: React.SyntheticEvent, tab: number) => {
      setActiveTab(tab);
    },
    []
  );

  const schema = useMemo(
    () =>
      joi.object({
        displayName: joi.string().optional(),
        pronouns: joi.string().optional(),
        bannerColor: joi.string().required(),
        about: joi.string().optional()
      }),
    []
  );

  const { register, handleSubmit, reset, setValue, watch } = useForm<FormData>({
    resolver: joiResolver(schema),
    defaultValues: {
      displayName: userData.displayName,
      pronouns: userData.pronouns || '',
      bannerColor: userData.bannerColor,
      about: userData.about || ''
    }
  });
  const formValues = watch();

  const handleUpdateColor = useCallback(
    (color: string) => {
      setValue('bannerColor', color);
    },
    [setValue]
  );

  const renderTabContent = useCallback(() => {
    switch (activeTab) {
      case 0:
        return (
          <Box
            sx={{
              display: 'flex',
              columnGap: '35px'
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  paddingBottom: '24px',
                  borderBottom: `1px solid ${theme.dcPalette.background.modifierAccent}`,
                  marginBottom: '24px'
                }}
              >
                <ContentSectionHeader
                  component='h4'
                  sx={{ paddingBottom: '8px' }}
                >
                  Display name
                </ContentSectionHeader>
                <Input
                  sx={{
                    width: '100%',
                    height: '40px',
                    color: theme.dcPalette.text.normal,
                    borderRadius: theme.dcShape.borderRadius.input,
                    backgroundColor: theme.dcPalette.background.tertiary,
                    '&::before, &::after': { content: 'none' }
                  }}
                  inputProps={{
                    sx: {
                      padding: theme.spacing(1.25),
                      borderRadius: theme.dcShape.borderRadius.input
                    }
                  }}
                  {...register('displayName')}
                />
              </Box>
              <Box
                sx={{
                  paddingBottom: '24px',
                  borderBottom: `1px solid ${theme.dcPalette.background.modifierAccent}`,
                  marginBottom: '24px'
                }}
              >
                <ContentSectionHeader
                  component='h4'
                  sx={{ paddingBottom: '8px' }}
                >
                  Pronouns
                </ContentSectionHeader>
                <Input
                  sx={{
                    width: '100%',
                    height: '40px',
                    color: theme.dcPalette.text.normal,
                    borderRadius: theme.dcShape.borderRadius.input,
                    backgroundColor: theme.dcPalette.background.tertiary,
                    '&::before, &::after': { content: 'none' }
                  }}
                  inputProps={{
                    sx: {
                      padding: theme.spacing(1.25),
                      borderRadius: theme.dcShape.borderRadius.input
                    }
                  }}
                  placeholder='Add your pronouns'
                  {...register('pronouns')}
                />
              </Box>
              <Box
                sx={{
                  paddingBottom: '24px',
                  borderBottom: `1px solid ${theme.dcPalette.background.modifierAccent}`,
                  marginBottom: '24px'
                }}
              >
                <ContentSectionHeader
                  component='h4'
                  sx={{ paddingBottom: '8px' }}
                >
                  Avatar
                </ContentSectionHeader>
                <ContentPrimaryButton>Change Avatar</ContentPrimaryButton>
              </Box>
              <Box
                sx={{
                  paddingBottom: '24px',
                  borderBottom: `1px solid ${theme.dcPalette.background.modifierAccent}`,
                  marginBottom: '24px'
                }}
              >
                <ContentSectionHeader
                  component='h4'
                  sx={{ paddingBottom: '8px' }}
                >
                  Avatar Decoration
                </ContentSectionHeader>
                <ContentPrimaryButton>Change Decoration</ContentPrimaryButton>
              </Box>
              <Box
                sx={{
                  paddingBottom: '24px',
                  borderBottom: `1px solid ${theme.dcPalette.background.modifierAccent}`,
                  marginBottom: '24px'
                }}
              >
                <ContentSectionHeader
                  component='h4'
                  sx={{ paddingBottom: '8px' }}
                >
                  Profile Effect
                </ContentSectionHeader>
                <ContentPrimaryButton>Change Effect</ContentPrimaryButton>
              </Box>
              <Box
                sx={{
                  paddingBottom: '24px',
                  borderBottom: `1px solid ${theme.dcPalette.background.modifierAccent}`,
                  marginBottom: '24px'
                }}
              >
                <ContentSectionHeader
                  component='h4'
                  sx={{ paddingBottom: '8px' }}
                >
                  Banner Color
                </ContentSectionHeader>
                <ColorPicker
                  value={formValues.bannerColor}
                  onChange={handleUpdateColor}
                />
              </Box>
            </Box>
            <Box sx={{ maxWidth: '348px' }}>
              <ContentSectionHeader sx={{ paddingBottom: '8px' }}>
                Preview
              </ContentSectionHeader>
              <Box
                sx={{
                  position: 'relative',
                  width: '300px',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}
              >
                <Box sx={{ minHeight: '105px' }}></Box>
              </Box>
            </Box>
          </Box>
        );
      default:
        return <Box>Probaly not coming soon</Box>;
    }
  }, [activeTab, formValues.bannerColor, handleUpdateColor, register, theme]);

  return (
    <Box
      sx={{
        padding: '60px 10px 80px 40px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '32px'
        }}
      >
        <ContentPrimaryHeader component='h3'>Profiles</ContentPrimaryHeader>
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
            label='User Profile'
            disableRipple
          />
          <ContentTabLabel
            label='Server Profiles'
            disableRipple
          />
        </Tabs>
        {renderTabContent()}
      </Box>
    </Box>
  );
};

export default ProfileTab;
