import { Box } from '@mui/material';
import { memo } from 'react';

import { getScrollbarStyle } from '~/utils';
import { IUserDto, WithRelationship } from '~shared/types/api';

import { FriendTabTitle } from '../../elements';
import BlockedItem from '../BlockedItem';

interface BlockedProps {
  data: Array<IUserDto & WithRelationship>;
  onUnblock: (id: string) => () => void;
}

const Blocked = (props: BlockedProps) => {
  const { data, onUnblock } = props;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ padding: '16px 20px 8px 30px' }}>
        <FriendTabTitle component='h2'>{`Blocked - ${data.length}`}</FriendTabTitle>
      </Box>
      <Box
        sx={{
          marginTop: '8px',
          paddingBottom: '8px',
          ...getScrollbarStyle('auto')
        }}
      >
        {data.map((_blocked) => (
          <BlockedItem
            key={_blocked.id}
            data={_blocked}
            onUnblock={onUnblock(_blocked.id)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default memo(Blocked);
