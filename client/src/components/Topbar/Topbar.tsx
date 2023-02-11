import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import {useState} from 'react';

const Topbar = () => {

  const [anchorEl,setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event:React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <div>
      <Button
       id='basic-button'
       aria-controls={open ? 'basic-menu' : undefined}
       ara-haspopup="true"
       aria-expanded={open ? 'true': undefined}
       onClick={handleClick}
       size="large"
        >
        Dashboard
      </Button>
      <Menu
       anchorEl={anchorEl}
       open={open}
       onClose={handleClose}
       MenuListProps={{
        'aria-labelledby':'basic-button',
       }}
       >
        <MenuItem onClick={handleClose}>Revenue</MenuItem>
        <MenuItem onClick={handleClose}>Expenses</MenuItem>
        <MenuItem onClick={handleClose}>Reciepts</MenuItem>
        <MenuItem onClick={handleClose}>Invoices</MenuItem>
      </Menu>

    </div>
  )
}

export default Topbar;



