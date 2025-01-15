// controllers/paymentController.js
import Payment from '../models/Payement.js';
import Charge from '../models/Charge.js';
import Syndic from '../models/Syndic.js';
export const createPayment = async (req, res) => {
  try {
    const { client, chargeId, datePayment,syndic } = req.body;
    
    // Vérifier si la charge existe
    const charge = await Charge.findById(chargeId);
    if (!charge) {
      return res.status(404).json({ message: 'Charge non trouvée' });
    }

    const payment = new Payment({
      client,
      syndic:syndic,
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
   const {id}=req.params;
    const payments = await Payment.find({syndic:id})
      .populate('charge')
      .sort({ datePayment: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFinancialSummary = async (req, res) => {
  try {
    const { id } = req.params;
console.log(id)
    // Filtrer les charges liées à l'immeuble dont le syndic correspond à l'id
    const charges = await Charge.find().populate('immeuble');
    
    const syndicID = await Syndic.find({userId:id})
    const syndicCharges = charges.filter(charge => charge.immeuble?.syndic !== syndicID._id);

    // Calculer le montant total des charges
    const totalCharges = syndicCharges.reduce((sum, charge) => sum + charge.montant, 0);

    // Calculer les charges impayées
    const chargesImpayees = syndicCharges
      .filter(charge => charge.status === 'PENDING' || charge.status === 'OVERDUE')
      .reduce((sum, charge) => sum + charge.montant, 0);

    // Distinguer les montants reçus par le client et par le syndic
    const totalRecuParClient = syndicCharges
      .filter(charge => charge.status === 'PAID' && charge.payerType === 'client')
      .reduce((sum, charge) => sum + charge.montant, 0);

    const totalRecuParSyndic = syndicCharges
      .filter(charge => charge.status !== 'PAID' && charge.payerType !== 'syndic')
      .reduce((sum, charge) => sum + charge.montant, 0);

    const totalRecu = totalRecuParClient + totalRecuParSyndic;

    // Calculer le bénéfice du syndic
    const benefice = totalRecuParClient - totalRecuParSyndic;

    // Réponse JSON
    res.json({
      totalRecu,
      totalCharges,
      chargesImpayees,
      benefice,
      totalRecuParClient,
      totalRecuParSyndic,
      nombreCharges: syndicCharges.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getPaymentsByPeriod = async (req, res) => {
  try {
    const {id}=req.params;
    const { startDate, endDate } = req.query;
    const query = {
      datePayment: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      },
syndic:id
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
