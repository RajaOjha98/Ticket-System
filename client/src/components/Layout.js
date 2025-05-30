import React, { useState, useContext } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  ConfirmationNumber as TicketIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  Add as AddIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';
import AuthContext from '../context/AuthContext';
import LogoIcon from '../assets/logo-icon.svg';

const drawerWidth = 240;

function Layout() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileMenu, setProfileMenu] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileMenu(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenu(null);
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    logout();
  };

  const handleProfileClick = () => {
    handleProfileMenuClose();
    navigate('/profile');
  };

  const drawer = (
    <div>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2 }}>
        <img 
          src={LogoIcon} 
          alt="DeskFlow" 
          style={{ width: 32, height: 32 }}
        />
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600, color: '#2196F3' }}>
          DeskFlow
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {/* All users can see tickets */}
        <ListItem disablePadding>
          <ListItemButton 
            component={Link} 
            to="/tickets"
            selected={location.pathname === '/tickets'}
          >
            <ListItemIcon>
              <TicketIcon />
            </ListItemIcon>
            <ListItemText primary="Tickets" />
          </ListItemButton>
        </ListItem>
        
        <ListItem disablePadding>
          <ListItemButton 
            component={Link} 
            to="/tickets/new"
            selected={location.pathname === '/tickets/new'}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="New Ticket" />
          </ListItemButton>
        </ListItem>

        {/* Only admin and agents can see customers */}
        {user && (user.role === 'admin' || user.role === 'agent') && (
          <ListItem disablePadding>
            <ListItemButton 
              component={Link} 
              to="/customers"
              selected={location.pathname === '/customers'}
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Customers" />
            </ListItemButton>
          </ListItem>
        )}

        {/* Only admin can see dashboard */}
        {user && user.role === 'admin' && (
          <ListItem disablePadding>
            <ListItemButton 
              component={Link} 
              to="/dashboard"
              selected={location.pathname === '/dashboard'}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {location.pathname === '/tickets' && 'Tickets'}
            {location.pathname === '/tickets/new' && 'Create New Ticket'}
            {location.pathname.startsWith('/tickets/') && location.pathname !== '/tickets/new' && 'Ticket Details'}
            {location.pathname === '/customers' && 'Customers'}
            {location.pathname === '/dashboard' && 'Dashboard'}
            {location.pathname === '/profile' && 'My Profile'}
          </Typography>
          {user && (
            <>
              <Button 
                color="inherit" 
                onClick={handleProfileMenuOpen}
                startIcon={
                  <Avatar 
                    sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                }
              >
                {user.name}
              </Button>
              <Menu
                anchorEl={profileMenu}
                open={Boolean(profileMenu)}
                onClose={handleProfileMenuClose}
              >
                <MenuItem onClick={handleProfileClick}>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout; 