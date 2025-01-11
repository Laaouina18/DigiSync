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
  useMediaQuery
} from '@mui/material';
import Clients from "../components/Clients";
import Factures from "../components/Factures";
import Sidebar from "../components/Sidebar";
import { fetchAPPs } from "../redux/actions/AppActions";
import { Payement, FetchPayement } from "../redux/actions/PayementActions";

// Logo component from previous dashboard
const SyndicLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 80" style={{ width: '200px', height: 'auto' }}>
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

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  
  // Alert states
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  
  // Payment confirmation dialog
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    dispatch(fetchAPPs());
    dispatch(FetchPayement());
  }, [dispatch]);

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
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      bgcolor: 'background.default'
    }}>
      <Container maxWidth={false} sx={{ py: 2 }}>
        {/* Logo Header */}
        <Box sx={{ 
          mb: 3, 
          p: 2, 
          display: 'flex', 
          justifyContent: isMobile ? 'center' : 'flex-start',
          boxShadow: 1,
          borderRadius: 1,
          bgcolor: 'white'
        }}>
          <SyndicLogo />
        </Box>

        {/* Main Content */}
        <Grid container spacing={3}>
          {/* Sidebar */}
		  <Grid item xs={12} md={3} lg={2}>
  <Sidebar />
</Grid>
          
          {/* Main Content Area */}
          <Grid item xs={12} md={9} lg={10}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Clients date={date} payer={payer} />
              <Factures />
            </Box>
          </Grid>
        </Grid>

        {/* Payment Confirmation Dialog */}
        <Dialog
          open={paymentDialogOpen}
          onClose={() => setPaymentDialogOpen(false)}
          aria-labelledby="payment-dialog-title"
        >
          <DialogTitle id="payment-dialog-title">
            Confirmer le paiement
          </DialogTitle>
          <DialogContent>
            <Typography>
              Voulez-vous confirmer le paiement pour cet appartement ?
            </Typography>
            {selectedPayment && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Client: {selectedPayment.app.client}<br />
                Montant: {selectedPayment.app.prix} DH<br />
                Période: {selectedPayment.date.month}/{selectedPayment.date.year}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => setPaymentDialogOpen(false)}
              color="primary"
            >
              Annuler
            </Button>
            <Button 
              onClick={handlePaymentConfirm} 
              color="success" 
              variant="contained"
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
            sx={{ width: '100%' }}
            elevation={6}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Dashboard;