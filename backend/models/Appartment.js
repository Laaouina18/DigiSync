import mongoose from "mongoose";
const appartementSchema = new mongoose.Schema({
  numero: {
    type: String,
    required: true,
  },
  etage: {
    type: Number,
    required: true,
  },
  client:{
	type:String,
	required:true
  },
  address:{
	type:String,
	required:true
  },
  immeuble:{
	type:String,
	required:true
  }

});

const Appartement = mongoose.model('Appartement', appartementSchema);

export default Appartement;