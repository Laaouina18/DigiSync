// controllers/syndicController.js
import Syndic from '../models/Syndic.js';
import Immeuble from '../models/Immeuble.js';
import Appartement from '../models/Appartment.js';


  // Gestion des immeubles
 export const   getAllImmeubles= async(req, res)  =>{
    try {
      const syndic = await Syndic.findOne({ userId: req.user.id });
      const immeubles = await Immeuble.find({ syndic: syndic._id })
        .populate('appartements')
        .populate('charges');
      res.status(200).json(immeubles);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  export const createImmeuble=async(req, res)  =>{
 
    try {
      const syndic = await Syndic.findOne({ userId: req.body.user });
      const immeuble = new Immeuble({
        ...req.body,
        syndic: syndic._id
      });
      await immeuble.save();
      
      syndic.immeubles.push(immeuble._id);
      await syndic.save();
      
      res.status(201).json(immeuble);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  export const updateImmeuble= async(req, res) =>{
    try {
      const { id } = req.params;
      const updatedImmeuble = await Immeuble.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedImmeuble);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  export const  deleteImmeuble=async(req, res) => {
    try {
      const { id } = req.params;
      await Appartement.deleteMany({ immeuble: id });
      await Immeuble.findByIdAndDelete(id);
      res.status(200).json({ message: 'Immeuble supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Gestion des appartements
  export const  createAppartementc=async(req, res) => {
    try {
      const appartement = new Appartement({
        ...req.body,
        syndic: req.user.id
      });
      await appartement.save();

      const immeuble = await Immeuble.findById(req.body.immeuble);
      immeuble.appartements.push(appartement._id);
      await immeuble.save();

      res.status(201).json(appartement);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  export const  getAppartements= async(req, res) => {
    try {
      const { immeubleId } = req.params;
      const appartements = await Appartement.find({ immeuble: immeubleId })
        .populate('payments')
        .populate('charges');
      res.status(200).json(appartements);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

