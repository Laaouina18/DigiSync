import {validator,appartementSchema} from "../validation/JoiShema.js";
import Appartement from "../models/Appartment.js";
import Syndic from "../models/Syndic.js";

/**
 * @async
 * @route {GET} /Appartement
 * @access public
 * @returns {Promise<Array<Document>>} A Promise that resolves to an array of documents representing all Appartements.
 */
const getAllApp = async (req, res) => {
  
	try {
	  const appartements = await Appartement.find(req.body)
	  res.json(appartements);
	} catch (error) {
	 throw  error;
	}
  };

/**
 * @async
 * @route {GET} /Appartement
 * @access public 
 * @returns {Promise<Array<Document>>} 
 */
const getApp= async (req, res) => {
	
	const {id}=req.params;
	try {
	  const appartement = await Appartement.findById(id);

	  return res.json(appartement);
	} catch (error) {
		throw  error;;
	}
  };
/**
 * CREATE new Appartement.
 * @async
 * @route {Appartement} /Appartement
 * @access public
 * @returns {Promise<Document>} A Promise that resolves to an array of documents representing all Appartements.
 */


const CreateApp = async (req, res) => {
    try {
        const { syndic } = req.body;
        validator(appartementSchema, req.body);

        const appartementCreated = await Appartement.create(req.body);
        const syndictoUpdate = await Syndic.findById(syndic);

        if (!syndictoUpdate) {
            return res.status(404).json({ message: "Syndic not found" });
        }
		
        syndictoUpdate.Appartements.push(appartementCreated);
        await syndictoUpdate.save();

        res.status(201).json(appartementCreated);
    } catch (error) {
		throw  error;
    }
};



/**
 * Update new Appartement.
 * @async
 * @route {PATCH} /Appartement/id
 * @access public
 * @returns {Promise<Document>} A Promise that resolves  documents representing Appartement.
 */
const UpadetApp = async (req, res) => {
	try {
		validator(appartementSchema, req.body);
		const { id } = req.params;
		const appartement = await Appartement.findByIdAndUpdate(id, req.body,{new:true});
		res.status(200).json(appartement);
	} catch (error) {
		throw  error;
	}

};

/**
 * Update new Appartement.
 * @async
 * @route {DELETE} /Appartement/id
 * @access public
 * @returns {Promise<Document>} A Promise that resolves to an array of documents representing all Appartement.
 */

const DeleteApp = async (req, res) => {
	try {
		const { id } = req.params;
		const appartement = await Appartement.findByIdAndDelete(id);
		res.status(200).json(appartement);
	} catch (error) {
		throw  error;
	}
 
};


export { getAllApp, CreateApp, UpadetApp, DeleteApp, getApp};