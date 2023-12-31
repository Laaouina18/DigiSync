import mongoose from "mongoose";
import Payement from "./Payement.js";
import Syndic from "./Syndic.js"
const appartementSchema = new mongoose.Schema({
	numero: {
		type: String,
		required: true,
	},
	etage: {
		type: String,
		required: true,
	},
	client: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	prix: {
		type: String,
		required: true
	},
	immeuble: {
		type: String,
		required: true
	},
	payement: [{
		type: mongoose.Schema.Types.ObjectId, ref: 'Payement'
	}],
	syndic:{
		type:String,
		required:true
	}
});
const Appartement = mongoose.model('Appartement', appartementSchema);
export default Appartement;
