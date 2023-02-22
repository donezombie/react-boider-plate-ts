import * as React from 'react';
import { Suspense } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CommonStyles from 'components/CommonStyles';
import AsideMenu from './nav';
import CommonIcons from 'components/CommonIcons';
import { NavLink } from 'react-router-dom';

const drawerWidth = 220;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
);

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  //! State
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  //! Function
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //! Render
  const renderAppBar = () => {
    return (
      <Typography variant='h6' noWrap component='div'>
        Custom header here
      </Typography>
    );
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position='fixed' open={open}>
        <Toolbar>
          <CommonStyles.Button
            isIconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <CommonIcons.MenuIcon />
          </CommonStyles.Button>

          {renderAppBar()}
        </Toolbar>
      </AppBar>

      <Drawer variant='permanent' open={open}>
        <DrawerHeader>
          <CommonStyles.Button isIconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <CommonIcons.RightIcon /> : <CommonIcons.LeftIcon />}
          </CommonStyles.Button>
        </DrawerHeader>

        <Divider />

        {AsideMenu.map((eachList, idxEachList) => {
          return (
            <React.Fragment key={`${idxEachList}`}>
              <List key={`${idxEachList}`}>
                {eachList.map((menu, index) => {
                  return (
                    <NavLink
                      key={menu.label}
                      to={menu.href}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                          sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : 'auto',
                              justifyContent: 'center',
                            }}
                          >
                            <menu.icon />
                          </ListItemIcon>
                          <ListItemText primary={menu.label} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                      </ListItem>
                    </NavLink>
                  );
                })}
              </List>
              {idxEachList !== AsideMenu.length - 1 && <Divider />}
            </React.Fragment>
          );
        })}
      </Drawer>

      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Suspense fallback={<CommonStyles.Loading />}>{children}</Suspense>
      </Box>
    </Box>
  );
};

export default React.memo(DefaultLayout);
