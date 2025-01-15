// middleware/auth.js
import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token invalide' });
    localStorage.clear();
  }
};

export const isSyndic = (req, res, next) => {
  if (req.user.role !== 'SYNDIC') {
    return res.status(403).json({ message: 'Accès non autorisé' });
  }
  next();
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Accès non autorisé' });
  }
  next();
};