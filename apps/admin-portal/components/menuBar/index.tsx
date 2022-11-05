import { Context } from '@context/state';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SwapHorizontalCircleOutlinedIcon from '@mui/icons-material/SwapHorizontalCircleOutlined';
import { Box, Button, Typography } from '@mui/material';
import { AppState } from '@store/store';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '../MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { clearStore } from '@store/appSlice';
import { useRouter } from 'next/router';

const MenuBar = () => {
  const [context, setContext] = useContext(Context);
  const user = useSelector((state: AppState) => state.app.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(clearStore());
    router.push('/sign-in');
  };

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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box>
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
            <Box
              sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            >
              <Image
                src="/imgs/ico.png"
                alt="Picture of the author"
                width="50px"
                height="50px"
              />
              <Typography
                sx={{
                  marginLeft: '20px',
                  fontSize: '20px',
                  fontWeight: 500,
                }}
                variant="inherit"
              >
                Thu Mai Library
              </Typography>
            </Box>
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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '20px',
          borderTop: '1px solid #5e35b1',
        }}
      >
        <Typography
          sx={{
            marginLeft: '20px',
            fontSize: '16px',
            fontWeight: 500,
          }}
          variant="inherit"
        >
          {user?.name}
        </Typography>
        <Button onClick={handleLogout} sx={{ color: '#5e35b1' }}>
          <LogoutIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default MenuBar;
