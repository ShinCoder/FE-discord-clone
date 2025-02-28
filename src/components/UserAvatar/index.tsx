import { Avatar, Badge } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { memo, useCallback } from 'react';

import BrandIcon from '~/components/BrandIcon';
import { EConnectionStatus } from '~shared/types/api';

interface UserAvatarProps {
  src?: string;
  alt: string;
  color?: string;
  showStatus?: boolean;
  status?: EConnectionStatus;
  size?: string;
}

const UserAvatar = (props: UserAvatarProps) => {
  const {
    src,
    alt,
    color = 'transparent',
    showStatus = false,
    status = EConnectionStatus.OFFLINE,
    size = '32px'
  } = props;

  const theme = useTheme();

  const renderAvatar = useCallback(() => {
    return (
      <Avatar
        sx={{ width: size, height: size, backgroundColor: color }}
        src={src}
        alt={alt}
      >
        {!src && (
          <BrandIcon
            color='white'
            width={`calc(${size} * 0.625)`}
            height={`calc(${size} * 0.625)`}
          />
        )}
      </Avatar>
    );
  }, [alt, color, size, src]);

  const render = useCallback(() => {
    if (showStatus) {
      switch (status) {
        case EConnectionStatus.ONLINE:
          return (
            <Badge
              overlap='circular'
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant='dot'
              sx={{
                height: 'fit-content',

                '& .MuiBadge-badge': {
                  width: `calc(${size} * 0.2)`,
                  height: `calc(${size} * 0.2)`,
                  borderRadius: '50%',
                  backgroundColor: theme.dcPalette.green[360]
                }
              }}
            >
              {renderAvatar()}
            </Badge>
          );
        case EConnectionStatus.OFFLINE:
          return (
            <Badge
              overlap='circular'
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant='dot'
              sx={{
                '& .MuiBadge-badge': {
                  width: `calc(${size} * 0.2)`,
                  height: `calc(${size} * 0.2)`,
                  borderRadius: '50%',
                  backgroundColor: 'rgb(128, 132, 142)'
                }
              }}
            >
              {renderAvatar()}
            </Badge>
          );
        default:
          return renderAvatar();
      }
    } else {
      return renderAvatar();
    }
  }, [renderAvatar, showStatus, size, status, theme.dcPalette.green]);

  return render();
};

export default memo(UserAvatar);
