// models/Charge.js
import mongoose from 'mongoose';

const chargeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  montant: {
    type: Number,
    required: true
  },
  description: String,
  dateEcheance: Date,
  status: {
    type: String,
    enum: ['PENDING', 'PAID', 'OVERDUE'],
    default: 'PENDING'
  },
  periodicite: {
    type: String,
    enum: ['MENSUEL', 'TRIMESTRIEL', 'ANNUEL', 'PONCTUEL'],
    default: 'MENSUEL'
  },
  immeuble: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Immeuble'
  }
}, { timestamps: true });

const Charge = mongoose.model('Charge', chargeSchema);
export default Charge;