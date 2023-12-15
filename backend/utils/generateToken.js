import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  const payload = {
    userId: user._id,
    username: user.firstName,
  };

  const options = {
  expiresIn: '2h',
  };

 const token = jwt.sign(payload, process.env.JWT_SECRET, options);
   return token;
};

export { generateToken };
