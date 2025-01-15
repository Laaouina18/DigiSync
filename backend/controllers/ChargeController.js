// controllers/chargeController.js
import Charge from '../models/Charge.js';
import Immeuble from '../models/Immeuble.js';
import Appartement from '../models/Appartment.js';


export const createCharge = async (req, res) => {
  console.log("im", req.body);
  try {
    const { immeuble, payerType, payerDetails, ...chargeData } = req.body;

    // Validation supplémentaire si nécessaire
    if (!['client', 'syndic'].includes(payerType)) {
      return res.status(400).json({ message: "Type de payeur invalide." });
    }

    if (payerType === 'client') {
      if (!payerDetails?.nom || !payerDetails?.prenom) {
        return res
          .status(400)
          .json({ message: "Le client doit avoir un nom et un prénom." });
      }
    } else if (payerType === 'syndic' && !payerDetails?.nom) {
      return res
        .status(400)
        .json({ message: "Le syndic doit avoir un nom." });
    }

    // Création de la charge
    const charge = new Charge({
      ...chargeData,
      payerType,
      payerDetails,
      immeuble,
    });

    await charge.save();

    // Mise à jour des références dans l'immeuble
    await Immeuble.findByIdAndUpdate(immeuble, {
      $push: { charges: charge._id },
    });

    res.status(201).json(charge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCharges= async(req, res) => {
    try {
      // const { immeubleId } = req.query;
      // let query = {};

      // if (immeubleId) query.immeuble = immeubleId;
    
      const charges = await Charge.find()
        .populate('immeuble')
       
      res.status(200).json(charges);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

export const  updateCharge=async(req, res)=>{
    try {
      const { id } = req.params;
      const updatedCharge = await Charge.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedCharge);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

export const   deleteCharge=async(req, res) => {
    try {
      const { id } = req.params;
      const charge = await Charge.findById(id);

      // Supprimer les références
      await Immeuble.findByIdAndUpdate(
        charge.immeuble,
        { $pull: { charges: id } }
      );

  

      await Charge.findByIdAndDelete(id);
      res.status(200).json({ message: 'Charge supprimée avec succès' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

