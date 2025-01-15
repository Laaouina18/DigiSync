import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import { Mail, Lock, Building2 } from 'lucide-react';

const FormLogin = ({ form, handleChange, handleClick, loading = false }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)',
      py: 4
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center">
          {/* Left side - Illustration */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                p: 4
              }}
            >
              <Box sx={{ mb: 4 }}>
                <svg viewBox="0 0 200 200" width="100%" height="300">
                  {/* Modern Building Design */}
                  <rect x="40" y="20" width="120" height="160" fill="#ffffff" opacity="0.9"/>
                  <rect x="50" y="30" width="100" height="140" fill="#bbdefb"/>
                  {/* Windows */}
                  {Array.from({ length: 5 }).map((_, row) =>
                    Array.from({ length: 4 }).map((_, col) => (
                      <rect
                        key={`window-${row}-${col}`}
                        x={60 + col * 25}
                        y={40 + row * 25}
                        width="15"
                        height="15"
                        fill="#1976d2"
                        opacity="0.8"
                      />
                    ))
                  )}
                  {/* Door */}
                  <rect x="85" y="150" width="30" height="30" fill="#1976d2"/>
                  {/* Roof */}
                  <path d="M30 20 L100 0 L170 20" fill="#ffffff" opacity="0.9"/>
                </svg>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}>
                Gestion Syndic
              </Typography>
              <Typography variant="h6" sx={{ textAlign: 'center', opacity: 0.9 }}>
                Gérez vos propriétés efficacement avec notre plateforme professionnelle
              </Typography>
            </Box>
          </Grid>

          {/* Right side - Login Form */}
          <Grid item xs={12} md={7}>
            <Paper 
              elevation={24}
              sx={{
                p: 4,
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  mb: 4, 
                  color: '#1976d2', 
                  fontWeight: 'bold',
                  textAlign: 'center',
                  position: 'relative'
                }}
              >
                <Box 
                  component="span" 
                  sx={{
                    display: 'inline-block',
                    position: 'relative',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      width: '60%',
                      height: '4px',
                      background: '#1976d2',
                      bottom: '-10px',
                      left: '20%',
                      borderRadius: '2px'
                    }
                  }}
                >
                  Connexion Syndic
                </Box>
              </Typography>

              <form noValidate>
                <Box sx={{ mb: 4 }}>
                  <TextField
                    fullWidth
                    required
                    label="Identifiant Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Mail color="#1976d2" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ 
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />

                  <TextField
                    fullWidth
                    required
                    label="Mot de passe"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="#1976d2" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleClick}
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    fontSize: '1.1rem',
                    borderRadius: 2,
                    background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                    boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                    }
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Se connecter'
                  )}
                </Button>

                <Box sx={{ 
                  textAlign: 'center',
                  mt: 4,
                  pt: 4,
                  borderTop: '1px solid rgba(0, 0, 0, 0.12)'
                }}>
                  <Typography variant="body1" color="text.secondary">
                    Vous n'avez pas de compte ?{' '}
                    <Button
                      color="primary"
                      onClick={() => navigate('/signin')}
                      sx={{ 
                        fontWeight: 'bold',
                        textTransform: 'none',
                        '&:hover': {
                          background: 'rgba(25, 118, 210, 0.08)'
                        }
                      }}
                    >
                      Créer un compte
                    </Button>
                  </Typography>
                </Box>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FormLogin;