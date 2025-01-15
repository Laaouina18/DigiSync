// models/Immeuble.js
import mongoose from 'mongoose';

const immeubleSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  adresse: {
    type: String,
    required: true
  },
  nombreEtages: Number,
  nombreAppartements: Number,
  syndic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Syndic',
    required: true
  },
  charges: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Charge'
  }],
  appartements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appartement'
  }]
}, { timestamps: true });

const Immeuble = mongoose.model('Immeuble', immeubleSchema);
export default Immeuble;