import { Box } from '@mui/material';
import { styled } from '@mui/system';

const DashboardBox = styled(Box)(({ theme }) => ({
  borderRadius: '1rem',
  boxShadow: '0.1rem 0.15rem 0.15rem 0.1rem'
}));

export default DashboardBox;
