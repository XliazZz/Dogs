const jwt = require('jsonwebtoken');
const { AUTH_SECRET, AUTH_EXPIRES, AUTH_ROUNDS } = process.env;

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(404).json({
      auth: false,
      message: 'No token provider'
    });
  };
  const decoded = jwt.verify(token, process.env.AUTH_SECRET);
  req.userId = decoded.id;
  next();
};

module.exports = verifyToken;