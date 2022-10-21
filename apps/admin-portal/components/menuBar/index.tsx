import { Box } from '@mui/material';
import React from 'react';
import MenuItem from '../menuItem';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import SwapHorizontalCircleOutlinedIcon from '@mui/icons-material/SwapHorizontalCircleOutlined';
import Image from 'next/image';
import Link from 'next/link';

const MenuBar = () => {
  const listItem = [
    {
      href: '/card',
      label: 'LẬP THẺ ĐỘC GIẢ',
      icon: <AddCardOutlinedIcon />,
    },
    {
      href: '/book',
      label: 'NHẬN SÁCH MỚI',
      icon: <AccountBalanceWalletOutlinedIcon />,
    },
    {
      href: '/search',
      label: 'TRA CỨU HỌC SINH',
      icon: <SearchOutlinedIcon />,
    },
    {
      href: '/ticket',
      label: 'LẬP PHIẾU MƯỢN',
      icon: <ContentPasteOutlinedIcon />,
    },
    {
      href: '/exchange',
      label: 'NHẬN TRẢ SÁCH',
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
        width: '300px',
        height: '100vh',
        boxShadow: '5px 10px 10px #ccc',
        marginRight: '30px',
        padding: '30px 20px',
        background: '#fff',
      }}
    >
      <Box
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
      </Box>
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
