import { Box } from '@mui/material';
import React from 'react';
import MenuItem from '../MenuItem';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import SwapHorizontalCircleOutlinedIcon from '@mui/icons-material/SwapHorizontalCircleOutlined';

const MenuBar = () => {
  const listItem = [
    {
      href: '/reader',
      label: 'QUẢN LÝ ĐỘC GIẢ',
      icon: <AddCardOutlinedIcon />,
    },
    {
      href: '/book',
      label: 'QUẢN LÝ SÁCH',
      icon: <AccountBalanceWalletOutlinedIcon />,
    },
    // {
    //   href: '/search',
    //   label: 'TRA CỨU HỌC SINH',
    //   icon: <SearchOutlinedIcon />,
    // },
    // {
    //   href: '/ticket',
    //   label: 'LẬP PHIẾU MƯỢN',
    //   icon: <ContentPasteOutlinedIcon />,
    // },
    {
      href: '/exchange',
      label: 'MƯỢN TRẢ SÁCH',
      icon: <SwapHorizontalCircleOutlinedIcon />,
    },
    {
      href: '/policy',
      label: 'THAY ĐỔI QUY ĐỊNH',
      icon: <SettingsOutlinedIcon />,
    },
  ];
  return (
    <Box
      sx={{
        minWidth: '300px',
        height: '100vh',
        boxShadow: '5px 10px 10px #ccc',
        marginRight: '30px',
        padding: '30px 20px',
        background: '#fff',
      }}
    >
      {/* <Box
        sx={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <Link href="/dashboard">
          <Image
            src="/imgs/ico.png"
            alt="Picture of the author"
            width="150px"
            height="150px"
          />
        </Link>
      </Box> */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {listItem.map((item) => (
          <MenuItem
            key={item.label}
            href={item.href}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </Box>
    </Box>
  );
};

export default MenuBar;
