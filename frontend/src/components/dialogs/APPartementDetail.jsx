import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Grid,
  Box,
  Stack,
  Divider,
  Chip,
  useTheme,
  Avatar
} from '@mui/material';
import {
  X,
  Home,
  Phone,
  Mail,
  Building2,
  Square,
  CreditCard,
  ArrowUpDown,
  MapPin,
  User
} from 'lucide-react';

export const AppartementDetailsDialog = ({ open, onClose, appartement, immeubleName }) => {
  const theme = useTheme();

  if (!appartement) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,1))',
          backdropFilter: 'blur(20px)'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        p: 3,
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
        color: 'white'
      }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ bgcolor: 'white', width: 48, height: 48 }}>
            <Home color={theme.palette.primary.main} size={24} />
          </Avatar>
          <Box>
            <Typography variant="h5" component="div" fontWeight="bold">
              Appartement {appartement.numero}
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              {immeubleName}
            </Typography>
          </Box>
        </Stack>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <X size={24} />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ p: 4 }}>
        <Grid container spacing={4}>
          {/* Informations de l'appartement */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Building2 size={20} />
              Détails de l'appartement
            </Typography>
            
            <Box sx={{ 
              bgcolor: 'background.paper',
              p: 2,
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
              mb: 3
            }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Stack spacing={0.5}>
                    <Typography variant="body2" color="text.secondary">
                      Étage
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ArrowUpDown size={16} />
                      {appartement.etage}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={0.5}>
                    <Typography variant="body2" color="text.secondary">
                      Superficie
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Square size={16} />
                      {appartement.superficie} m²
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
              
              <Divider sx={{ my: 2 }} />
              
              <Stack spacing={0.5}>
                <Typography variant="body2" color="text.secondary">
                  Prix
                </Typography>
                <Typography variant="h6" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CreditCard size={16} />
                  {appartement.prix} DH
                </Typography>
              </Stack>
            </Box>
          </Grid>

          {/* Informations du résident */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <User size={20} />
              Informations du résident
            </Typography>
            
            <Box sx={{ 
              bgcolor: 'background.paper',
              p: 2,
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`
            }}>
              <Stack spacing={2}>
                <Stack spacing={0.5}>
                  <Typography variant="body2" color="text.secondary">
                    Nom complet
                  </Typography>
                  <Typography variant="body1" fontWeight="500">
                    {appartement.client.nom} {appartement.client.prenom}
                  </Typography>
                </Stack>

                <Stack spacing={0.5}>
                  <Typography variant="body2" color="text.secondary">
                    Contact
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Mail size={16} />
                      {appartement.client.email}
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Phone size={16} />
                      {appartement.client.telephone}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};