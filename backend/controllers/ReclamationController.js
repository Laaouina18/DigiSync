// controllers/reclamationController.js
import Reclamation from '../models/Reclamation.js';


  export const createReclamation=async(req, res) => {
    try {
      const reclamation = new Reclamation({
        ...req.body,
        client: req.user.id
      });
      await reclamation.save();
      res.status(201).json(reclamation);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  export const getReclamations=(req, res) => {
    try {
      const { status, appartementId } = req.query;
      let query = {};

      if (req.user.role === 'CLIENT') {
        query.client = req.user.id;
      }
      if (status) query.status = status;
      if (appartementId) query.appartement = appartementId;

      const reclamations = await Reclamation.find(query)
        .populate('appartement')
        .populate('client', '-password')
        .sort({ createdAt: -1 });

      res.status(200).json(reclamations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  export const  updateReclamation=(req, res) => {
    try {
      const { id } = req.params;
      const updatedReclamation = await Reclamation.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedReclamation);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  export const addComment =async(req, res)  =>{
    try {
      const { id } = req.params;
      const { texte } = req.body;

      const reclamation = await Reclamation.findByIdAndUpdate(
        id,
        {
          $push: {
            commentaires: {
              auteur: req.user.id,
              texte,
              date: new Date()
            }
          }
        },
        { new: true }
      );

      res.status(200).json(reclamation);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  export const addPhotos=async(req, res) => {
    try {
      const { id } = req.params;
      const { photos } = req.body;

      const reclamation = await Reclamation.findByIdAndUpdate(
        id,
        { $push: { photos: { $each: photos } } },
        { new: true }
      );

      res.status(200).json(reclamation);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
