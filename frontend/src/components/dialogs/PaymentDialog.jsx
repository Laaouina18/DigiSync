// PaymentDialog.jsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  InputAdornment,
  MenuItem,
  Stack
} from '@mui/material';
import {
    Payment as PaymentIcon,
    AccountBalance,
    AttachMoney,
    TrendingUp,
    Add,
    Search,
    Person,
    Phone,
    Email,
    Schedule,
    Warning,
    Delete,
    Edit,
    Visibility
  } from '@mui/icons-material';
export const PaymentDialog = ({ open, onClose, onSubmit, charges }) => {
    const [formData, setFormData] = useState({
      client: {
        nom: '',
        prenom: '',
        email: '',
        telephone: ''
      },
      chargeId: '',
      datePayment: new Date().toISOString().split('T')[0]
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value
          }
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    };
  
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Nouveau Paiement</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={3}>
                  {/* Informations client */}
                  <TextField
                    name="client.nom"
                    label="Nom"
                    value={formData.client.nom}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                  <TextField
                    name="client.prenom"
                    label="Prénom"
                    value={formData.client.prenom}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                  <TextField
                    name="client.email"
                    label="Email"
                    type="email"
                    value={formData.client.email}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                  <TextField
                    name="client.telephone"
                    label="Téléphone"
                    value={formData.client.telephone}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
  
                  {/* Sélection de la charge */}
                  <TextField
                    name="chargeId"
                    select
                    label="Charge"
                    value={formData.chargeId}
                    onChange={handleChange}
                    fullWidth
                    required
                  >
                    {charges.map((charge) => (
                      <MenuItem key={charge._id} value={charge._id}>
                        {charge.type} - {charge.montant} DH
                      </MenuItem>
                    ))}
                  </TextField>
  
                  <TextField
                    name="datePayment"
                    label="Date de paiement"
                    type="date"
                    value={formData.datePayment}
                    onChange={handleChange}
                    fullWidth
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                </Stack>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Annuler</Button>
            <Button type="submit" variant="contained" color="primary">
              Enregistrer
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };
// PaymentFilterForm.jsx
export const PaymentFilterForm = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={4}>
        <TextField
          name="startDate"
          label="Date début"
          type="date"
          value={filters.startDate}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          name="endDate"
          label="Date fin"
          type="date"
          value={filters.endDate}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          name="searchQuery"
          label="Rechercher..."
          value={filters.searchQuery}
          onChange={handleChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            )
          }}
        />
      </Grid>
    </Grid>
  );
};

// PaymentReceiptDialog.jsx
export const PaymentReceiptDialog = ({ open, onClose, payment }) => {
  if (!payment) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Reçu de Paiement</DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h6">Informations Client</Typography>
            <Typography>
              {payment.client.nom} {payment.client.prenom}
            </Typography>
            <Typography>{payment.client.email}</Typography>
            <Typography>{payment.client.telephone}</Typography>
          </Box>
          <Divider />
          <Box>
            <Typography variant="h6">Détails du Paiement</Typography>
            <Typography variant="h4" color="primary">
              {payment.charge.montant.toLocaleString()} DH
            </Typography>
            <Typography>
              Date: {new Date(payment.datePayment).toLocaleDateString()}
            </Typography>
            <Typography>Type: {payment.charge.type}</Typography>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fermer</Button>
        <Button variant="contained" onClick={() => window.print()}>
          Imprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
};
