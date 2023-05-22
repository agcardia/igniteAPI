import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material';

interface quoteInput {
  title: string;
  subtitle: string;
}

const QuoteBox = (props: quoteInput) => {
  const { palette } = useTheme();
  return (
    <Box mt="10px" height="100%">
      <Typography variant="h6" align="center" color={palette.primary.main} sx={{ ml: '10px', mr: '10px' }}>
        {props.title}
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color={palette.primary.main}
        sx={{ ml: '10px', mr: '10px', fontStyle: 'italic' }}
      >
        {props.subtitle}
      </Typography>
    </Box>
  );
};

export default QuoteBox;
