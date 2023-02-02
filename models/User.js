// @ts-nocheck

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30
  },

  password: {
    type: String,
    select: false,
    required: true
  },

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },

  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },

  email: {
    type: String,
    required: [true, 'Email is required!'],
    lowercase: true,
    trim: true,
    validate: {
      validator: (value) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
      },
      message: (props) => `${props.value} is not a valid email!`,


    }
  },

  avatarURL: String,

  createdAt: {
    type: Date,
    immutable: true,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  },

  expiresAt: {
    type: Date,
    default: () => Date.now() + 1000 * 60 * 60,
    expires: 1
  }
})

userSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()
})

module.exports = mongoose.model('user', userSchema)
