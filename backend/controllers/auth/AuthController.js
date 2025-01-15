import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../models/User.js';
import Syndic from '../../models/Syndic.js';


  export const  register= async(req, res)  =>{

    try {
      const { username,email, password, role, firstName, lastName, phone } = req.body;
      
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email déjà utilisé' });
      }

      const user = new User({
        username,
        email,
        password,
        role
      });
      
      await user.save();

      if (role === 'SYNDIC') {
        const syndic = new Syndic({
          userId: user._id,
          firstName,
          lastName,
          phone
        });
        await syndic.save();
      }

      res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  export const  login= async(req, res) => {
    console.log(req.body)
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Mot de passe incorrect' });
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(200).json({ token, user: { id: user._id, email: user.email, role: user.role } });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  export const  changePassword=async(req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const user = await User.findById(req.user.id);

      const validPassword = await bcrypt.compare(oldPassword, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Ancien mot de passe incorrect' });
      }

      user.password = newPassword;
      await user.save();

      res.status(200).json({ message: 'Mot de passe modifié avec succès' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
