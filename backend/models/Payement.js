// models/Payment.js
import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  client: {
    nom: String,
    prenom: String,
    email: String,
    telephone: String
  },
 
  charge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Charge',
    required: true
  },
  datePayment: Date
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;