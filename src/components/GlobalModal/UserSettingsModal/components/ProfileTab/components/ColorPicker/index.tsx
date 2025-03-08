import { Box } from '@mui/material';
import { MouseEvent } from 'react';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

const ColorPicker = (props: ColorPickerProps) => {
  const { value, onChange } = props;

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          width: '69px',
          height: '50px',
          borderRadius: '4px',
          backgroundColor: value
        }}
        onClick={(event: MouseEvent<HTMLDivElement>) => {
          console.log(event.clientX, event.clientY);
        }}
      ></Box>
    </>
  );
};

export default ColorPicker;
