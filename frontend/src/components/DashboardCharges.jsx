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
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  alpha,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
  LinearProgress,
  Divider,
  TextField,
  InputAdornment,
  Stack,
  Fade
} from '@mui/material';
import {
  Apartment,
  AccountBalance,
  Schedule,
  Add,
  Visibility,
  Edit,
  Delete,
  AttachMoney,
  Repeat,
  Warning,
  Business,
  TrendingUp,
  CalendarMonth,
  Description,
  LocalAtm,
  Category,
  Info,
  Dashboard,
  LibraryBooks,
  Assessment,
  NotificationsActive,
  Search,
  FilterList,
  EuroSymbol,
  DateRange
} from '@mui/icons-material';
import { ChargeDialog } from './dialogs/ChargeDialog';
import axios from '../api/Axios';

const DashboardCharges = () => {
  const theme = useTheme();
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [charges, setCharges] = useState([]);
  const [immeubles, setImmeubles] = useState([]);
  const [openChargeDialog, setOpenChargeDialog] = useState(false);
  const [selectedCharge, setSelectedCharge] = useState(null);
  const [detailDialog, setDetailDialog] = useState({ open: false, charge: null });
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [selectedImmeuble, setSelectedImmeuble] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [chargeForm, setChargeForm] = useState({
    type: '',
    montant: '',
    description: '',
    dateEcheance: '',
    periodicite: 'MENSUEL',
    immeuble: ''
  });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setToken(userData.token);
      setUserId(userData.user.id);
    }
  }, []);

  useEffect(() => {
    if (token) {
   
      fetchImmeubles();
    }
  }, [token,userId]);


  const fetchImmeubles = async () => {
    try {
      const response = await axios.get('/Syndic/immeubles', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
  
      const immeubles = response.data;
  
      // Extraire les charges de chaque immeuble
      const allCharges = immeubles.reduce((acc, immeuble) => {
        if (immeuble.charges) {
          return [...acc, ...immeuble.charges];
        }
        return acc;
      }, []);
  
      // Mettre à jour les états
      setImmeubles(immeubles);
      setCharges(allCharges); // Supposons que setCharges est défini pour gérer les charges
    } catch (error) {
      showAlert('Erreur lors du chargement des immeubles', 'error');
    }
  };
  

  const handleCreateCharge = async () => {
    try {
      const response = await axios.post('/Syndic/charges', chargeForm, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data) {
        showAlert('Charge créée avec succès');
        fetchImmeubles ();
        setOpenChargeDialog(false);
        resetChargeForm();
      }
    } catch (error) {
      showAlert('Erreur lors de la création de la charge', 'error');
    }
  };

  const handleUpdateCharge = async () => {
    try {
      const response = await axios.put(`/Syndic/charges/${selectedCharge._id}`, chargeForm, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data) {
        showAlert('Charge modifiée avec succès');
        fetchImmeubles ();
        setOpenChargeDialog(false);
        resetChargeForm();
      }
    } catch (error) {
      showAlert('Erreur lors de la modification de la charge', 'error');
    }
  };

  const handleDeleteCharge = async (id) => {
    try {
      await axios.delete(`/Syndic/charges/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchImmeubles ();
      showAlert('Charge supprimée avec succès');
    } catch (error) {
      showAlert('Erreur lors de la suppression', 'error');
    }
  };

  const resetChargeForm = () => {
    setChargeForm({
      type: '',
      montant: '',
      description: '',
      dateEcheance: '',
      periodicite: 'MENSUEL',
      immeuble: ''
    });
    setSelectedCharge(null);
  };

  const showAlert = (message, severity = 'success') => {
    setAlert({ open: true, message, severity });
  };

  const getStatusColor = (dateEcheance) => {
    const today = new Date();
    const echeance = new Date(dateEcheance);
    const diffDays = Math.ceil((echeance - today) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return theme.palette.error.main;
    if (diffDays <= 7) return theme.palette.warning.main;
    if (diffDays <= 30) return theme.palette.info.main;
    return theme.palette.success.main;
  };

  const getPeriodiciteIcon = (periodicite) => {
    switch (periodicite) {
      case 'MENSUEL':
        return <CalendarMonth />;
      case 'TRIMESTRIEL':
        return <Assessment />;
      case 'ANNUEL':
        return <LibraryBooks />;
      default:
        return <Repeat />;
    }
  };

  // Filtrage et recherche des charges
  const filteredCharges = charges
    .filter(charge => 
      selectedImmeuble === 'all' || charge.immeuble?._id === selectedImmeuble
    )
    .filter(charge => {
      const searchLower = searchQuery.toLowerCase();
      return (
        charge.type.toLowerCase().includes(searchLower) ||
        charge.description?.toLowerCase().includes(searchLower) ||
        charge?.immeuble?.nom?.toLowerCase().includes(searchLower) ||
        charge.montant?.toString().includes(searchLower) ||
        charge?.periodicite.toLowerCase().includes(searchLower)
      );
    });

  // Calculer les statistiques basées sur les charges filtrées
  const stats = {
    totalCharges: filteredCharges.reduce((sum, charge) => sum + Number(charge.montant), 0),
    totalBuildings: immeubles.length,
    pendingCharges: filteredCharges.filter(charge => new Date(charge.dateEcheance) > new Date()).length,
    overdueCharges: filteredCharges.filter(charge => new Date(charge.dateEcheance) < new Date()).length
  };

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
              {value}
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

  const ChargeCard = ({ charge }) => (
    <Fade in={true}>
      <Card
        elevation={2}
        sx={{
          height: '100%',
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'visible',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: theme.shadows[8],
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
          }
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -15,
            right: 16,
            bgcolor: getStatusColor(charge.dateEcheance),
            color: 'white',
            borderRadius: '50%',
            width: 30,
            height: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: theme.shadows[3]
          }}
        >
          <NotificationsActive fontSize="small" />
        </Box>

        <CardContent>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Avatar
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main
              }}
            >
              <Category />
            </Avatar>
            <Box flex={1}>
              <Typography variant="h6" fontWeight="bold">
                {charge.type}
              </Typography>
              <Tooltip title="Immeuble">
                <Chip
                  icon={<Apartment />}
                  label={charge.immeuble?.nom}
                  size="small"
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 0.5 }}
                />
              </Tooltip>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Description fontSize="small" color="action" />
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                minHeight: 40
              }}
            >
              {charge.description}
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            sx={{
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              p: 1.5,
              borderRadius: 2
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <LocalAtm color="primary" />
              <Typography variant="h5" fontWeight="bold" color="primary.main">
                {Number(charge.montant).toLocaleString()} DH
              </Typography>
            </Box>
            <Tooltip title={`Périodicité: ${charge.periodicite}`}>
              <Chip
                icon={getPeriodiciteIcon(charge.periodicite)}
                label={charge.periodicite}
                size="small"
                color={
                  charge.periodicite === 'MENSUEL' ? 'primary' :
                  charge.periodicite === 'TRIMESTRIEL' ? 'secondary' :
                  'success'
                }
              />
            </Tooltip>
          </Box>

          <Box
            sx={{
              bgcolor: alpha(getStatusColor(charge.dateEcheance), 0.05),
              p: 1.5,
              borderRadius: 2,
              mb: 2
            }}
          >
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Schedule fontSize="small" color="action" />
              <Typography variant="body2">
                Échéance: {new Date(charge.dateEcheance).toLocaleDateString()}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={Math.min(
                (new Date(charge.dateEcheance) - new Date()) / (1000 * 60 * 60 * 24 * 30) * 100,
                100
              )}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: alpha(getStatusColor(charge.dateEcheance), 0.1),
                '& .MuiLinearProgress-bar': {
                  bgcolor: getStatusColor(charge.dateEcheance)
                }
              }}
            />
          </Box>

          <Box display="flex" gap={1} justifyContent="flex-end">
            <Tooltip title="Voir les détails">
              <IconButton
                size="small"
                onClick={() => setDetailDialog({ open: true, charge })}
                sx={{ 
                  bgcolor: alpha(theme.palette.info.main, 0.1),
                  color: theme.palette.info.main,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.info.main, 0.2)
                  }
                }}
              >
                <Visibility fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Modifier">
              <IconButton
                size="small"
                onClick={() => {
                  setSelectedCharge(charge);
                  setChargeForm(charge);
                  setOpenChargeDialog(true);
                }}
                sx={{ 
                  bgcolor: alpha(theme.palette.warning.main, 0.1),
                  color: theme.palette.warning.main,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.warning.main, 0.2)
                  }
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Supprimer">
              <IconButton
                size="small"
                onClick={() => handleDeleteCharge(charge._id)}
                sx={{ 
                  bgcolor: alpha(theme.palette.error.main, 0.1),
                  color: theme.palette.error.main,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.error.main, 0.2)}
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </CardContent>
        </Card>
      </Fade>
    );
  
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          {/* Header avec gradient */}
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
              Gestion des Charges
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Tableau de bord de gestion des charges immobilières
            </Typography>
          </Paper>
  
          {/* Stats */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={3}>
              <StatCard
                icon={AttachMoney}
                title="Total des Charges"
                value={`${stats.totalCharges.toLocaleString()} DH`}
                color={theme.palette.primary.main}
                subtitle="Montant total des charges"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <StatCard
                icon={Business}
                title="Immeubles"
                value={stats.totalBuildings}
                color={theme.palette.success.main}
                subtitle="Nombre total d'immeubles"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <StatCard
                icon={Warning}
                title="Charges en Attente"
                value={stats.pendingCharges}
                color={theme.palette.warning.main}
                subtitle="Charges à venir"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <StatCard
                icon={DateRange}
                title="Charges en Retard"
                value={stats.overdueCharges}
                color={theme.palette.error.main}
                subtitle="Échéances dépassées"
              />
            </Grid>
          </Grid>
  
          {/* Filtres et Recherche */}
          <Paper 
            sx={{ 
              p: 3, 
              mb: 3, 
              borderRadius: 3,
              background: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: 'blur(10px)'
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Rechercher une charge..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    )
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: 'background.paper'
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Filtrer par Immeuble</InputLabel>
                  <Select
                    value={selectedImmeuble}
                    onChange={(e) => setSelectedImmeuble(e.target.value)}
                    label="Filtrer par Immeuble"
                    startAdornment={
                      <InputAdornment position="start">
                        <FilterList />
                      </InputAdornment>
                    }
                    sx={{
                      borderRadius: 2,
                      bgcolor: 'background.paper'
                    }}
                  >
                    <MenuItem value="all">Tous les immeubles</MenuItem>
                    {immeubles.map((immeuble) => (
                      <MenuItem key={immeuble._id} value={immeuble._id}>
                        {immeuble.nom}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => setOpenChargeDialog(true)}
                  sx={{
                    borderRadius: 2,
                    py: 2,
                    bgcolor: theme.palette.primary.main,
                    '&:hover': {
                      bgcolor: theme.palette.primary.dark,
                    }
                  }}
                >
                  Nouvelle Charge
                </Button>
              </Grid>
            </Grid>
          </Paper>
  
          {/* Liste des Charges */}
          <Grid container spacing={3}>
            {filteredCharges.length === 0 ? (
              <Grid item xs={12}>
                <Paper 
                  sx={{ 
                    p: 4, 
                    textAlign: 'center',
                    borderRadius: 3,
                    bgcolor: alpha(theme.palette.info.main, 0.05)
                  }}
                >
                  <Info sx={{ fontSize: 60, color: 'info.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Aucune charge trouvée
                  </Typography>
                  <Typography color="textSecondary">
                    {searchQuery 
                      ? "Aucun résultat ne correspond à votre recherche"
                      : "Aucune charge n'a été créée pour le moment"}
                  </Typography>
                </Paper>
              </Grid>
            ) : (
              filteredCharges.map((charge) => (
                <Grid item xs={12} md={4} key={charge._id}>
                  <ChargeCard charge={charge} />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
  
        {/* Dialogs */}
        <ChargeDialog
          open={openChargeDialog}
          onClose={() => {
            setOpenChargeDialog(false);
            resetChargeForm();
          }}
          formData={chargeForm}
          setFormData={setChargeForm}
          onSubmit={selectedCharge ? handleUpdateCharge : handleCreateCharge}
          immeubles={immeubles}
          isEdit={!!selectedCharge}
        />
  
        <Dialog 
          open={detailDialog.open} 
          onClose={() => setDetailDialog({ open: false, charge: null })}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 3 }
          }}
        >
          <DialogTitle sx={{ 
            bgcolor: 'primary.main', 
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <Apartment />
            Détails de la Charge
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            {detailDialog.charge && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, height: '100%' }}>
                    <Typography variant="h6" gutterBottom>
                      Informations Générales
                    </Typography>
                    <Stack spacing={2}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Apartment color="primary" />
                        <Typography>{detailDialog.charge.immeuble?.nom}</Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Schedule color="primary" />
                        <Typography>
                          Échéance: {new Date(detailDialog.charge.dateEcheance).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Repeat color="primary" />
                        <Typography>Périodicité: {detailDialog.charge.periodicite}</Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, height: '100%' }}>
                    <Typography variant="h6" gutterBottom>
                      Détails Financiers
                    </Typography>
                    <Typography variant="h3" color="primary.main" gutterBottom>
                      {Number(detailDialog.charge.montant).toLocaleString()} DH
                    </Typography>
                    <Chip 
                      label={detailDialog.charge.type}
                      color="primary"
                      sx={{ mb: 2 }}
                    />
                    <Typography color="text.secondary">
                      {detailDialog.charge.description}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button 
              onClick={() => setDetailDialog({ open: false, charge: null })}
              sx={{ borderRadius: 2 }}
            >
              Fermer
            </Button>
            <Button 
              variant="contained"
              onClick={() => {
                setSelectedCharge(detailDialog.charge);
                setChargeForm(detailDialog.charge);
                setOpenChargeDialog(true);
                setDetailDialog({ open: false, charge: null });
              }}
              sx={{ borderRadius: 2 }}
            >
              Modifier
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  };
  
  export default DashboardCharges;