import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateAPP, fetchAPPs, DeleteAPP, UpdateAPP } from "../redux/actions/AppActions.js";
import {
  Box,
  Container,
  Grid,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import SyndicDashboard from "../components/cart";
import Appartement from "../components/Appartement";
import Sidebar from "../components/Sidebar";
import Form from "../components/Form";

const SyndicLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 80" style={{ width: '200px', height: 'auto' }}>
    <rect x="0" y="10" width="300" height="60" rx="8" fill="#ffffff"/>
    <g transform="translate(20, 20)">
      <path d="M0 40 L20 0 L40 40 Z" fill="#2196F3"/>
      <rect x="8" y="15" width="6" height="6" fill="white"/>
      <rect x="26" y="15" width="6" height="6" fill="white"/>
      <rect x="17" y="25" width="6" height="15" fill="white"/>
    </g>
    <text x="70" y="50" fontFamily="Arial" fontWeight="bold" fontSize="28" fill="#1976D2">
      Syndic
      <tspan fill="#424242">Pro</tspan>
    </text>
    <g transform="translate(220, 30)">
      <rect x="0" y="0" width="4" height="20" fill="#2196F3"/>
      <rect x="8" y="5" width="4" height="15" fill="#64B5F6"/>
      <rect x="16" y="10" width="4" height="10" fill="#90CAF9"/>
    </g>
    <text x="70" y="65" fontFamily="Arial" fontSize="12" fill="#757575">
      Gestion immobilière intelligente
    </text>
  </svg>
);

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [ajouter, setAjouter] = useState(false);
  const [type, setType] = useState("submit");
  const [selectedId, setSelectedId] = useState("");
  const Apps = useSelector((state) => state.AppReducer.APPs);
  const dispatch = useDispatch();
  const [status, setStatus] = useState(false);
  
  // Alert states
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  
  // Delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [FormData, setFormdata] = useState({
    etage: "",
    numero: "",
    immeuble: "",
    client: "",
    address: "",
    prix: ""
  });

  const showAlert = (message, severity = "success") => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormdata((prv) => ({
      ...prv,
      [name]: value
    }));
  };

  const isValidPrice = (price) => {
    return !isNaN(parseFloat(price)) && isFinite(price);
  };

  const isValidEtage = (etage) => {
    return typeof etage === "number" || (typeof etage === "string" && etage.trim() !== "");
  };

  const Show = () => {
    setAjouter(true);
  };

  useEffect(() => {
    dispatch(fetchAPPs());
  }, [dispatch]);

  const handleSubmit = () => {
    if (!isValidPrice(FormData.prix) || !isValidEtage(FormData.etage)) {
      showAlert("Prix ou étage invalide", "error");
      return;
    }

    const fieldsWithErrors = Object.keys(FormData).filter(
      (field) => FormData[field].trim() === ""
    );

    if (fieldsWithErrors.length > 0) {
      showAlert(
        `Veuillez remplir tous les champs: ${fieldsWithErrors.join(", ")}`,
        "error"
      );
      return;
    }

    dispatch(CreateAPP(FormData));
    clearForm();
    showAlert("Appartement ajouté avec succès!");
  };

  const clearForm = () => {
    setType("submit");
    setStatus(false);
    setFormdata({
      etage: "",
      numero: "",
      immeuble: "",
      client: "",
      address: "",
      prix: ""
    });
    setAjouter(false);
  };

  const handleDeleteConfirm = () => {
    dispatch(DeleteAPP(deleteId));
    setDeleteDialogOpen(false);
    showAlert("Appartement supprimé avec succès!");
  };

  const supprimer = (id) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleupdate = (app) => {
    setStatus(true);
    setSelectedId(app._id);
    setFormdata(app);
    setType("update");
  };

  const changerStatus = () => {
    setStatus(true);
    setAjouter(false);
  };

  const update = () => {
    if (!isValidPrice(FormData.prix) || !isValidEtage(FormData.etage)) {
      showAlert("Prix ou étage invalide", "error");
      return;
    }

    dispatch(UpdateAPP(FormData, selectedId));
    clearForm();
    showAlert("Appartement mis à jour avec succès!");
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      bgcolor: 'background.default'
    }}>
      <Container maxWidth={false} sx={{ py: 2 }}>
        {/* Logo Header */}
        <Box sx={{ 
          mb: 3, 
          p: 2, 
          display: 'flex', 
          justifyContent: isMobile ? 'center' : 'flex-start',
          boxShadow: 1,
          borderRadius: 1,
          bgcolor: 'white'
        }}>
          <SyndicLogo />
        </Box>

        {/* Main Content */}
        <Grid container spacing={3}>
          {/* Sidebar */}
		  <Grid item xs={12} md={3} lg={2}>
  <Sidebar />
</Grid>
          
          {/* Main Content Area */}
          <Grid item xs={12} md={9} lg={10}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      
<SyndicDashboard
  numApartments={Apps.length}
  numUsers={150}
  totalAmount={75000}
  currency="dhs"
/>
              <Appartement
                show={Show}
                ajouter={ajouter}
                handlClick={changerStatus}
                supprimer={supprimer}
                update={handleupdate}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Form Component */}
        <Form
          type={type}
          update={update}
          status={status}
          clear={clearForm}
          setStatus={setStatus}
          formData={FormData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />

        {/* Alert Snackbar */}
        <Snackbar
          open={alertOpen}
          autoHideDuration={6000}
          onClose={() => setAlertOpen(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={() => setAlertOpen(false)}
            severity={alertSeverity}
            variant="filled"
            sx={{ width: '100%' }}
            elevation={6}
          >
            {alertMessage}
          </Alert>
        </Snackbar>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          aria-labelledby="delete-dialog-title"
        >
          <DialogTitle id="delete-dialog-title">
            Confirmer la suppression
          </DialogTitle>
          <DialogContent>
            <Typography>
              Êtes-vous sûr de vouloir supprimer cet appartement ?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => setDeleteDialogOpen(false)}
              color="primary"
            >
              Annuler
            </Button>
            <Button 
              onClick={handleDeleteConfirm} 
              color="error" 
              variant="contained"
              autoFocus
            >
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Dashboard;