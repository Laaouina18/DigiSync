import express from 'express';
import {
  createPayment,
  getPayments,
  getFinancialSummary,
  getPaymentsByPeriod
} from '../controllers/PayementController.js';

const router = express.Router();

router.post('/', createPayment);
router.get('/', getPayments);
router.get('/summary', getFinancialSummary);
router.get('/period', getPaymentsByPeriod);

export default router;