import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Avatar,
  Divider,
  Menu,
  MenuItem,
  useTheme,
  alpha,
  Button
} from '@mui/material';
import {
  Building,
  Home,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Menu as MenuIcon,
  LogOut,
  User,
  Settings,
  Bell,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import DashboardImmeuble from '../components/DashboardImmeuble';
import DashboardAppartement from '../components/DashboardAppartement';
import DashboardCharges from '../components/DashboardCharges';
import PaymentDashboard from '../components/PayementDasboard';
import { useAuth } from './hooks/useAuth';
import { useNavigate } from 'react-router-dom';
const DRAWER_WIDTH = 280;

const MainDashboard = () => {
  const theme = useTheme();

  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const {  user, logout } = useAuth();
  const [currentTab, setCurrentTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileMenu, setProfileMenu] = useState(null);
  const [notificationMenu, setNotificationMenu] = useState(null);
const navigate=useNavigate();
  const handleTabChange = (newValue) => {
    setCurrentTab(newValue);
    setMobileOpen(false);
  };
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setToken(userData.token);
      setUserId(userData.user.id);
    }else{
      navigate('/login')
    }
  }, []);
  const handleDrawerToggle = () => {
    if (window.innerWidth < 1200) {
      setMobileOpen(!mobileOpen);
    } else {
      setDrawerOpen(!drawerOpen);
    }
  };

  const menuItems = [
    { icon: <Building size={20} />, text: 'Immeubles', index: 0 },
    { icon: <Home size={20} />, text: 'Appartements', index: 1 },
    { icon: <CreditCard size={20} />, text: 'Charges', index: 2 },
    { icon: <CreditCard size={20} />, text: 'Payement', index: 3 }
  ];

  const renderContent = () => {
    switch (currentTab) {
      case 0:
        return <DashboardImmeuble />;
      case 1:
        return <DashboardAppartement />;
      case 2:
        return <DashboardCharges />;
      case 3:
        return <PaymentDashboard />;
      default:
        return null;
    }
  };

  const drawer = (
    <>
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Building size={32} color={theme.palette.primary.main} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              SyndicPro
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerToggle}>
            {drawerOpen ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Box>

        <Divider />

        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="contained"
            // startIcon={<Plus size={16} />}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              py: 1
            }}
          >
            Nouveau
          </Button>
        </Box>

        <List sx={{ flexGrow: 1, px: 2 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => handleTabChange(item.index)}
                selected={currentTab === item.index}
                sx={{
                  borderRadius: '8px',
                  '&.Mui-selected': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.15),
                    }
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 1,
              borderRadius: '8px',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.05)
              }
            }}
            onClick={(e) => setProfileMenu(e.currentTarget)}
          >
            <Avatar 
              src={user?.avatar} 
              alt={user?.name}
              sx={{ width: 40, height: 40 }}
            >
              {user?.name?.charAt(0)}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                {user?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
            <ChevronDown size={20} />
          </Box>
        </Box>
      </Box>

      <Menu
        anchorEl={profileMenu}
        open={Boolean(profileMenu)}
        onClose={() => setProfileMenu(null)}
        PaperProps={{
          sx: { width: 220, mt: 1 }
        }}
      >
        <MenuItem onClick={() => navigate('/profile')}>
          <ListItemIcon>
            <User size={20} />
          </ListItemIcon>
          <ListItemText primary="Mon profil" />
        </MenuItem>
        <MenuItem onClick={() => setProfileMenu(null)}>
          <ListItemIcon>
            <Settings size={20} />
          </ListItemIcon>
          <ListItemText primary="Paramètres" />
        </MenuItem>
        <Divider />
        <MenuItem 
          onClick={() => {
            localStorage.clear();
            navigate('/login')

          }}
          sx={{ color: theme.palette.error.main }}
        >
          <ListItemIcon sx={{ color: 'inherit' }}>
            <LogOut size={20} />
          </ListItemIcon>
          <ListItemText primary="Déconnexion" />
        </MenuItem>
      </Menu>
    </>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          display: { xs: 'none', lg: 'block' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            borderRight: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
            boxShadow: 'none'
          }
        }}
        open={drawerOpen}
      >
        {drawer}
      </Drawer>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{
          keepMounted: true // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            backgroundColor: theme.palette.background.paper
          }
        }}
      >
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          backgroundColor: alpha(theme.palette.primary.main, 0.02)
        }}
      >
        {/* Top Bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper
          }}
        >
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={(e) => setNotificationMenu(e.currentTarget)}
              sx={{ 
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) }
              }}
            >
              <Bell size={20} />
            </IconButton>

            <IconButton
              sx={{ 
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) }
              }}
            >
              <HelpCircle size={20} />
            </IconButton>
          </Box>
        </Box>

        {/* Page Content */}
        <Box sx={{ p: 3 }}>
          {renderContent()}
        </Box>
      </Box>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationMenu}
        open={Boolean(notificationMenu)}
        onClose={() => setNotificationMenu(null)}
        PaperProps={{
          sx: { width: 320, maxHeight: 480, mt: 1 }
        }}
      >
        <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Notifications
          </Typography>
        </Box>
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Aucune notification
          </Typography>
        </Box>
      </Menu>
    </Box>
  );
};

export default MainDashboard;