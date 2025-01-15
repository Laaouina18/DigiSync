import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Container,
  Grid,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Paper,
  Divider,
  IconButton,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon
} from '@mui/icons-material';
import Clients from "../components/Clients";
import Factures from "../components/Factures";
import Sidebar from "../components/Sidebar";
import { fetchAPPs } from "../redux/actions/AppActions";
import { Payement, FetchPayement } from "../redux/actions/PayementActions";

// Enhanced Logo component
const SyndicLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 80" style={{ width: '160px', height: 'auto' }}>
    <rect x="0" y="10" width="300" height="60" rx="8" fill="#ffffff"/>
    <g transform="translate(20, 20)">
      <path d="M0 40 L20 0 L40 40 Z" fill="#2196F3"/>
      <rect x="8" y="15" width="6" height="6" fill="white"/>
      <rect x="26" y="15" width="6" height="6" fill="white"/>
      <rect x="17" y="25" width="6" height="15" fill="white"/>
    </g>
    <text x="70" y="50" fontFamily="Arial" fontWeight="bold" fontSize="28" fill="#1976D2">
      Syndic
      <tspan fill="#424242">Pro</tspan>
    </text>
    <g transform="translate(220, 30)">
      <rect x="0" y="0" width="4" height="20" fill="#2196F3"/>
      <rect x="8" y="5" width="4" height="15" fill="#64B5F6"/>
      <rect x="16" y="10" width="4" height="10" fill="#90CAF9"/>
    </g>
    <text x="70" y="65" fontFamily="Arial" fontSize="12" fill="#757575">
      Gestion immobilière intelligente
    </text>
  </svg>
);

const DRAWER_WIDTH = 240;

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    dispatch(fetchAPPs());
    dispatch(FetchPayement());
  }, [dispatch]);

  useEffect(() => {
    setDrawerOpen(!isMobile);
  }, [isMobile]);

  const currentDate = new Date();
  const date = {
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear()
  };

  const showAlert = (message, severity = "success") => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handlePaymentConfirm = () => {
    const { date: paymentDate, app } = selectedPayment;
    const { _id, client, address, prix, numero, etage, immeuble } = app;
    
    dispatch(Payement(paymentDate, {
      _id,
      client,
      address,
      prix,
      numero,
      etage,
      immeuble
    }));
    
    setPaymentDialogOpen(false);
    showAlert("Paiement effectué avec succès");
  };

  const payer = (date, app) => {
    setSelectedPayment({ date, app });
    setPaymentDialogOpen(true);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setDrawerOpen(!drawerOpen)}
              sx={{ mr: 2, display: isMobile ? 'block' : 'none' }}
            >
              <MenuIcon />
            </IconButton>
            <SyndicLogo />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit">
              <SettingsIcon />
            </IconButton>
            <IconButton color="inherit">
              <PersonIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            bgcolor: 'background.default',
            borderRight: '1px solid',
            borderColor: 'divider'
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', mt: 2 }}>
          <Sidebar />
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
          pt: { xs: 8, sm: 10 }
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                bgcolor: 'primary.light',
                color: 'primary.contrastText',
                borderRadius: 2
              }}
            >
              <Typography variant="h5" component="h1" gutterBottom>
                Tableau de Bord
              </Typography>
              <Typography variant="subtitle1">
                {`${currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`}
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: 'background.paper'
              }}
            >
              <Typography variant="h6" gutterBottom>
                Gestion des Clients
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Clients date={date} payer={payer} />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: 'background.paper'
              }}
            >
              <Typography variant="h6" gutterBottom>
                Factures
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Factures />
            </Paper>
          </Grid>
        </Grid>

        {/* Payment Dialog */}
        <Dialog
          open={paymentDialogOpen}
          onClose={() => setPaymentDialogOpen(false)}
          PaperProps={{
            sx: {
              borderRadius: 2,
              maxWidth: 'sm',
              width: '100%'
            }
          }}
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Typography variant="h6">
              Confirmer le paiement
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ py: 2 }}>
              <Typography variant="body1" gutterBottom>
                Voulez-vous confirmer le paiement pour cet appartement ?
              </Typography>
              {selectedPayment && (
                <Paper
                  variant="outlined"
                  sx={{ p: 2, mt: 2, bgcolor: 'background.default' }}
                >
                  <Typography variant="body2" color="text.secondary">
                    <Box component="span" sx={{ display: 'block', mb: 1 }}>
                      <strong>Client:</strong> {selectedPayment.app.client}
                    </Box>
                    <Box component="span" sx={{ display: 'block', mb: 1 }}>
                      <strong>Montant:</strong> {selectedPayment.app.prix} DH
                    </Box>
                    <Box component="span" sx={{ display: 'block' }}>
                      <strong>Période:</strong> {selectedPayment.date.month}/{selectedPayment.date.year}
                    </Box>
                  </Typography>
                </Paper>
              )}
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button
              onClick={() => setPaymentDialogOpen(false)}
              variant="outlined"
              color="inherit"
            >
              Annuler
            </Button>
            <Button
              onClick={handlePaymentConfirm}
              variant="contained"
              color="success"
              autoFocus
            >
              Confirmer le paiement
            </Button>
          </DialogActions>
        </Dialog>

        {/* Alert Snackbar */}
        <Snackbar
          open={alertOpen}
          autoHideDuration={6000}
          onClose={() => setAlertOpen(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={() => setAlertOpen(false)}
            severity={alertSeverity}
            variant="filled"
            sx={{
              width: '100%',
              boxShadow: theme.shadows[6]
            }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Dashboard;