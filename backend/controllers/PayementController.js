// controllers/paymentController.js
import Payment from '../models/Payement.js';
import Charge from '../models/Charge.js';

export const createPayment = async (req, res) => {
  try {
    const { client, chargeId, datePayment } = req.body;
    
    // Vérifier si la charge existe
    const charge = await Charge.findById(chargeId);
    if (!charge) {
      return res.status(404).json({ message: 'Charge non trouvée' });
    }

    const payment = new Payment({
      client,
      charge: chargeId,
      datePayment: datePayment || new Date()
    });

    await payment.save();

    // Mettre à jour le statut de la charge
    charge.status = 'PAID';
    await charge.save();

    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('charge')
      .sort({ datePayment: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFinancialSummary = async (req, res) => {
  try {
    // Calculer le montant total reçu
    const payments = await Payment.find().populate('charge');
    const totalRecu = payments.reduce((sum, payment) => 
      sum + payment.charge.montant, 0);

    // Calculer le montant total des charges
    const charges = await Charge.find();
    const totalCharges = charges.reduce((sum, charge) => 
      sum + charge.montant, 0);

    // Calculer les charges impayées
    const chargesImpayees = charges
      .filter(charge => charge.status === 'PENDING' || charge.status === 'OVERDUE')
      .reduce((sum, charge) => sum + charge.montant, 0);

    // Calculer le bénéfice
    const benefice = totalRecu - totalCharges;

    res.json({
      totalRecu,
      totalCharges,
      chargesImpayees,
      benefice,
      nombrePaiements: payments.length,
      nombreCharges: charges.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPaymentsByPeriod = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = {
      datePayment: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    };

    const payments = await Payment.find(query)
      .populate('charge')
      .sort({ datePayment: -1 });

    const totalPeriod = payments.reduce((sum, payment) => 
      sum + payment.charge.montant, 0);

    res.json({
      payments,
      totalPeriod,
      nombrePaiements: payments.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
