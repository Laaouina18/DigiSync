import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  useTheme,
  useMediaQuery,
  CircularProgress
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { SigninSyndic } from '../redux/actions/AuthActions';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  Building2, 
  UserCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const RegisterForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
const navigate=useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: 'SYNDIC'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
const dispatch=useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      dispatch(SigninSyndic(formData));
      navigate('/login')
      // Handle successful registration
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.firstName || 
        !formData.lastName || !formData.phone) {
      setError('Veuillez remplir tous les champs obligatoires');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return false;
    }
    return true;
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)',
      py: 4
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center">
          {/* Left side - Illustration */}
          {!isMobile && (
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
          )}

          {/* Right side - Form */}
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
                  Inscription Syndic
                </Box>
              </Typography>

              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 3,
                    borderRadius: 2
                  }}
                >
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  {/* Account Information */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="Nom d'utilisateur"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <UserCircle color="#1976d2" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Mail color="#1976d2" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>

                  {/* Personal Information */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="Prénom"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <User color="#1976d2" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="Nom"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <User color="#1976d2" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      label="Téléphone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Phone color="#1976d2" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>

                  {/* Password Fields */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="Mot de passe"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock color="#1976d2" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <EyeOff /> : <Eye />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="Confirmer le mot de passe"
                      name="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock color="#1976d2" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      type="submit"
                      disabled={loading}
                      sx={{
                        mt: 2,
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
                        'S\'inscrire'
                      )}
                    </Button>
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ 
                      textAlign: 'center',
                      mt: 2,
                      p: 2,
                      borderTop: '1px solid rgba(0, 0, 0, 0.12)'
                    }}>
                      <Typography variant="body1" color="text.secondary">
                        Déjà inscrit ?{' '}
                        <Button
                          color="primary"
                          sx={{ 
                            fontWeight: 'bold',
                            textTransform: 'none',
                            '&:hover': {
                              background: 'rgba(25, 118, 210, 0.08)'
                            }
                          }}
                          onClick={() => navigate('/login')}
                        >
                          Se connecter
                        </Button>
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default RegisterForm;