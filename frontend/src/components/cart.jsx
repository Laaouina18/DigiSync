import React from 'react';
import { Paper, Box, Typography, Grid } from '@mui/material';
import { Home, People } from '@mui/icons-material';

const StatsCard = ({ title, value, Icon }) => (
  <Paper 
    elevation={2}
    sx={{
      p: 2,
      height: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}
  >
    <Box>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h6" component="div">
        {value}
      </Typography>
    </Box>
    <Box
      sx={{
        backgroundColor: 'primary.main',
        borderRadius: 1,
        width: 40,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Icon sx={{ color: 'white' }} />
    </Box>
  </Paper>
);

const SyndicDashboard = ({
  numAPP = 0,
  numUsers = 0,
  totalAmount = 0,
  currency = "€"
}) => {
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <StatsCard
            title="Appartements"
            value={numAPP}
            Icon={Home}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard
            title="Utilisateurs"
            value={numUsers}
            Icon={People}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard
            title="Total argent"
            value={`${totalAmount.toLocaleString()} ${currency}`}
            Icon={People}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SyndicDashboard;