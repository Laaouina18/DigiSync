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
import ApartmentIcon from '@mui/icons-material/Apartment';

// Styled components
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

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(2),
}));

const LoginContainer = styled(Box)(({ theme }) => ({
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

export const FormLogin = ({ form, handleChange, handleClick }) => {
  const navigate = useNavigate();

  return (
    <LoginContainer>
      <Container maxWidth="lg">
        <StyledPaper elevation={0}>
          <Grid container spacing={4}>
            {/* Left side - Building Image */}
            <Grid item xs={12} md={6}>
              <BuildingImage>
                <Box textAlign="center">
                  <ApartmentIcon sx={{ fontSize: 100, mb: 2 }} />
                  <Typography variant="h4" component="h1" gutterBottom>
                    Gestion Immobilière
                  </Typography>
                  <Typography variant="subtitle1">
                    Plateforme professionnelle de gestion de copropriété
                  </Typography>
                </Box>
              </BuildingImage>
            </Grid>

            {/* Right side - Login Form */}
            <Grid item xs={12} md={6}>
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
                  Accès Espace Syndic
                </Typography>

                <StyledForm noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Identifiant Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={form.email}
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <EmailIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />

                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Mot de passe"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={form.password}
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <LockIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mb: 4,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />

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
                    Se Connecter
                  </Button>

                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" component="span" color="text.secondary">
                      Vous n'avez pas de compte ?{' '}
                    </Typography>
                    <Button
                      color="primary"
                      onClick={() => navigate('/signin')}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                      }}
                    >
                      Créer un compte
                    </Button>
                  </Box>
                </StyledForm>
              </Box>
            </Grid>
          </Grid>
        </StyledPaper>
      </Container>
    </LoginContainer>
  );
};

export default FormLogin;