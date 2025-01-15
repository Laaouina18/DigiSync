import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Divider,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
  IconButton
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';
import Sidebar from "../components/Sidebar";
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
   
const SyndicProfile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [editMode, setEditMode] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const [profileData, setProfileData] = useState({
    firstName: 'Mohammed',
    lastName: 'Alami',
    email: 'mohammed.alami@syndic.ma',
    phone: '+212 6 12 34 56 78',
    company: 'SyndicPro Immobilier',
    address: '123 Avenue Hassan II, Casablanca',
    role: 'Syndic Principal',
    buildings: ['Résidence Atlas', 'Immeuble Majorelle', 'Tour Casablanca'],
    yearJoined: '2022'
  });

  const [tempData, setTempData] = useState({ ...profileData });

  const handleEdit = () => {
    setTempData({ ...profileData });
    setEditMode(true);
  };

  const handleCancel = () => {
    setTempData({ ...profileData });
    setEditMode(false);
  };

  const handleSave = () => {
    setProfileData({ ...tempData });
    setEditMode(false);
    showAlert('Profil mis à jour avec succès!', 'success');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const showAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
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

        <Grid container spacing={3}>
          {/* Sidebar */}
          <Grid item xs={12} md={3} lg={2}>
            <Sidebar />
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={9} lg={10}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h5" fontWeight="bold" color="primary">
                  Profil du Syndic
                </Typography>
                {!editMode ? (
                  <Button
                    startIcon={<EditIcon />}
                    variant="contained"
                    onClick={handleEdit}
                  >
                    Modifier
                  </Button>
                ) : (
                  <Box>
                    <Button
                      startIcon={<SaveIcon />}
                      variant="contained"
                      onClick={handleSave}
                      sx={{ mr: 1 }}
                    >
                      Enregistrer
                    </Button>
                    <Button
                      startIcon={<CancelIcon />}
                      variant="outlined"
                      onClick={handleCancel}
                      color="error"
                    >
                      Annuler
                    </Button>
                  </Box>
                )}
              </Box>

              <Grid container spacing={4}>
                {/* Profile Picture Section */}
                <Grid item xs={12} md={3}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      sx={{
                        width: 150,
                        height: 150,
                        bgcolor: theme.palette.primary.main
                      }}
                    >
                      {`${profileData.firstName[0]}${profileData.lastName[0]}`}
                    </Avatar>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {`${profileData.firstName} ${profileData.lastName}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {profileData.role}
                    </Typography>
                  </Box>
                </Grid>

                {/* Profile Details Section */}
                <Grid item xs={12} md={9}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Prénom"
                        name="firstName"
                        value={editMode ? tempData.firstName : profileData.firstName}
                        onChange={handleChange}
                        disabled={!editMode}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Nom"
                        name="lastName"
                        value={editMode ? tempData.lastName : profileData.lastName}
                        onChange={handleChange}
                        disabled={!editMode}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={editMode ? tempData.email : profileData.email}
                        onChange={handleChange}
                        disabled={!editMode}
                        InputProps={{
                          startAdornment: <EmailIcon sx={{ mr: 1, color: 'action.active' }} />
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Téléphone"
                        name="phone"
                        value={editMode ? tempData.phone : profileData.phone}
                        onChange={handleChange}
                        disabled={!editMode}
                        InputProps={{
                          startAdornment: <PhoneIcon sx={{ mr: 1, color: 'action.active' }} />
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Société"
                        name="company"
                        value={editMode ? tempData.company : profileData.company}
                        onChange={handleChange}
                        disabled={!editMode}
                        InputProps={{
                          startAdornment: <BusinessIcon sx={{ mr: 1, color: 'action.active' }} />
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Adresse"
                        name="address"
                        value={editMode ? tempData.address : profileData.address}
                        onChange={handleChange}
                        disabled={!editMode}
                        InputProps={{
                          startAdornment: <LocationIcon sx={{ mr: 1, color: 'action.active' }} />
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                      Immeubles Gérés
                    </Typography>
                    <Grid container spacing={2}>
                      {profileData.buildings.map((building, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <Paper
                            sx={{
                              p: 2,
                              textAlign: 'center',
                              bgcolor: 'primary.light',
                              color: 'white'
                            }}
                          >
                            <Typography variant="body1">{building}</Typography>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>

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
    </Box>
  );
};

export default SyndicProfile;