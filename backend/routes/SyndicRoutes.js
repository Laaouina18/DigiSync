// routes/syndicRoutes.js
import express from 'express';
import { authenticateJWT, isSyndic } from '../middlewares/auth.js';
import * as syndicController from '../controllers/SyndicController.js';
import * as chargeController from '../controllers/chargeController.js';

const router = express.Router();

router.use(authenticateJWT);
router.use(isSyndic);

// Immeubles
router.get('/immeubles', syndicController.getAllImmeubles);
router.post('/immeubles', syndicController.createImmeuble);
// router.get('/immeubles/:id', syndicController.getImmeuble);
router.put('/immeubles/:id', syndicController.updateImmeuble);
router.delete('/immeubles/:id', syndicController.deleteImmeuble);

// Charges
router.post('/charges', chargeController.createCharge);
router.get('/charges', chargeController.getCharges);
// router.get('/charges/:id', chargeController.getCharge);
router.put('/charges/:id', chargeController.updateCharge);
router.delete('/charges/:id', chargeController.deleteCharge);

export default router;