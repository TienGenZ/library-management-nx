import { Box } from '@mui/material';
import Link from 'next/link';
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
    color: isActive ? '#5e35b1' : '#333',
    fontWeight: isActive ? '600' : '500',
    background: isActive ? '#ede7f6' : 'unset',
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
            padding: '10px',
            margin: '2px 0',
            alignItems: 'center',
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
