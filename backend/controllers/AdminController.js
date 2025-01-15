// controllers/adminController.js
import User from '../models/User.js';
import Syndic from '../models/Syndic.js';


  export const  getAllSyndics=async(req, res) => {
    try {
      const syndics = await Syndic.find()
        .populate('userId', '-password')
        .populate('immeubles');
      res.status(200).json(syndics);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  export const createSyndic =async(req, res)  =>{
    try {
      const { email, password, firstName, lastName, phone } = req.body;

      const user = new User({
        email,
        password,
        role: 'SYNDIC'
      });
      await user.save();

      const syndic = new Syndic({
        userId: user._id,
        firstName,
        lastName,
        phone
      });
      await syndic.save();

      res.status(201).json(syndic);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  export const  deleteSyndic =async(req, res) => {
    try {
      const { id } = req.params;
      const syndic = await Syndic.findById(id);
      
      await User.findByIdAndDelete(syndic.userId);
      await Syndic.findByIdAndDelete(id);

      res.status(200).json({ message: 'Syndic supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  export const getStatistics=async(req, res)  =>{
    try {
      const totalSyndics = await Syndic.countDocuments();
      const totalImmeubles = await Immeuble.countDocuments();
      const totalAppartements = await Appartement.countDocuments();
      const totalPayments = await Payment.countDocuments(); const totalReclamations = await Reclamation.countDocuments();
      
      // Statistiques des paiements
      const paymentStats = await Payment.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
            totalAmount: { $sum: '$amount' }
          }
        }
      ]);

      // Statistiques des réclamations
      const reclamationStats = await Reclamation.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]);

      res.status(200).json({
        totalSyndics,
        totalImmeubles,
        totalAppartements,
        totalPayments,
        totalReclamations,
        paymentStats,
        reclamationStats
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  export const generateReport=(req, res)  =>{
    try {
      const { startDate, endDate, type } = req.query;
      let report = {};

      switch (type) {
        case 'payments':
          report = await Payment.aggregate([
            {
              $match: {
                datePayment: {
                  $gte: new Date(startDate),
                  $lte: new Date(endDate)
                }
              }
            },
            {
              $group: {
                _id: {
                  month: { $month: '$datePayment' },
                  year: { $year: '$datePayment' }
                },
                totalAmount: { $sum: '$amount' },
                count: { $sum: 1 }
              }
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } }
          ]);
          break;

        case 'charges':
          report = await Charge.aggregate([
            {
              $match: {
                dateEcheance: {
                  $gte: new Date(startDate),
                  $lte: new Date(endDate)
                }
              }
            },
            {
              $group: {
                _id: '$type',
                totalAmount: { $sum: '$montant' },
                count: { $sum: 1 }
              }
            }
          ]);
          break;

        case 'reclamations':
          report = await Reclamation.aggregate([
            {
              $match: {
                createdAt: {
                  $gte: new Date(startDate),
                  $lte: new Date(endDate)
                }
              }
            },
            {
              $group: {
                _id: '$status',
                count: { $sum: 1 }
              }
            }
          ]);
          break;
      }

      res.status(200).json(report);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

