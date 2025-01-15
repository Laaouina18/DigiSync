// models/Syndic.js
import mongoose from 'mongoose';

const syndicSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  firstName: String,
  lastName: String,
  phone: String,
  immeubles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Immeuble'
  }]
}, { timestamps: true });

const Syndic = mongoose.model('Syndic', syndicSchema);
export default Syndic;
