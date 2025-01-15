import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  IconButton,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  alpha,
  TextField,
  InputAdornment,
  Chip,
  Divider,
  Stack,
  Fade,
  LinearProgress,
  Alert
} from '@mui/material';
import {
  Payment as PaymentIcon,
  AccountBalance,
  AttachMoney,
  TrendingUp,
  Add,
  Search,
  Person,
  Phone,
  Email,
  Schedule,
  Warning,
  Delete,
  Edit,
  Visibility
} from '@mui/icons-material';
import axios from '../api/Axios';
import { PaymentDialog, PaymentFilterForm, PaymentReceiptDialog } from "./dialogs/PaymentDialog.jsx";

const PaymentDashboard = () => {
  const theme = useTheme();
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [payments, setPayments] = useState([]);
  const [charges, setCharges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    searchQuery: ''
  });
  const [summary, setSummary] = useState({
    totalRecu: 0,
    totalCharges: 0,
    chargesImpayees: 0,
    benefice: 0,
    nombrePaiements: 0,
    nombreCharges: 0
  });

  // Chargement initial
  useEffect(() => {
    loadInitialData();
  }, []);
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setToken(userData.token);
      setUserId(userData.user.id);
    }
  }, []);


  // Effet pour les filtres de date
  useEffect(() => {
    if (filters.startDate && filters.endDate) {
      fetchPaymentsByPeriod();
    }
  }, [filters.startDate, filters.endDate]);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchPayments(),
        fetchSummary(),
        fetchCharges()
      ]);
    } catch (error) {
      setError("Erreur lors du chargement des données");
    } finally {
      setLoading(false);
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await axios.get('/payement', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setPayments(response.data);
    } catch (error) {
      throw new Error('Erreur lors du chargement des paiements');
    }
  };

  const fetchPaymentsByPeriod = async () => {
    try {
      const response = await axios.get('/payement/period', {
        params: {
          startDate: filters.startDate,
          endDate: filters.endDate
        }
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setPayments(response.data.payments);
    } catch (error) {
      setError('Erreur lors du chargement des paiements par période');
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await axios.get('/payement/summary', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setSummary(response.data);
    } catch (error) {
      throw new Error('Erreur lors du chargement du résumé');
    }
  };

  const fetchCharges = async () => {
    try {
      const response = await axios.get('/syndic/charges', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setCharges(response.data);
    } catch (error) {
      console.log(error)
      throw new Error('Erreur lors du chargement des charges');
     
    }
  };

  const handlePaymentSubmit = async (paymentData) => {
    setLoading(true);
    try {
      await axios.post('/payement', paymentData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      await loadInitialData();
      setOpenPaymentDialog(false);
    } catch (error) {
      setError("Erreur lors de l'enregistrement du paiement");
    } finally {
      setLoading(false);
    }
  };
  // Chargement initial des données
  useEffect(() => {
    loadInitialData();
  }, [token]);

  // Effet pour la recherche avec debounce
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [filters.searchQuery]);


  // Gestionnaires d'événements
  const handleSearch = () => {
    const searchLower = filters.searchQuery.toLowerCase();
    return payments.filter(payment => 
      payment.client.nom.toLowerCase().includes(searchLower) ||
      payment.client.prenom.toLowerCase().includes(searchLower) ||
      payment.client.email.toLowerCase().includes(searchLower) ||
      payment.charge.type.toLowerCase().includes(searchLower)
    );
  };


  const handlePaymentDelete = async (paymentId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce paiement ?')) {
      setLoading(true);
      try {
        await axios.delete(`/payement/${paymentId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        await loadInitialData();
      } catch (error) {
        setError("Erreur lors de la suppression du paiement");
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePaymentEdit = async (paymentId, updatedData) => {
    setLoading(true);
    try {
      await axios.put(`/payement/${paymentId}`, updatedData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      await loadInitialData();
    } catch (error) {
      setError("Erreur lors de la modification du paiement");
    } finally {
      setLoading(false);
    }
  };

  // Composant StatCard
  const StatCard = ({ icon: Icon, title, value, color, subtitle }) => (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        background: alpha(color, 0.05),
        border: `1px solid ${alpha(color, 0.1)}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: theme.shadows[4],
          border: `1px solid ${alpha(color, 0.2)}`
        }
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            sx={{
              bgcolor: alpha(color, 0.1),
              color: color,
              width: 48,
              height: 48
            }}
          >
            <Icon />
          </Avatar>
          <Box>
            <Typography color="textSecondary" variant="body2" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {typeof value === 'number' ? value.toLocaleString() + ' DH' : value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="textSecondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  // Composant PaymentCard
  const PaymentCard = ({ payment, onView, onEdit, onDelete }) => (
    <Fade in={true}>
      <Card
        elevation={2}
        sx={{
          height: '100%',
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: theme.shadows[8],
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
          }
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Avatar
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main
              }}
            >
              <Person />
            </Avatar>
            <Box flex={1}>
              <Typography variant="h6" fontWeight="bold">
                {payment.client.nom} {payment.client.prenom}
              </Typography>
              <Chip
                icon={<Email fontSize="small" />}
                label={payment.client.email}
                size="small"
                variant="outlined"
                color="primary"
              />
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Stack spacing={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <Phone color="action" fontSize="small" />
              <Typography variant="body2">{payment.client.telephone}</Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <Schedule color="action" fontSize="small" />
              <Typography variant="body2">
                Date: {new Date(payment.datePayment).toLocaleDateString()}
              </Typography>
            </Box>
          </Stack>

          <Box
            sx={{
              bgcolor: alpha(theme.palette.success.main, 0.05),
              p: 2,
              borderRadius: 2,
              mt: 2
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <AttachMoney color="success" />
              <Typography variant="h5" color="success.main" fontWeight="bold">
                {payment.charge.montant.toLocaleString()} DH
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Type: {payment.charge.type}
            </Typography>
          </Box>

          <Box display="flex" gap={1} justifyContent="flex-end" mt={2}>
            <IconButton
              size="small"
              onClick={onView}
              sx={{ 
                bgcolor: alpha(theme.palette.info.main, 0.1),
                color: theme.palette.info.main
              }}
            >
              <Visibility fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={onEdit}
              sx={{ 
                bgcolor: alpha(theme.palette.warning.main, 0.1),
                color: theme.palette.warning.main
              }}
            >
              <Edit fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={onDelete}
              sx={{ 
                bgcolor: alpha(theme.palette.error.main, 0.1),
                color: theme.palette.error.main
              }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );

  return (
    <Container maxWidth="lg">
      {loading && <LinearProgress />}
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      
      <Box sx={{ py: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
            color: 'white',
            borderRadius: 3
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Gestion des Paiements
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Suivi et gestion des paiements des charges
          </Typography>
        </Paper>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={3}>
            <StatCard
              icon={AttachMoney}
              title="Total Reçu"
              value={summary.totalRecu}
              color={theme.palette.primary.main}
              subtitle="Montant total reçu"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatCard
              icon={AccountBalance}
              title="Total Charges"
              value={summary.totalCharges}
              color={theme.palette.success.main}
              subtitle="Montant total des charges"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatCard
              icon={Warning}
              title="Charges Impayées"
              value={summary.chargesImpayees}
              color={theme.palette.warning.main}
              subtitle="Montant restant à payer"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatCard
              icon={TrendingUp}
              title="Bénéfice"
              value={summary.benefice}
              color={theme.palette.info.main}
              subtitle="Bénéfice total"
            />
          </Grid>
        </Grid>

        <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <PaymentFilterForm 
                filters={filters}
                setFilters={setFilters}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<Add />}
                onClick={() => setOpenPaymentDialog(true)}
                sx={{ py: 2 }}
              >
                Nouveau Paiement
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={3}>
          {handleSearch().map((payment) => (
            <Grid item xs={12} md={4} key={payment._id}>
              <PaymentCard
                payment={payment}
                onView={() => setSelectedPayment(payment)}
                onEdit={() => handlePaymentEdit(payment._id)}
                onDelete={() => handlePaymentDelete(payment._id)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Dialogs */}
      <PaymentDialog
        open={openPaymentDialog}
        onClose={() => setOpenPaymentDialog(false)}
        onSubmit={handlePaymentSubmit}
        charges={charges}
      />
{/* 
      <PaymentReceiptDialog
        open={!!paymentForReceipt}
        onClose={() => setPaymentForReceipt(null)}
        payment={paymentForReceipt}
      /> */}

      <Dialog
        open={Boolean(selectedPayment)}
        onClose={() => setSelectedPayment(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
          Détails du Paiement
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {selectedPayment && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Informations Client
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography color="textSecondary">Nom Complet</Typography>
                    <Typography variant="h6">
                      {selectedPayment.client.nom} {selectedPayment.client.prenom}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography color="textSecondary">Email</Typography>
                    <Typography>{selectedPayment.client.email}</Typography>
                  </Box>
                  <Box>
                    <Typography color="textSecondary">Téléphone</Typography>
                    <Typography>{selectedPayment.client.telephone}</Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Détails du Paiement
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography color="textSecondary">Montant</Typography>
                    <Typography variant="h4" color="primary">
                      {selectedPayment.charge.montant.toLocaleString()} DH
                    </Typography>
                  </Box>
                  <Box>
                    <Typography color="textSecondary">Date</Typography>
                    <Typography>
                      {new Date(selectedPayment.datePayment).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography color="textSecondary">Type de Charge</Typography>
                    <Chip label={selectedPayment.charge.type} color="primary" />
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedPayment(null)}>Fermer</Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => {
              setPaymentForReceipt(selectedPayment);
              setSelectedPayment(null);
            }}
          >
            Générer Reçu
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PaymentDashboard;