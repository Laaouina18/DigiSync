import React from 'react';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  Button,
  IconButton,
  Chip,
  Stack,
  useTheme,
} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { PDFDownloadLink } from '@react-pdf/renderer';
import DownloadIcon from '@mui/icons-material/Download';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Facture from './Facture';

const Clients = ({ date, payer }) => {
  const theme = useTheme();
  const Apps = useSelector((state) => state.AppReducer.APPs);
  const payement = useSelector((state) => state.PayementReducer.Payements);

  const isPaymentMade = (appId) => {
    return payement.find(
      (x) => 
        x.appartement === appId && 
        x.date.month === date.month && 
        x.date.year === date.year
    );
  };

  return (
    <Card
      elevation={2}
      sx={{
        width: '100%',
        borderRadius: 3,
        overflow: 'hidden',
        bgcolor: 'background.paper',
      }}
    >
      <Box sx={{ p: 3, pb: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
          Clients Management
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          Overview of client payments and status for {date.month}/{date.year}
        </Typography>
      </Box>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Owner Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Apartment</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Invoice</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Apps.map((app, index) => {
              const isPaid = isPaymentMade(app._id);

              return (
                <TableRow
                  key={index}
                  sx={{
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                    transition: 'background-color 0.2s ease-in-out',
                  }}
                >
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar 
                        sx={{ 
                          bgcolor: theme.palette.primary.light,
                          width: 40,
                          height: 40,
                        }}
                      >
                        {app.client.charAt(0)}
                      </Avatar>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {app.client}
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={`APP ${index + 1}`}
                      size="small"
                      sx={{
                        bgcolor: theme.palette.primary.light + '20',
                        color: theme.palette.primary.main,
                        fontWeight: 500,
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    {isPaid ? (
                      <Chip
                        icon={<CheckCircleIcon />}
                        label="Paid"
                        size="small"
                        color="success"
                        sx={{ fontWeight: 500 }}
                      />
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<AccountBalanceWalletIcon />}
                        onClick={() => payer(date, app)}
                        sx={{
                          textTransform: 'none',
                          borderRadius: 2,
                          boxShadow: 2,
                        }}
                      >
                        Pay Now
                      </Button>
                    )}
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {date.month}/{date.year}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    {isPaid ? (
                      <PDFDownloadLink
                        document={
                          <Facture 
                            prix={app.prix}
                            client={app.client}
                            year={date.year}
                            month={date.month}
                          />
                        }
                        fileName={`Invoice-${app.client}-${date.month}-${date.year}.pdf`}
                      >
                        {({ loading }) => (
                          <IconButton 
                            color="primary"
                            disabled={loading}
                            sx={{ 
                              bgcolor: theme.palette.primary.light + '20',
                              '&:hover': {
                                bgcolor: theme.palette.primary.light + '30',
                              }
                            }}
                          >
                            <DownloadIcon />
                          </IconButton>
                        )}
                      </PDFDownloadLink>
                    ) : (
                      <Typography 
                        variant="body2" 
                        sx={{ color: 'text.disabled' }}
                      >
                        Not Available
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default Clients;