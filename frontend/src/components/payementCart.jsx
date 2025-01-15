/ components/PaymentCard.js
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Button
} from '@mui/material';
import { Download, Receipt } from 'lucide-react';

const PaymentCard = ({ payment, onGenerateInvoice }) => {
  const getStatusColor = (status) => {
    const colors = {
      'PAID': 'success',
      'PENDING': 'warning',
      'OVERDUE': 'error'
    };
    return colors[status] || 'default';
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">
            Paiement #{payment.reference}
          </Typography>
          <Chip
            label={payment.status}
            color={getStatusColor(payment.status)}
            size="small"
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {payment.description}
        </Typography>
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            {payment.amount} DH
          </Typography>
          <Typography variant="body2">
            Date: {new Date(payment.date).toLocaleDateString()}
          </Typography>
        </Box>

        {payment.status === 'PAID' && (
          <Button
            variant="outlined"
            startIcon={<Download size={16} />}
            onClick={() => onGenerateInvoice(payment)}
            fullWidth
            sx={{ mt: 2 }}
          >
            Télécharger la facture
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentCard;