// ImmeubleDialog.jsx
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Divider,
  IconButton,
  useTheme,
  alpha
} from '@mui/material';
import { Building, X } from 'lucide-react';

const ImmeubleDialog = ({ open, onClose, immeuble, onSubmit }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    nom: '',
    adresse: '',
    nombreEtages: '',
    nombreAppartements: '',
    apartments: []
  });

  useEffect(() => {
    if (immeuble) {
      setFormData({
        nom: immeuble.nom || '',
        adresse: immeuble.adresse || '',
        nombreEtages: immeuble.nombreEtages || '',
        nombreAppartements: immeuble.nombreAppartements || '',
        apartments: immeuble.apartments || []
      });
    } else {
      setFormData({
        nom: '',
        adresse: '',
        nombreEtages: '',
        nombreAppartements: '',
        apartments: []
      });
    }
  }, [immeuble]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Building size={24} color={theme.palette.primary.main} />
              <Typography variant="h6">
                {immeuble ? 'Modifier l\'immeuble' : 'Ajouter un immeuble'}
              </Typography>
            </Box>
            <IconButton 
              onClick={onClose}
              size="small"
              sx={{ 
                color: theme.palette.grey[500],
                '&:hover': { 
                  bgcolor: alpha(theme.palette.grey[500], 0.1)
                }
              }}
            >
              <X size={20} />
            </IconButton>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                name="nom"
                label="Nom de l'immeuble"
                value={formData.nom}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="adresse"
                label="Adresse"
                value={formData.adresse}
                onChange={handleChange}
                fullWidth
                required
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="nombreEtages"
                label="Nombre d'étages"
                value={formData.nombreEtages}
                onChange={handleChange}
                fullWidth
                required
                type="number"
                inputProps={{ min: "1" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="nombreAppartements"
                label="Nombre d'appartements"
                value={formData.nombreAppartements}
                onChange={handleChange}
                fullWidth
                required
                type="number"
                inputProps={{ min: "1" }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={onClose}
            sx={{ textTransform: 'none' }}
          >
            Annuler
          </Button>
          <Button 
            type="submit"
            variant="contained"
            sx={{ textTransform: 'none' }}
          >
            {immeuble ? 'Modifier' : 'Ajouter'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ImmeubleDialog;