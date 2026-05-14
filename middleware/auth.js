// middleware/auth.js

const jwt = require('jsonwebtoken')
const User = require('../models/user')

const protect = async (req, res, next) => {

  // Step 1: header padho
  const authHeader = req.headers.authorization

  // Step 2: exist karta hai? Bearer format me hai?
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Not authorized, token missing' })
  }

  // Step 3: token extract karo
  const token = authHeader.split(' ')[1]

  try {
    // Step 4: verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Step 5: user dhundo
    const user = await User.findById(decoded.id).select('-password')

    // Step 6: user nahi mila?
    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    // Step 7: attach karo
    req.user = user

    // Step 8: aage jao
    next()

  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

module.exports = { protect }