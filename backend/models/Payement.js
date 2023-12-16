import mongoose from "mongoose";
import Appartement from "./Appartment.js";
const PaymentShema = new mongoose.Schema({
	date: {
      month:{type:Number,required:true},
	  year:{type:Number,required:true}
	},
	appartement: {
		type: mongoose.Schema.Types.ObjectId, ref: 'Appartement',
		required: true
	}
})

const Payement = mongoose.model('Payement', PaymentShema);
export default Payement;