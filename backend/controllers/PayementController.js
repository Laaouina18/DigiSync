import Payement from "../models/Payement.js";
import Appartement from "../models/Appartment.js";

const createPayement = async (req, res) => {
  try {
    const { date, appartement } = req.body;

    const payment = await Payement.create(req.body);

    if (!payment) {
      return res.status(400).json({ message: "Error creating payment" });
    }
    const appartementToUpdate = await Appartement.findById(appartement);

    if (!appartementToUpdate) {
      return res.status(404).json({ message: "Appartement not found" });
    }
    appartementToUpdate.payement.push(payment);
    await appartementToUpdate.save();

    return res.status(200).json(payment);
  } catch (error) {
    throw new error;
  }
};
const getPayement = async (req,res)=>{
try {
	const payment = await Payement.find();
	if(!payment){
		return res.status(400).json({message:"n'exite pas"})
	}
	return res.status(200).json(payment);
} catch (error) {
	throw new error;
}
 
}
export { createPayement ,getPayement };
