// DashboardImmeuble.jsx
import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  useTheme,
  alpha,
  InputAdornment,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Tooltip,
  CardActions,
  Skeleton,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Building,
  Plus,
  Edit2,
  Trash2,
  Home,
  Info,
  ChevronRight,
  Users,
  Key,
  Search,
  SortAsc,
  SortDesc,
  MapPin,
  Building2,
  SquareStack,
  Filter,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import axios from '../api/Axios';
import ImmeubleDialog from './dialogs/ImmeubleDialog';

const DashboardImmeuble = () => {
  const theme = useTheme();
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [immeubles, setImmeubles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openImmeubleDialog, setOpenImmeubleDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedImmeuble, setSelectedImmeuble] = useState(null);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('nom');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterBy, setFilterBy] = useState('all');

  const [immeubleForm, setImmeubleForm] = useState({
    user: userId,
    nom: '',
    adresse: '',
    nombreEtages: '',
    nombreAppartements: '',
    apartments: []
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
  }, [token]);

  const fetchImmeubles = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/Syndic/immeubles', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setImmeubles(response.data);
    } catch (error) {
      showAlert('Erreur lors du chargement des immeubles', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedImmeubles = useMemo(() => {
    let filtered = [...immeubles];

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(immeuble =>
        immeuble.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        immeuble.adresse.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filterBy !== 'all') {
      switch (filterBy) {
        case 'withApartments':
          filtered = filtered.filter(imm => imm.appartements?.length > 0);
          break;
        case 'noApartments':
          filtered = filtered.filter(imm => !imm.appartements?.length);
          break;
        default:
          break;
      }
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      const modifier = sortOrder === 'asc' ? 1 : -1;
      if (sortBy === 'nom') {
        return modifier * a.nom.localeCompare(b.nom);
      }
      if (sortBy === 'apartments') {
        return modifier * (a.nombreAppartements - b.nombreAppartements);
      }
      if (sortBy === 'etages') {
        return modifier * (a.nombreEtages - b.nombreEtages);
      }
      return 0;
    });
  }, [immeubles, searchQuery, sortBy, sortOrder, filterBy]);

  const handleCreateImmeuble = async (formData) => {
    try {
      const response = await axios.post('/Syndic/immeubles', 
        { ...formData, user: userId },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (response.data) {
        showAlert('Immeuble créé avec succès');
        fetchImmeubles();
        setOpenImmeubleDialog(false);
        resetImmeubleForms();
      }
    } catch (error) {
      showAlert('Erreur lors de la création de l\'immeuble', 'error');
    }
  };

  const handleUpdateImmeuble = async (formData) => {
    try {
      const response = await axios.put(
        `/Syndic/immeubles/${selectedImmeuble._id}`,
        { ...formData, user: userId },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (response.data) {
        showAlert('Immeuble modifié avec succès');
        fetchImmeubles();
        setOpenImmeubleDialog(false);
        resetImmeubleForms();
      }
    } catch (error) {
      showAlert('Erreur lors de la modification de l\'immeuble', 'error');
    }
  };

  const handleDeleteImmeuble = async () => {
    try {
      await axios.delete(`/Syndic/immeubles/${selectedImmeuble._id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchImmeubles();
      setOpenDeleteDialog(false);
      showAlert('Immeuble supprimé avec succès');
    } catch (error) {
      showAlert('Erreur lors de la suppression', 'error');
    }
  };

  const resetImmeubleForms = () => {
    setImmeubleForm({
      user: userId,
      nom: '',
      adresse: '',
      nombreEtages: '',
      nombreAppartements: '',
      apartments: []
    });
    setSelectedImmeuble(null);
  };

  const handleOpenDetails = (immeuble) => {
    setSelectedImmeuble(immeuble);
    setOpenDetailsDialog(true);
  };

  const showAlert = (message, severity = 'success') => {
    setAlert({ open: true, message, severity });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        {/* Header Section */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 4 
        }}>
          <Box>
            <Typography variant="h4" 
              sx={{ 
                fontWeight: 'bold',
                color: theme.palette.primary.main,
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}>
              <Building2 size={32} />
              Gestion des Immeubles
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              {filteredAndSortedImmeubles.length} immeubles trouvés
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Plus size={16} />}
            onClick={() => setOpenImmeubleDialog(true)}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              px: 3,
              height: 48
            }}
          >
            Ajouter un immeuble
          </Button>
        </Box>
        
        {/* Search and Filter Section */}
        <Box sx={{ 
          mb: 4,
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap'
        }}>
          <TextField
            placeholder="Rechercher un immeuble..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flexGrow: 1, minWidth: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} />
                </InputAdornment>
              )
            }}
          />
          
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Trier par</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              label="Trier par"
              startAdornment={
                <InputAdornment position="start">
                  {sortOrder === 'asc' ? <SortAsc size={20} /> : <SortDesc size={20} />}
                </InputAdornment>
              }
              endAdornment={
                <IconButton 
                  size="small" 
                  onClick={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
                  sx={{ mr: 2 }}
                >
                  {sortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />}
                </IconButton>
              }
            >
              <MenuItem value="nom">Nom</MenuItem>
              <MenuItem value="apartments">Nombre d'appartements</MenuItem>
              <MenuItem value="etages">Nombre d'étages</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Filtrer</InputLabel>
            <Select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              label="Filtrer"
              startAdornment={
                <InputAdornment position="start">
                  <Filter size={20} />
                </InputAdornment>
              }
            >
              <MenuItem value="all">Tous les immeubles</MenuItem>
              <MenuItem value="withApartments">Avec appartements</MenuItem>
              <MenuItem value="noApartments">Sans appartements</MenuItem>
            </Select>
          </FormControl>

          <Tooltip title="Rafraîchir">
            <IconButton 
              onClick={fetchImmeubles}
              sx={{ 
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) }
              }}
            >
              <RefreshCw size={20} />
            </IconButton>
          </Tooltip>
        </Box>
        
        {/* Grid of Immeubles */}
        <Grid container spacing={3}>
          {loading ? (
            Array(6).fill(0).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={`skeleton-${index}`}>
                <Card>
                  <CardContent>
                    <Skeleton variant="rectangular" height={24} sx={{ mb: 2 }} />
                    <Skeleton variant="text" sx={{ mb: 1 }} />
                    <Skeleton variant="text" sx={{ mb: 2 }} />
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Skeleton variant="rectangular" width={100} height={32} />
                      <Skeleton variant="rectangular" width={100} height={32} />
                    </Box>
                    <Skeleton variant="rectangular" height={36} />
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : filteredAndSortedImmeubles.length === 0 ? (
            <Grid item xs={12}>
              <Box 
                sx={{ 
                  textAlign: 'center', 
                  py: 8,
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  borderRadius: 2
                }}
              >
                <AlertCircle size={48} color={theme.palette.text.secondary} />
                <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                  Aucun immeuble trouvé
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Modifiez vos critères de recherche ou ajoutez un nouvel immeuble
                </Typography>
              </Box>
            </Grid>
          ) : (
            filteredAndSortedImmeubles.map((immeuble) => (
              <Grid item xs={12} sm={6} md={4} key={immeuble._id}>
                <Card 
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[4],
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Building size={24} color={theme.palette.primary.main} />
                        <Typography variant="h6">{immeuble.nom}</Typography>
                      </Box>
                      <Box>
                        <Tooltip title="Modifier">
                          <IconButton
                            size="small"
                            onClick={() => {
                              setSelectedImmeuble(immeuble);
                              setImmeubleForm(immeuble);
                              setOpenImmeubleDialog(true);
                            }}
                            sx={{ 
                              color: theme.palette.info.main,
                              '&:hover': { bgcolor: alpha(theme.palette.info.main, 0.1) }
                            }}
                          >
                            <Edit2 size={16} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Supprimer">
                          <IconButton 
                            size="small"
                            onClick={() => {
                              setSelectedImmeuble(immeuble);
                              setOpenDeleteDialog(true);
                            }}
                            sx={{ 
                              color: theme.palette.error.main,
                              '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.1) }
                            }}
                          >
                            <Trash2 size={16} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <MapPin size={16} color={theme.palette.text.secondary} />
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                      >
                        {immeuble.adresse}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                      <Chip 
                        label={`${immeuble.nombreEtages} étages`}
                        size="small"
                        icon={<SquareStack size={14} />}
                        sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}
                      />
                      <Chip 
                        label={`${immeuble.nombreAppartements} appartements`}
                        size="small"
                        icon={<Home size={14} />}
                        sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.1) }}
                      />
                    </Box>
                  </CardContent>

                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Info size={16} />}
                      onClick={() => handleOpenDetails(immeuble)}
                      sx={{ 
                        textTransform: 'none',
                        borderRadius: '8px'
                      }}
                    >
                      Voir les détails
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      {/* Details Dialog */}
      <Dialog 
        open={openDetailsDialog} 
        onClose={() => setOpenDetailsDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedImmeuble && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Building size={28} color={theme.palette.primary.main} />
                <Typography variant="h5" component="div">
                  {selectedImmeuble.nom}
                </Typography>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Informations générales
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <MapPin size={20} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Adresse"
                        secondary={selectedImmeuble.adresse}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <SquareStack size={20} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Nombre d'étages"
                        secondary={selectedImmeuble.nombreEtages}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Home size={20} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Nombre d'appartements"
                        secondary={selectedImmeuble.nombreAppartements}
                      />
                    </ListItem>
                  </List>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Key size={20} />
                    Liste des appartements
                  </Typography>
                  {selectedImmeuble.appartements?.length > 0 ? (
                    <List>
                      {selectedImmeuble.appartements.map((apt, index) => (
                        <ListItem 
                          key={index}
                          secondaryAction={
                            <IconButton edge="end">
                              <ChevronRight size={16} />
                            </IconButton>
                          }
                          sx={{
                            bgcolor: alpha(theme.palette.primary.main, 0.04),
                            borderRadius: 1,
                            mb: 1
                          }}
                        >
                          <ListItemIcon>
                            <Home size={20} />
                          </ListItemIcon>
                          <ListItemText
                            primary={`Appartement ${apt.numero}`}
                            secondary={`Étage ${apt.etage} • ${apt.superficie} m²`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Box sx={{ 
                      textAlign: 'center', 
                      py: 4,
                      bgcolor: alpha(theme.palette.primary.main, 0.04),
                      borderRadius: 1
                    }}>
                      <Home size={24} color={theme.palette.text.secondary} />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Aucun appartement enregistré
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={() => setOpenDetailsDialog(false)}
                sx={{ textTransform: 'none' }}
              >
                Fermer
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AlertCircle size={24} color={theme.palette.error.main} />
          Confirmer la suppression
        </DialogTitle>
        <DialogContent>
          <Typography>
            Êtes-vous sûr de vouloir supprimer l'immeuble "{selectedImmeuble?.nom}" ? 
            Cette action est irréversible.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenDeleteDialog(false)}
            sx={{ textTransform: 'none' }}
          >
            Annuler
          </Button>
          <Button 
            onClick={handleDeleteImmeuble}
            variant="contained"
            color="error"
            sx={{ textTransform: 'none' }}
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Immeuble Form Dialog */}
      <ImmeubleDialog
        open={openImmeubleDialog}
        onClose={() => {
          setOpenImmeubleDialog(false);
          resetImmeubleForms();
        }}
        immeuble={selectedImmeuble}
        onSubmit={selectedImmeuble ? handleUpdateImmeuble : handleCreateImmeuble}
      />

      {/* Alert Snackbar */}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert 
          onClose={() => setAlert({ ...alert, open: false })} 
          severity={alert.severity}
          elevation={6}
          variant="filled"
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default DashboardImmeuble;