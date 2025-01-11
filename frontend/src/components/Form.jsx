import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Alert,
  Snackbar,
  Box,
  Typography,
  Stack,
  IconButton,
  useTheme,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';

const Form = ({ status, setStatus, clear, formData, handleChange, handleSubmit, type, update }) => {
  const theme = useTheme();
  const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    const newErrors = {};
    
    // Validate etage (should be a number)
    if (!formData.etage || isNaN(formData.etage)) {
      newErrors.etage = "L'étage doit être un nombre valide";
    }

    // Validate prix (should be a positive number)
    if (!formData.prix || isNaN(formData.prix) || Number(formData.prix) <= 0) {
      newErrors.prix = 'Le prix doit être un nombre positif';
    }

    // Validate numero (should not be empty)
    if (!formData.numero || formData.numero.trim() === '') {
      newErrors.numero = 'Le numéro est requis';
    }

    // Validate client (at least 3 characters)
    if (!formData.client || formData.client.length < 3) {
      newErrors.client = 'Le nom du client doit contenir au moins 3 caractères';
    }

    // Validate address (at least 5 characters)
    if (!formData.address || formData.address.length < 5) {
      newErrors.address = "L'adresse doit contenir au moins 5 caractères";
    }

    // Validate immeuble (should not be empty)
    if (!formData.immeuble || formData.immeuble.trim() === '') {
      newErrors.immeuble = "Le nom de l'immeuble est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async () => {
    if (!validateForm()) {
      setAlert({
        open: true,
        message: 'Veuillez corriger les erreurs dans le formulaire',
        severity: 'error'
      });
      return;
    }

    setLoading(true);
    try {
      if (type === "submit") {
        await handleSubmit();
      } else {
        await update();
      }
      setAlert({
        open: true,
        message: type === "submit" ? 'Données enregistrées avec succès' : 'Données mises à jour avec succès',
        severity: 'success'
      });
      setStatus(false);
    } catch (error) {
      setAlert({
        open: true,
        message: 'Une erreur est survenue',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog 
        open={status}
        onClose={() => setStatus(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: theme.shadows[10]
          }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              {type === "submit" ? "Nouvel Appartement" : "Modifier Appartement"}
            </Typography>
            <IconButton onClick={() => setStatus(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent dividers>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                label="Étage"
                name="etage"
                value={formData.etage}
                onChange={handleChange}
                error={!!errors.etage}
                helperText={errors.etage}
                size="small"
              />

              <TextField
                fullWidth
                label="Prix"
                name="prix"
                value={formData.prix}
                onChange={handleChange}
                error={!!errors.prix}
                helperText={errors.prix}
                size="small"
                InputProps={{
                  endAdornment: <Typography variant="body2">DH</Typography>
                }}
              />

              <TextField
                fullWidth
                label="Numéro"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                error={!!errors.numero}
                helperText={errors.numero}
                size="small"
              />

              <TextField
                fullWidth
                label="Client"
                name="client"
                value={formData.client}
                onChange={handleChange}
                error={!!errors.client}
                helperText={errors.client}
                size="small"
              />

              <TextField
                fullWidth
                label="Adresse"
                name="address"
                value={formData.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
                size="small"
              />

              <TextField
                fullWidth
                label="Immeuble"
                name="immeuble"
                value={formData.immeuble}
                onChange={handleChange}
                error={!!errors.immeuble}
                helperText={errors.immeuble}
                size="small"
              />
            </Stack>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            variant="outlined"
            onClick={clear}
            color="inherit"
            disabled={loading}
          >
            Annuler
          </Button>
          <LoadingButton
            variant="contained"
            onClick={handleFormSubmit}
            loading={loading}
            loadingPosition="start"
            startIcon={type === "submit" ? <SaveIcon /> : <EditIcon />}
          >
            {type === "submit" ? "Enregistrer" : "Modifier"}
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          variant="filled"
          elevation={6}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Form;