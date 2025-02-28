import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Box } from '@mui/material';

import { protectedRoutes } from '~/constants';

import NavItem from '../NavItem';

const FeatureNav = () => {
  return (
    <Box>
      <NavItem
        label='Friends'
        href={protectedRoutes.myChannels}
        startAdornment={
          <EmojiPeopleIcon sx={{ width: '24px', height: '24px' }} />
        }
      />
      <NavItem
        label='Shop'
        href={protectedRoutes.shop}
        startAdornment={
          <StorefrontIcon sx={{ width: '24px', height: '24px' }} />
        }
      />
    </Box>
  );
};

export default FeatureNav;
