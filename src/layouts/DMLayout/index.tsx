import AddIcon from '@mui/icons-material/Add';
import { Box, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';

import SettingsFooter from '~/components/SettingsFooter';
import { getScrollbarStyle } from '~/utils';

import DMNav from './components/DMNav';
import FeatureNav from './components/FeatureNav';
import Searchbar from './components/Searchbar';
import SectionHeader from './components/SectionHeader';

const DMLayout = () => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          width: theme.dcShape.defaultWidth.sidebar,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: theme.dcPalette.background.secondary
        }}
      >
        <Searchbar />
        <Box
          component='nav'
          sx={{
            flex: 1,
            maxHeight: '100%',
            padding: `${theme.spacing(1)} 0 0 ${theme.spacing(1)}`,
            overflow: 'auto',
            scrollbarGutter: 'stable',
            ...getScrollbarStyle('thin')
          }}
        >
          <FeatureNav />
          <SectionHeader
            label='Direct messages'
            actionButton={
              <Tooltip
                title='Create DM'
                placement='top'
              >
                <AddIcon
                  sx={{
                    wdith: '18px',
                    height: '18px',
                    color: 'inherit',
                    transition: 'inherit',
                    cursor: 'pointer'
                  }}
                />
              </Tooltip>
            }
          />
          <DMNav />
        </Box>
        <SettingsFooter />
      </Box>
      <Outlet />
    </>
  );
};

export default DMLayout;
