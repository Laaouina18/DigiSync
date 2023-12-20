import mongoose from "mongoose";
import Appartement from "./Appartment.js"

const SyndicSchema = new mongoose.Schema({
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	
	},
	email: {
		type: String,
	
	},
	password: {
		type: String,
		
	},
  immeuble:{
	type:String,

  },
  phone:{
	type:String,
	
  },
  role:{
    type:String,
	default:"Syndic"
  },
  Appartements:
	[{
		type:String}
	]
  

});

const Syndic = mongoose.model('Syndic', SyndicSchema);

export default Syndic;
