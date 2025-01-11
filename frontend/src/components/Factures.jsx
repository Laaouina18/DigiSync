import React from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Grid,
  Divider,
  IconButton,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { 
  PictureAsPdf as PdfIcon,
  Download as DownloadIcon,
  ArrowForward as ArrowForwardIcon 
} from '@mui/icons-material';

const Facture = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const invoices = [
    { id: 1, date: 'March 01, 2020', amount: '1000dh', status: 'Paid' },
    { id: 2, date: 'March 15, 2020', amount: '1500dh', status: 'Pending' },
    { id: 3, date: 'April 01, 2020', amount: '2000dh', status: 'Paid' },
    { id: 4, date: 'April 15, 2020', amount: '1200dh', status: 'Paid' },
  ];

  const getStatusColor = (status) => {
    return status === 'Paid' ? theme.palette.success.main : theme.palette.warning.main;
  };

  return (
    <Card 
      elevation={2}
      sx={{ 
        width: '100%',
        borderRadius: 3,
        background: theme.palette.background.paper,
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <CardHeader
        sx={{
          p: 3,
          '& .MuiCardHeader-content': { width: '100%' },
        }}
        title={
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2
          }}>
            <Typography variant="h5" sx={{ 
              fontWeight: 700,
              color: theme.palette.text.primary,
            }}>
              Recent Invoices
            </Typography>
            <Button 
              variant="contained" 
              color="primary"
              endIcon={<ArrowForwardIcon />}
              sx={{ 
                borderRadius: 2,
                textTransform: 'none',
                px: 3,
                py: 1,
                boxShadow: 2,
              }}
            >
              View All Invoices
            </Button>
          </Box>
        }
      />
      <Divider />
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {invoices.map((invoice, index) => (
            <Grid item xs={12} key={invoice.id}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  justifyContent: 'space-between',
                  alignItems: isMobile ? 'flex-start' : 'center',
                  p: 2,
                  bgcolor: theme.palette.background.default,
                  borderRadius: 2,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    bgcolor: theme.palette.action.hover,
                    transform: 'translateY(-2px)',
                    boxShadow: 1,
                  },
                  gap: isMobile ? 2 : 0,
                }}
              >
                <Stack spacing={0.5}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Invoice #{invoice.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {invoice.date}
                  </Typography>
                </Stack>
                
                <Stack 
                  direction={isMobile ? 'column' : 'row'} 
                  spacing={3}
                  alignItems={isMobile ? 'flex-start' : 'center'}
                  width={isMobile ? '100%' : 'auto'}
                >
                  <Box sx={{ 
                    px: 2, 
                    py: 0.5, 
                    borderRadius: 1,
                    bgcolor: getStatusColor(invoice.status) + '15',
                    color: getStatusColor(invoice.status),
                  }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {invoice.status}
                    </Typography>
                  </Box>
                  
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 700,
                      color: theme.palette.primary.main,
                      minWidth: 100,
                    }}
                  >
                    {invoice.amount}
                  </Typography>
                  
                  <Stack direction="row" spacing={1}>
                    <IconButton 
                      color="primary"
                      sx={{ 
                        bgcolor: theme.palette.primary.light + '20',
                        '&:hover': {
                          bgcolor: theme.palette.primary.light + '30',
                        }
                      }}
                    >
                      <PdfIcon />
                    </IconButton>
                    <IconButton 
                      color="primary"
                      sx={{ 
                        bgcolor: theme.palette.primary.light + '20',
                        '&:hover': {
                          bgcolor: theme.palette.primary.light + '30',
                        }
                      }}
                    >
                      <DownloadIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              </Box>
              {index < invoices.length - 1 && (
                <Box sx={{ mt: isMobile ? 2 : 3 }} />
              )}
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Facture;