import React from 'react';
import {Box, IconButton, Typography} from '@mui/material';

const Topbar = () => {
  return (
    <Box display="flex" justifyContent="space-between" p={2} sx={{backgroundColor:"F3F3F3"}}>
      <Typography>Left</Typography>
      <Typography>Right</Typography>
    </Box>
  )
}

export default Topbar
