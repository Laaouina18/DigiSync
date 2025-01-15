// models/Reclamation.js
import mongoose from 'mongoose';
import Payment from './Payement';

const reclamationSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['NOUVELLE', 'EN_COURS', 'RESOLUE'],
    default: 'NOUVELLE'
  },
  priorite: {
    type: String,
    enum: ['BASSE', 'MOYENNE', 'HAUTE'],
    default: 'MOYENNE'
  },
  type: String,
  appartement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appartement',
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  photos: [{
    url: String,
    description: String
  }],
  commentaires: [{
    auteur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    texte: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  dateResolution: Date
}, { timestamps: true });

const Reclamation = mongoose.model('Reclamation', reclamationSchema);
export default Payment;