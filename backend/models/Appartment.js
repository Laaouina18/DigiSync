// models/Appartement.js
import mongoose from 'mongoose';

const appartementSchema = new mongoose.Schema({
  numero: {
    type: String,
    required: true
  },
  etage: String,
  superficie: Number,
  client: {
    nom: String,
    prenom: String,
    email: String,
    telephone: String
  },
  prix: Number,
  immeuble: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Immeuble',
    required: true
  },
  syndic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Syndic',
    required: true
  },
  payments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  }],
  charges: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Charge'
  }]
}, { timestamps: true });

const Appartement = mongoose.model('Appartement', appartementSchema);

export default Appartement;
