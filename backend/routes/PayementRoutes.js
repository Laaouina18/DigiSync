import express from 'express';
import {
  createPayment,
  getPayments,
  getFinancialSummary,
  getPaymentsByPeriod
} from '../controllers/PayementController.js';

const router = express.Router();

router.post('/', createPayment);
router.get('/:id', getPayments);
router.get('/summary/:id', getFinancialSummary);
router.get('/period/:id', getPaymentsByPeriod);

export default router;