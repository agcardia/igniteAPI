import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import {
  Menu,
  MenuItem,
  useProSidebar,
  Sidebar,
  menuClasses
} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PersonIcon from '@mui/icons-material/Person';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('dashboard');

  const { collapseSidebar, collapsed } = useProSidebar();
  const Item = (input: {
    title: string;
    to: string;
    icon: any;
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    return (
      <Box color="#11434B" width="100%">
        <Link
          to={input.to}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <MenuItem
            active={selected === input.title}
            onClick={() => input.setSelected(input.title)}
            icon={input.icon}
          >
            <Typography>{input.title}</Typography>
          </MenuItem>
        </Link>
      </Box>
    );
  };

  return (
    <Box backgroundColor="white">
      <Sidebar backgroundColor="white">
        <Menu
          menuItemStyles={{
            button: {
              '&:hover': {
                backgroundColor: 'lightgrey'
              }
            }
          }}
        >
          <MenuItem
            onClick={() => collapseSidebar()}
            icon={collapsed ? <MenuOutlinedIcon /> : undefined}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15 px"
                color="#11434B"
              >
                <IconButton>
                  <MenuOutlinedIcon />
                </IconButton>
                <Typography
                  sx={{ mr: '10px', fontWeight: 'bold' }}
                  color="#11434B"
                >
                  Ignite Dashboard
                </Typography>
              </Box>
            )}
          </MenuItem>
          <Box color="#11434B" paddingLeft={collapsed ? undefined : '10%'}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography color="#11434B" align="left" sx={{ ml: '20px' }}>
              Data
            </Typography>
            <Item
              title="Invoices"
              to="/invoice"
              icon={<DescriptionIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Expenses"
              to="/expense"
              icon={<CreditCardIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Revenues"
              to="/revenue"
              icon={<AttachMoneyIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography color="#11434B" align="left" sx={{ ml: '20px' }}>
              Add
            </Typography>
            <Item
              title="Client"
              to="/clients"
              icon={<PersonIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoice"
              to="/invoice/add"
              icon={<RequestPageIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Expense"
              to="/expense/add"
              icon={<PointOfSaleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Revenue"
              to="/revenue/add"
              icon={<CurrencyExchangeIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default Navbar;
