import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const CustomLink = styled(Link)(({ theme }) => ({
  display: 'inline',
  color: theme.dcPalette.text.link,
  textDecoration: 'none',

  '&:hover': {
    textDecoration: 'underline'
  }
}));

export default CustomLink;
