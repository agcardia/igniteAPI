import { Box, Typography, useTheme } from '@mui/material';

interface headerInput {
  title: string;
  subtitle: string;
}

const Header = (props: headerInput) => {
  const theme = useTheme();
  return (
    <Box mb="30px">
      <Typography variant="h3" fontWeight="bold" sx={{ mb: '5px' }}>
        {props.title}
      </Typography>
      <Typography variant="h6">{props.subtitle}</Typography>
    </Box>
  );
};

export default Header;
