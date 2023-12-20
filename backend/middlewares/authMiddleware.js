import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const BearerToken = req.headers.authorization;
console.log("hklfkglki",req.headers)
    if (BearerToken) {
        const token = BearerToken.split("Bearer ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
              throw new err;
            }
            req.user = decoded;
            next();
        });
    }else {
        throw new Error("no token");
    }
};

export { authMiddleware };