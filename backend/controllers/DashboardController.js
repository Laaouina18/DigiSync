// controllers/dashboardController.js
import Payment from '../models/Payment.js';
import Charge from '../models/Charge.js';
import Reclamation from '../models/Reclamation.js';
import Syndic from '../models/Syndic.js';
import Immeuble from '../models/Immeuble.js';

  export const  getSyndicDashboard=(req, res) => {
    try {
      const syndic = await Syndic.findOne({ userId: req.user.id });

      // Obtenir tous les immeubles du syndic
      const immeubles = await Immeuble.find({ syndic: syndic._id });
      const immeubleIds = immeubles.map(i => i._id);

      // Obtenir tous les appartements des immeubles
      const appartements = await Appartement.find({ 
        immeuble: { $in: immeubleIds } 
      });
      const appartementIds = appartements.map(a => a._id);

      // Statistiques des paiements
      const payments = await Payment.aggregate([
        {
          $match: {
            appartement: { $in: appartementIds }
          }
        },
        {
          $group: {
            _id: '$status',
            total: { $sum: '$amount' },
            count: { $sum: 1 }
          }
        }
      ]);

      // Statistiques des charges
      const charges = await Charge.aggregate([
        {
          $match: {
            immeuble: { $in: immeubleIds }
          }
        },
        {
          $group: {
            _id: '$status',
            total: { $sum: '$montant' },
            count: { $sum: 1 }
          }
        }
      ]);

      // Statistiques des réclamations
      const reclamations = await Reclamation.aggregate([
        {
          $match: {
            appartement: { $in: appartementIds }
          }
        },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]);

      // Taux d'occupation
      const totalAppartements = appartements.length;
      const occupiedAppartements = appartements.filter(a => a.client).length;
      const occupancyRate = (occupiedAppartements / totalAppartements) * 100;

      res.status(200).json({
        immeubles: {
          total: immeubles.length,
          list: immeubles
        },
        appartements: {
          total: totalAppartements,
          occupied: occupiedAppartements,
          occupancyRate
        },
        payments,
        charges,
        reclamations
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  export const  getClientDashboard=(req, res) => {
    try {
      // Obtenir les appartements du client
      const appartements = await Appartement.find({
        'client.email': req.user.email
      });
      const appartementIds = appartements.map(a => a._id);

      // Paiements récents
      const recentPayments = await Payment.find({
        appartement: { $in: appartementIds }
      })
      .sort({ datePayment: -1 })
      .limit(5);

      // Charges à venir
      const upcomingCharges = await Charge.find({
        appartements: { $in: appartementIds },
        dateEcheance: { $gte: new Date() }
      })
      .sort({ dateEcheance: 1 })
      .limit(5);

      // Réclamations actives
      const activeReclamations = await Reclamation.find({
        appartement: { $in: appartementIds },
        status: { $ne: 'RESOLUE' }
      })
      .sort({ createdAt: -1 });

      // Résumé des paiements
      const paymentSummary = await Payment.aggregate([
        {
          $match: {
            appartement: { $in: appartementIds }
          }
        },
        {
          $group: {
            _id: {
              month: { $month: '$datePayment' },
              year: { $year: '$datePayment' }
            },
            total: { $sum: '$amount' }
          }
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 12 }
      ]);

      res.status(200).json({
        appartements,
        recentPayments,
        upcomingCharges,
        activeReclamations,
        paymentSummary
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

