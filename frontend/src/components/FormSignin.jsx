import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  InputAdornment,
  Paper,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BusinessIcon from '@mui/icons-material/Business';

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: 1000,
  width: '100%',
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
}));

const SignupContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f6f9fc 0%, #edf2f7 100%)',
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const BuildingImage = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  borderRadius: '16px',
  padding: theme.spacing(4),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  minHeight: 400,
}));

const FormSignin = ({ handleChange, handleClick, FormData }) => {
  const navigate = useNavigate();

  return (
    <SignupContainer>
      <Container maxWidth="lg">
        <StyledPaper elevation={0}>
          <Grid container spacing={4}>
            {/* Left side - Building Image */}
            <Grid item xs={12} md={5}>
              <BuildingImage>
                <Box textAlign="center">
                  <ApartmentIcon sx={{ fontSize: 100, mb: 2 }} />
                  <Typography variant="h4" component="h1" gutterBottom>
                    Gestion Immobilière
                  </Typography>
                  <Typography variant="subtitle1">
                    Créez votre compte syndic pour gérer vos immeubles
                  </Typography>
                </Box>
              </BuildingImage>
            </Grid>

            {/* Right side - Signup Form */}
            <Grid item xs={12} md={7}>
              <Box sx={{ p: { xs: 2, md: 4 } }}>
                <Typography
                  component="h2"
                  variant="h5"
                  sx={{
                    mb: 4,
                    fontWeight: 700,
                    color: '#1a237e',
                    textAlign: 'center'
                  }}
                >
                  Inscription Syndic
                </Typography>

                <form noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Prénom"
                        name="firstName"
                        value={FormData.firstName}
                        onChange={handleChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <PersonIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Nom"
                        name="lastName"
                        value={FormData.lastName}
                        onChange={handleChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <PersonIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mb: 2 }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={FormData.email}
                        onChange={handleChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <EmailIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Téléphone"
                        name="phone"
                        value={FormData.phone}
                        onChange={handleChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <PhoneIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mb: 2 }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Mot de passe"
                        name="password"
                        type="password"
                        value={FormData.password}
                        onChange={handleChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <LockIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Confirmer le mot de passe"
                        name="repeatpass"
                        type="password"
                        value={FormData.repeatpass}
                        onChange={handleChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <LockIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mb: 2 }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Nom de l'immeuble"
                        name="immeuble"
                        value={FormData.immeuble}
                        onChange={handleChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <BusinessIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mb: 3 }}
                      />
                    </Grid>
                  </Grid>

                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleClick}
                    sx={{
                      mt: 2,
                      mb: 3,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: 2,
                      textTransform: 'none',
                      background: 'linear-gradient(45deg, #1a237e 30%, #283593 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #283593 30%, #1a237e 90%)',
                      }
                    }}
                  >
                    Créer mon compte
                  </Button>

                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" component="span" color="text.secondary">
                      Vous avez déjà un compte ?{' '}
                    </Typography>
                    <Button
                      color="primary"
                      onClick={() => navigate('/login')}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                      }}
                    >
                      Se connecter
                    </Button>
                  </Box>
                </form>
              </Box>
            </Grid>
          </Grid>
        </StyledPaper>
      </Container>
    </SignupContainer>
  );
};

export default FormSignin;