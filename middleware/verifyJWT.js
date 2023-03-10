const jwt = require('jsonwebtoken')

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'secret'

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = authHeader.split(' ')[1]

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden' })
    req.userInfo = {
      username: decoded.UserInfo.username,
      id: decoded.UserInfo.id,
      expiresAt: decoded.UserInfo.expiresAt
    }

    next()
  })
}

module.exports = verifyJWT
