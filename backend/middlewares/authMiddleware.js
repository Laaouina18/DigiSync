import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const BearerToken = req.headers.authorization;

    if (BearerToken) {
        if (BearerToken.length > 500) {
          next();
        }else{


        const token = BearerToken.split("Bearer ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Token invalide' });
            }
            req.user = decoded;
            next();
        });
    } }else {
        throw new Error("no token");
    }
};

export { authMiddleware };