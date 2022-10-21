import { Box, Typography } from '@mui/material';
import React from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
interface ItemProps {
  href: string;
  label: string;
  icon: JSX.Element;
}
const MenuItem = (props: ItemProps) => {
  const router = useRouter();
  const isActive = router.asPath.split('?')[0].includes(props.href);
  const activeStyle = {
    color: isActive ? '#333' : '#8993af',
    fontWeight: isActive ? '500' : '400',
    // background: isActive ? 'rgb(90, 34, 139)' : 'unset',
  };
  return (
    <Box>
      <Link href={props.href}>
        <Box
          sx={{
            ...activeStyle,
            cursor: 'pointer',
            display: 'flex',
            fontSize: '14px',
            borderRadius: '5px',
            padding: '5px',
            margin: '2px 0',
          }}
        >
          <Box
            sx={{
              marginRight: '20px',
            }}
          >
            {props.icon}
          </Box>
          {props.label}
        </Box>
      </Link>
    </Box>
  );
};

export default MenuItem;
