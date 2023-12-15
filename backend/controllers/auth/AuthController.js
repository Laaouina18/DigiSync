import Syndic from "../../models/Syndic.js";
import { SyndicShema, validator } from "../../validation/JoiShema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { generateToken } from "../../utils/generateToken.js";


/**
 * @async
 * @route {GET}/
 * @access public
 * @returns {Promise<Document>}
 */
const Login = async (req, res) => {
    const { email, password } = req.body;

    const syndic = await Syndic.findOne({ email });

    if (!syndic) {
        return res.status(400).json({ message: "Ce compte n'existe pas" });
    }

    const isPasswordValid = await bcrypt.compare(password, syndic.password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: "Mot de passe incorrect" });
    }
    const syndicEx = {
        _id: syndic._id,
        email: syndic.email,
		firstName:syndic.firstName,
		lastName:syndic.lastName
    };

    const token = generateToken(syndic);
    return res.status(200).json({ syndic: syndicEx, token });
};


export {  Login };
