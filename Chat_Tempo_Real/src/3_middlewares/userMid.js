const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Acesso negado: Token ausente.' });
  }

  const token = authHeader.split(' ')[1];  // Extraí o token após 'Bearer'
  if (!token) {
    return res.status(401).json({ message: 'Token malformado' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token inválido' });
  }
};

module.exports = authenticateJWT;
