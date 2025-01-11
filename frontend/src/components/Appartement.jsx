import React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Button,
  Avatar,
  Stack,
  Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';

const Appartement = ({ handlClick, supprimer, update, ajouter, show }) => {
  const Apps = useSelector((state) => state.AppReducer.APPs);

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        m: 2,
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar 
            sx={{ 
              bgcolor: 'primary.light',
              width: 40,
              height: 40
            }}
          >
            <HomeIcon />
          </Avatar>
          <Typography variant="h6" component="h2">
            Apparts
          </Typography>
        </Stack>
        
        <Stack direction="row" spacing={2}>
          {ajouter && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handlClick}
              sx={{
                bgcolor: 'success.main',
                '&:hover': {
                  bgcolor: 'success.dark'
                }
              }}
            >
              Ajouter Appartement
            </Button>
          )}
          <IconButton onClick={show}>
            <MoreVertIcon />
          </IconButton>
        </Stack>
      </Box>

      <TableContainer sx={{ p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Apartments</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Clients</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Prix</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Apps.map((app, index) => (
              <TableRow 
                key={index}
                sx={{ '&:hover': { bgcolor: 'action.hover' } }}
              >
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar 
                      sx={{ 
                        bgcolor: 'primary.light',
                        width: 32,
                        height: 32
                      }}
                    >
                      <HomeIcon fontSize="small" />
                    </Avatar>
                    <Typography variant="body1" fontWeight="medium">
                      APPart{index + 1}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{app.client}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{app.prix} DH</Typography>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Tooltip title="Supprimer">
                      <IconButton 
                        size="small" 
                        onClick={() => supprimer(app._id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Modifier">
                      <IconButton 
                        size="small" 
                        onClick={() => update(app)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Appartement;