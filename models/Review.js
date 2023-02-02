// @ts-nocheck
const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: true
  },
  review: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },

  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  },
  updatedAt: {
    type: Date,
    default: () => Date.now()
  },
  expiresAt: {
    type: Date,
    default: () => Date.now() + 1000 * 60 * 5,
    expires: 1
  }
})
reviewSchema.options.toJSON = {
  transform: function (doc, ret) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
}
reviewSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()
})

module.exports = mongoose.model('review', reviewSchema)
