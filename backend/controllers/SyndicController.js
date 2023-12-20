import { validator, SyndicShema } from "../validation/JoiShema.js";
import Syndic from "../models/Syndic.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Appartement from '../models/Appartment.js';
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
		throw new error;
	}
};
const getApartmentsForSyndic = async (req, res) => {
	try {
		const { id } = req.params;

		const apartments = await Appartement.find({ syndic: id });

		return res.status(200).json(apartments);
	} catch (error) {
		throw new error;
	}
};
/**
 * @async
 * @route {GET} /Syndic
 * @access public 
 * @returns {Promise<Array<Document>>} 
 */
const getSyndic = async (req, res) => {

	const { id } = req.params;
	try {
		const syndic = await Syndic.findById(id);


		return res.json(syndic);
	} catch (error) {
		throw new error;
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
	try {
		const body = req.body;
		validator(SyndicShema, body);
		const existingsyndic = await Syndic.findOne({ email: body.email });
		if (existingsyndic) {
			return res.status(400).json({ message: "Un compte avec cet email existe déjà" });
		}
		const hashedPassword = await bcrypt.hash(body.password, 10);
		const syndic = await Syndic.create({ ...body, password: hashedPassword });
	} catch (error) {
		throw new error
	}
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
	try {
		validator(SyndicShema, req.body);
		const { id } = req.params;
		const syndic = await Syndic.findByIdAndUpdate(id, res.body);
		res.status(200).json(syndic);
	} catch (error) {
		throw new error;
	}

};

/**
 * Update new Syndic.
 * @async
 * @route {DELETE} /Syndic/id
 * @access public
 * @returns {Promise<Document>} A Promise that resolves to an array of documents representing all Syndic.
 */

const DeleteSyndic = async (req, res) => {
	try {
		const { id } = req.params;
		const syndic = await Syndic.findByIdAndDelete(id);
		res.status(200).json(syndic);
	} catch (error) {
		throw new error;
	}

};
export { getAllSyndic, CreateSyndic, UpadetSyndic, DeleteSyndic, getSyndic, getApartmentsForSyndic };