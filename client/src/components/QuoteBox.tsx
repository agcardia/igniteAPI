import { Box, Typography } from '@mui/material';

interface quoteInput {
  title: string;
  subtitle: string;
}

const QuoteBox = (props: quoteInput) => {
  return (
    <Box mt="10px" height="100%">
      <Typography variant="h6" align="center" sx={{ ml: '10px', mr: '10px' }}>
        {props.title}
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        sx={{ ml: '10px', mr: '10px', fontStyle: 'italic' }}
      >
        {props.subtitle}
      </Typography>
    </Box>
  );
};

export default QuoteBox;
