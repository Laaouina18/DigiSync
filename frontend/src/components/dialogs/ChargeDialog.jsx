
// components/dialogs/ChargeDialog.js
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
export const ChargeDialog = ({
  open,
  onClose,
  formData,
  setFormData,
  onSubmit,
  immeubles,
  isEdit
}) => {
  const periodicites = ['MENSUEL', 'TRIMESTRIEL', 'ANNUEL', 'PONCTUEL'];
  const payerTypes = ['client', 'syndic'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isEdit ? 'Modifier la charge' : 'Ajouter une charge'}
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
          label="Type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Montant (DH)"
          name="montant"
          type="number"
          value={formData.montant}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          multiline
          rows={3}
          value={formData.description}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          select
          fullWidth
          label="Périodicité"
          name="periodicite"
          value={formData.periodicite}
          onChange={handleChange}
          margin="normal"
        >
          {periodicites.map((periodicite) => (
            <MenuItem key={periodicite} value={periodicite}>
              {periodicite}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          label="Date d'échéance"
          name="dateEcheance"
          type="date"
          value={formData.dateEcheance}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          select
          fullWidth
          label="Type de payeur"
          name="payerType"
          value={formData.payerType}
          onChange={handleChange}
          margin="normal"
        >
          {payerTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type === 'client' ? 'Client' : 'Syndic'}
            </MenuItem>
          ))}
        </TextField>
        {formData.payerType === 'client' && (
          <>
            <TextField
              fullWidth
              label="Nom du client"
              name="payerDetails.nom"
              value={formData.payerDetails?.nom || ''}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  payerDetails: {
                    ...prev.payerDetails,
                    nom: e.target.value
                  }
                }))
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Prénom du client"
              name="payerDetails.prenom"
              value={formData.payerDetails?.prenom || ''}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  payerDetails: {
                    ...prev.payerDetails,
                    prenom: e.target.value
                  }
                }))
              }
              margin="normal"
            />
          </>
        )}
        {formData.payerType === 'syndic' && (
          <TextField
            fullWidth
            label="Nom du syndic"
            name="payerDetails.nom"
            value={formData.payerDetails?.nom || ''}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                payerDetails: {
                  ...prev.payerDetails,
                  nom: e.target.value
                }
              }))
            }
            margin="normal"
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={onSubmit} variant="contained">
          {isEdit ? 'Modifier' : 'Ajouter'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
