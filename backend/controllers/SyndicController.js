import {validator,SyndicShema} from "../validation/JoiShema.js";
import Syndic from "../models/Syndic.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
/**
 * @async
 * @route {GET} /Syndic
 * @access public
 * @returns {Promise<Array<Document>>} A Promise that resolves to an array of documents representing all Syndics.
 */
const getAllSyndic = async (req, res) => {
  
	try {
	  const syndics = await Syndic.find()
	  res.json(syndics);
	} catch (error) {
	  res.status(500).json({ message: error.message });
	}
  };

/**
 * @async
 * @route {GET} /Syndic
 * @access public 
 * @returns {Promise<Array<Document>>} 
 */
const getSyndic= async (req, res) => {
	
	const {id}=req.params;
	try {
	  const syndic = await Syndic.findById(id);
	
	
	  return res.json(syndic);
	} catch (error) {
	  return res.status(500).json({ message: error.message });
	}
  };
  const Search= async (req, res) => {
	
	const {immeuble,numero,etage} = req.query;
	const query = {};
  
	if (immeuble) {
	  query.immeuble = { $regex: immeuble, $options: 'i' };
	}
  
	try {
	  const syndics = await Syndic.find(query);
	  return res.json(syndics);
	} catch (error) {
	  return res.status(500).json({ message: error.message });
	}
  };
/**
 * CREATE new Syndic.
 * @async
 * @route {Syndic} /Syndic
 * @access public
 * @returns {Promise<Document>} A Promise that resolves to an array of documents representing all Syndics.
 */
const CreateSyndic = async (req, res) => {
	const body = req.body;
    validator(SyndicShema, body);
    const existingsyndic = await Syndic.findOne({ email: body.email });
    if (existingsyndic) {
        return res.status(400).json({ message: "Un compte avec cet email existe déjà" });
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const syndic = await Syndic.create({ ...body, password: hashedPassword });

    return res.status(201).json(syndic);
};

/**
 * Update new Syndic.
 * @async
 * @route {PATCH} /Syndic/id
 * @access public
 * @returns {Promise<Document>} A Promise that resolves  documents representing Syndic.
 */
const UpadetSyndic = async (req, res) => {
    validator(SyndicShema, req.body);
    const { id } = req.params;
    const syndic = await Syndic.findByIdAndUpdate(id, res.body);
    res.status(200).json(syndic);
};

/**
 * Update new Syndic.
 * @async
 * @route {DELETE} /Syndic/id
 * @access public
 * @returns {Promise<Document>} A Promise that resolves to an array of documents representing all Syndic.
 */

const DeleteSyndic = async (req, res) => {
    const { id } = req.params;
    const syndic = await Syndic.findByIdAndDelete(id);
    res.status(200).json(syndic);
};

/**
 * @async
 * @route {PATCH} /Syndic/likes/id
 * @access public
 * @returns {Promise<Document>} A Promise that resolves todocuments representing all Syndic.
 */

export { getAllSyndic, CreateSyndic, UpadetSyndic, DeleteSyndic, getSyndic, Search };