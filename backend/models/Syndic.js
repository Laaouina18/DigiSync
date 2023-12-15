import mongoose from "mongoose";
const SyndicSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "please enter your First Name"]
	},
	lastName: {
		type: String,
		required: [true, "please enter your Last Name"]
	},
	email: {
		type: String,
		required: [true, "please enter your email"]
	},
	password: {
		type: String,
		required: [true, "please enter your password"]
	},
  immeuble:{
	type:String,
	required:[true,, "please enter your Immeuble"]
  },
  phone:{
	type:String,
	required:[true,, "please enter your Immeuble"]
  },
  role:{
    type:String,
	default:"Syndic"
  }

});

const Syndic = mongoose.model('Syndic', SyndicSchema);

export default Syndic;
