// @ts-nocheck
const mongoose = require('mongoose')
const BASE_URL = process.env.BASE_URL

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
  },
  rating: {
    type: Number
  }
})

productSchema.options.toJSON = {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.__v
    ret.photos = ret.photos.map((photo) => {
      return `${BASE_URL}/images/${photo}`
    })
  }
}

productSchema.options.toObject = {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.__v
    ret.photos = ret.photos.map((photo) => {
      return `${BASE_URL}/images/${photo}`
    })
  }
}

productSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()
})

module.exports = mongoose.model('product', productSchema)
