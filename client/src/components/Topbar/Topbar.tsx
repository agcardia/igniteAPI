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

  const pages = ["Revenue","Expenses","Invoices","Reciepts"];

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
        {pages.map((page) =>
          <MenuItem onClick={handleClose}>
            <Button href={`/${page}`}>{page}</Button>
          </MenuItem>
        )};
      </Menu>

    </div>
  )
}

export default Topbar;



