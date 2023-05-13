import { Box } from '@mui/material';
import Row1 from './Row1';
import Row2 from './Row2';
import Row3 from './Row3';

const gridTemplate = `
    "a  b   c"
    "a  b   c"
    "a  b   c"
    "a  b   f"
    "d  e   f"
    "d  e   f"
    "d  e   i"
    "g  h   i"
    "g  h   j"
    "g  h   j"
`;

const Dashboard = () => {
  return (
    <Box
      height="100%"
      width="100%"
      display="grid"
      gap="1.5rem"
      sx={{
        gridTemplateColumns: 'repeat(3, minmax(170px,1fr))',
        gridTemplateRows: 'repeat (10, minmax(60px, 1fr))',
        gridTemplateAreas: gridTemplate
      }}
    >
      <Row1 />
      <Row2 />
      <Row3 />
    </Box>
  );
};

export default Dashboard;
