// @ts-nocheck

const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const avatar = require('../utils/generateAvatar')
const redis = require('./redis')

// @desc Login
// @route POST /auth/register
// @access Public
const register = async (req, res) => {
  const { username, password, email, name, lastName } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)

  const avatarURL = avatar.genrateAdventurerURL()

  const newUser = new User({
    username,
    password: hashedPassword,
    email,
    name,
    lastName,
    avatarURL
  })

  try {
    const savedUser = await newUser.save()

    res.status(201).json({ message: 'User created', username: savedUser.username })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Username already exists' })
    }

    return res.status(500).json({ message: 'server error' })
  }
}

// @desc Login
// @route POST /auth
// @access Public
const login = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) return res.status(400).json({ message: 'All fields are required' })

  const foundUser = await User.findOne({ username }).select('+password').exec()

  if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

  const match = await bcrypt.compare(password, foundUser.password)

  if (!match) return res.status(401).json({ message: 'Unauthorized' })

  const accessToken = signAccessToken(foundUser)
  const refreshToken = jwt.sign(
    {
      id: foundUser._id,
      username: foundUser.username,
      expiresAt: foundUser.expiresAt
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1h' }
  )
  await redis.setEx(`refreshToken${foundUser._id}`, 1200, refreshToken)

  // Send accessToken containing id and username
  res.json({ accessToken, refreshToken })
}

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
  const { refreshToken } = req.body

  if (!refreshToken) return res.status(401).json({ message: 'Unauthorized' })

  // const refreshToken = cookies.jwt

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden' })

    const token = await redis.get(`refreshToken${decoded.id}`)
    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    const foundUser = await User.findOne({ username: decoded.username }).select('+password').exec()

    if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

    const accessToken = signAccessToken(foundUser)
 

    res.json({ accessToken })
  })
}

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
  const { id } = req.userInfo
  redis.del(`refreshToken${id}`)
  res.status(204).json({ message: 'User logout' })
}

const signAccessToken = (userObject) => {
 
  const token = jwt.sign(
    {
      UserInfo: {
        id: userObject._id,
        username: userObject.username,
        expiresAt: userObject.expiresAt
      }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' }
  )
  return token
}

module.exports = {
  register,
  login,
  refresh,
  logout
}
