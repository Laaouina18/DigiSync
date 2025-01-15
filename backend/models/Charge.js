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
    enum: ['MENSUEL', 'autre', 'ANNUEL', 'PONCTUEL'],
    default: 'autre'
  },
  immeuble: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Immeuble'
  },
  payerType: {
    type: String,
    enum: ['client', 'syndic'], // Enum pour identifier le type de payeur
    required: true
  },
  payerDetails: {
    type: Object, // Détails du payeur
    required: true,
    validate: {
      validator: function (value) {
        // Validation conditionnelle pour s'assurer que les détails correspondent au type de payeur
        if (this.payerType === 'client') {
          return value.nom && value.prenom; // Client doit avoir nom et prénom
        } else if (this.payerType === 'syndic') {
          return value.nom; // Syndic doit avoir un nom
        }
        return false;
      },
      message: "Les détails du payeur ne sont pas valides pour le type spécifié."
    }
  }
}, { timestamps: true });

const Charge = mongoose.model('Charge', chargeSchema);
export default Charge;
