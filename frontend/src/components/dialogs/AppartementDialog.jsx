
// components/dialogs/AppartementDialog.js
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';

export const AppartementDialog = ({
  open,
  onClose,
  formData,
  setFormData,
  onSubmit,
  onUpdate,
  immeubles,
  isEdit
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('client.')) {
      const clientField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        client: {
          ...prev.client,
          [clientField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isEdit ? 'Modifier l\'appartement' : 'Ajouter un appartement'}
      </DialogTitle>
      <DialogContent>
        <TextField
          select
          fullWidth
          label="Immeuble"
          name="immeuble"
          value={formData.immeuble}
          onChange={handleChange}
          margin="normal"
        >
          {immeubles.map((immeuble) => (
            <MenuItem key={immeuble._id} value={immeuble._id}>
              {immeuble.nom}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          label="Numéro"
          name="numero"
          value={formData.numero}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Étage"
          name="etage"
          type="number"
          value={formData.etage}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Superficie (m²)"
          name="superficie"
          type="number"
          value={formData.superficie}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Prix (DH)"
          name="prix"
          type="number"
          value={formData.prix}
          onChange={handleChange}
          margin="normal"
        />
        {/* Client Information */}
        <TextField
          fullWidth
          label="Nom du client"
          name="client.nom"
          value={formData.client.nom}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Prénom du client"
          name="client.prenom"
          value={formData.client.prenom}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email du client"
          name="client.email"
          type="email"
          value={formData.client.email}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Téléphone du client"
          name="client.telephone"
          value={formData.client.telephone}
          onChange={handleChange}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={isEdit?onUpdate:onSubmit} variant="contained">
          {isEdit ? 'Modifier' : 'Ajouter'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
