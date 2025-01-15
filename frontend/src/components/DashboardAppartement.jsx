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
  Stack,
  Divider,
  useTheme,
  TextField,
  MenuItem,
  InputAdornment
} from '@mui/material';
import {
  Home,
  Plus,
  Edit2,
  Trash2,
  Phone,
  Mail,
  Building2,
  Square,
  CreditCard,
  Search,
  Building,
  ArrowUpDown
} from 'lucide-react';
import { AppartementDialog } from './dialogs/AppartementDialog';
import axios from '../api/Axios';
import { AppartementDetailsDialog } from './dialogs/APPartementDetail';
const DashboardAppartement = () => {
  // Garder tout votre state existant
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [appartements, setAppartements] = useState([]);
  const [immeubles, setImmeubles] = useState([]);
  const [openAppartementDialog, setOpenAppartementDialog] = useState(false);
  const [selectedAppartement, setSelectedAppartement] = useState(null);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [appartementForm, setAppartementForm] = useState({
    numero: '',
    etage: '',
    superficie: '',
    prix: '',
    immeuble: '',
    client: {
      nom: '',
      prenom: '',
      email: '',
      telephone: ''
    }
  });

  const theme = useTheme();
  const [selectedForDetails, setSelectedForDetails] = useState(null);
  // Garder toutes vos fonctions existantes
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
      fetchAppartements();
      fetchImmeubles();
    }
  }, [token,userId]);

  const fetchAppartements = async () => {
    try {
      const response = await axios.get('/appartements', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log(response.data)
      const apps=response.data?.filter(a=> a.syndic===userId)
      setAppartements(apps);
    } catch (error) {
      showAlert('Erreur lors du chargement des appartements', 'error');
    }
  };

  const fetchImmeubles = async () => {
    try {
      const response = await axios.get('/Syndic/immeubles', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setImmeubles(response.data);
    } catch (error) {
      showAlert('Erreur lors du chargement des immeubles', 'error');
    }
  };

  const handleCreateAppartement = async () => {
    appartementForm.syndic = userId;
    try {
      const response = await axios.post('/appartements', appartementForm, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data) {
        showAlert('Appartement créé avec succès');
        fetchAppartements();
        setOpenAppartementDialog(false);
        resetAppartementForm();
      }
    } catch (error) {
      showAlert('Erreur lors de la création de l\'appartement', 'error');
      console.log(error)
    }
  };

  const handleUpdateAppartement = async () => {
    appartementForm.syndic = userId;
    try {
      const response = await axios.patch(`/appartements/${selectedAppartement._id}`, appartementForm, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data) {
        showAlert('Appartement modifié avec succès');
        fetchAppartements();
        setOpenAppartementDialog(false);
        resetAppartementForm();
      }
    } catch (error) {
      showAlert('Erreur lors de la modification de l\'appartement', 'error');
      console.log(error)
    }
  };

  const handleDeleteAppartement = async (id) => {
    try {
      await axios.delete(`/appartements/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchAppartements();
      showAlert('Appartement supprimé avec succès');
    } catch (error) {
      showAlert('Erreur lors de la suppression', 'error');
    }
  };

  const resetAppartementForm = () => {
    setAppartementForm({
      numero: '',
      etage: '',
      superficie: '',
      prix: '',
      immeuble: '',
      client: {
        nom: '',
        prenom: '',
        email: '',
        telephone: ''
      }
    });
    setSelectedAppartement(null);
  };

  const showAlert = (message, severity = 'success') => {
    setAlert({ open: true, message, severity });
  };
  
  const getImmeubleName = (immeubleId) => {
    const immeuble = immeubles.find(i => i._id === immeubleId);
    return immeuble ? immeuble.nom : 'N/A';
  };
 
  // Nouveaux states pour la recherche et le filtrage
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImmeuble, setSelectedImmeuble] = useState('all');
  
  // Garder vos useEffects et fonctions existantes...

  // Nouvelle fonction pour filtrer les appartements
  const getFilteredAppartements = () => {
    return appartements.filter(appartement => {
      const matchesSearch = 
        appartement.numero.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        appartement.client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appartement.client.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appartement.client.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesImmeuble = selectedImmeuble === 'all' || appartement.immeuble === selectedImmeuble;
      
      return matchesSearch && matchesImmeuble;
    });
  };

  const styles = {
    headerCard: {
      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
      color: 'white',
      borderRadius: 2,
      padding: theme.spacing(3),
      marginBottom: theme.spacing(4)
    },
    filterSection: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(2),
      marginBottom: theme.spacing(3)
    },
    apartmentCard: {
      height: '100%',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[8]
      }
    }
  };

  return (
    <Container maxWidth="lg">
      {/* Header Section */}
      <Paper sx={styles.headerCard} elevation={3}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item>
            <Avatar sx={{ width: 56, height: 56, bgcolor: 'white' }}>
              <Building2 size={30} color={theme.palette.primary.main} />
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h4" fontWeight="bold">
              Gestion des Appartements
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9, mt: 0.5 }}>
              {appartements.length} appartements • {immeubles.length} immeubles
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              size="large"
              startIcon={<Plus size={20} />}
              onClick={() => setOpenAppartementDialog(true)}
              sx={{
                bgcolor: 'white',
                color: theme.palette.primary.main,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
              }}
            >
              Ajouter un appartement
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Filter Section */}
      <Paper sx={styles.filterSection}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Rechercher par numéro, nom du client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              variant="outlined"
              value={selectedImmeuble}
              onChange={(e) => setSelectedImmeuble(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Building size={20} />
                  </InputAdornment>
                )
              }}
            >
              <MenuItem value="all">Tous les immeubles</MenuItem>
              {immeubles.map((immeuble) => (
                <MenuItem key={immeuble._id} value={immeuble._id}>
                  {immeuble.nom}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* Apartments Grid - Now using filtered results */}
      <Grid container spacing={3}>
      {getFilteredAppartements().map((appartement) => (
  <Grid item xs={12} md={6} lg={4} key={appartement._id}>
    <Card 
      sx={{
        ...styles.apartmentCard,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'visible',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: theme.palette.primary.main,
          borderTopLeftRadius: theme.shape.borderRadius,
          borderTopRightRadius: theme.shape.borderRadius
        }
      }}
      onClick={() => setSelectedForDetails(appartement)}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Card Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar sx={{ bgcolor: theme.palette.primary.lighter, width: 40, height: 40 }}>
              <Home size={20} color={theme.palette.primary.main} />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Apt. {appartement.numero}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Étage {appartement.etage}
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1}>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedAppartement(appartement);
                setAppartementForm(appartement);
                setOpenAppartementDialog(true);
              }}
            >
              <Edit2 size={18} />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteAppartement(appartement._id);
              }}
            >
              <Trash2 size={18} />
            </IconButton>
          </Stack>
        </Box>

        {/* Building Info */}
       

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Square size={16} />
              <Typography variant="body2">
                {appartement.superficie} m²
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CreditCard size={16} />
              <Typography variant="body2" color="primary.main" fontWeight="500">
                {appartement.prix} DH
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={1}>
          <Typography variant="body2" fontWeight="500">
            {appartement.client.nom} {appartement.client.prenom}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Mail size={14} />
            {appartement.client.email}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  </Grid>
))}

      </Grid>
<AppartementDetailsDialog
  open={!!selectedForDetails}
  onClose={() => setSelectedForDetails(null)}
  appartement={selectedForDetails}
  immeubleName={selectedForDetails ? getImmeubleName(selectedForDetails.immeuble) : ''}
/>
      <AppartementDialog
        open={openAppartementDialog}
        onClose={() => {
          setOpenAppartementDialog(false);
          resetAppartementForm();
        }}
        formData={appartementForm}
        setFormData={setAppartementForm}
        onSubmit={selectedAppartement ? handleUpdateAppartement : handleCreateAppartement}
        immeubles={immeubles}
        isEdit={!!selectedAppartement}
      />
    </Container>
  );
};

export default DashboardAppartement;