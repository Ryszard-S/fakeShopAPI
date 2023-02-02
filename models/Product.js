// @ts-nocheck
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: String,
    default: 'other'
  },
  // generate regex for email
  // ^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$
  photos: {
    type: [],
    default: ['default.png']
  },
  price: {
    type: Number,
    required: true,
    min: 0.01
  },
  promo_price: {
    type: Number,
    min: 0.01
  },
  brand: {
    type: String,
    default: 'No name'
  },

  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  },
  updatedAt: {
    type: Date,
    default: () => Date.now()
  }
})

productSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()
})

module.exports = mongoose.model('product', productSchema)
