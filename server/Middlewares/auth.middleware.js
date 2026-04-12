const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

const authMiddleware = async(req, res, next)=>{
  const token = req.headers.authorization?.split(" ")[1];

  if(!token) res.status(403).json({message: "Unauthorized user"})
  const JWT_SECRET = process.env.JWT_SECRET
  try {
    const decoded = jwt.verify(token, JWT_SECRET )
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({message: "Invalid token"})
  }
}

module.exports = authMiddleware