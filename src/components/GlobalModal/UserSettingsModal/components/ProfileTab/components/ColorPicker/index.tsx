import { Box, Popover } from '@mui/material';
import { MouseEvent, useState } from 'react';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

const ColorPicker = (props: ColorPickerProps) => {
  const { value, onChange } = props;

  const [coord, setCoord] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          width: '69px',
          height: '50px',
          borderRadius: '4px',
          backgroundColor: value,
          cursor: 'pointer'
        }}
        onClick={(event: MouseEvent<HTMLDivElement>) => {
          console.log(event.clientX, event.clientY);
          setCoord({ x: event.clientX, y: event.clientY });
        }}
      ></Box>
    </>
  );
};

export default ColorPicker;
