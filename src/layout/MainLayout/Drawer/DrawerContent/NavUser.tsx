import { useState, MouseEvent } from 'react';

// next
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// material-ui
import { styled, useTheme, Theme } from '@mui/material/styles';
import { Box, IconButton, IconButtonProps, List, ListItem, ListItemText, Menu, MenuItem } from '@mui/material';

// project import

// assets
import { RightOutlined } from '@ant-design/icons';
import useFirebaseAuth from "@Src/hooks/auth/useFirebaseAuth";
import useMenu from "@Src/hooks/store/useMenu";
import useUser from "@Src/hooks/store/useUser";

interface ExpandMoreProps extends IconButtonProps {
  theme: Theme;
  expand: boolean;
  drawerOpen: boolean;
}

const ExpandMore = styled(IconButton, { shouldForwardProp: (prop) => prop !== 'theme' && prop !== 'expand' && prop !== 'drawerOpen' })(
  ({ theme, expand, drawerOpen }: ExpandMoreProps) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(-90deg)',
    marginLeft: 'auto',
    color: theme.palette.secondary.dark,
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    ...(!drawerOpen && {
      opacity: 0,
      width: 50,
      height: 50
    })
  })
);

// ==============================|| LIST - USER ||============================== //

const NavUser = () => {
  const theme = useTheme();

  const {isMainDrawerOpened: drawerOpen} = useMenu();

  const {userInfo} = useUser();
  const router = useRouter();

  const { logout } = useFirebaseAuth();

  const handleLogout = () => {

    logout()
      .then(() => {
        router.push('/login');
      })
      .catch((error) => {
        console.log('logout errors = ', error);
      });

  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ p: 1.25, px: !drawerOpen ? 1.25 : 3, borderTop: `2px solid ${theme.palette.divider}` }}>
      <List disablePadding>
        <ListItem
          disablePadding
          secondaryAction={
            <ExpandMore
              theme={theme}
              expand={open}
              drawerOpen={drawerOpen}
              id="basic-button"
              aria-controls={open ? 'basic-menus' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              aria-label="show more"
            >
              <RightOutlined style={{ fontSize: '0.625rem' }} />
            </ExpandMore>
          }
          sx={{ '& .MuiListItemSecondaryAction-root': { right: !drawerOpen ? -20 : -16 } }}
        >
          {/*<ListItemAvatar>*/}
          {/*  {userInfo && <Avatar alt="Avatar" src={userInfo.avatar} sx={{ ...(drawerOpen && { width: 46, height: 46 }) }} />}*/}
          {/*</ListItemAvatar>*/}
          {/*{userInfo && <ListItemText primary={userInfo.name} secondary="UI/UX Designer" />}*/}
          {userInfo && <ListItemText primary={userInfo.name} />}
        </ListItem>
      </List>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem component={Link} href="#" onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem component={Link} href="#" onClick={handleClose}>
          My account
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default NavUser;
