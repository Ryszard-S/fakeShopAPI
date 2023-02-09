// @ts-nocheck
const Product = require('../models/Product')
const Review = require('../models/Review')
const User = require('../models/User')
const redis = require('./redis')
// const redis = require('../controllers/redis')

// @desc Get all products
// @route GET /products
// @access Public
const getProducts = async (req, res) => {
  try {
    const prod = await Product.find().select('-__v').lean()
    const products = prod.map((product) => {
      return {
        ...product,
        photos: product.photos.map((photo) => {
          return `http://localhost:3000/images/${photo}`
        })
      }
    })
    const xxx = await Promise.all(
      products.map(async (product) => {
        const rating = await redis.get(`rate${product._id}`)
        if (rating) {
          product = { ...product, rating }
          console.warn(product)
        } else {
          const reviews = await Review.find({ product: product._id }).select('rate')
          const sum = reviews.reduce((acc, cur) => {
            return acc + cur.rate
          }, 0)
          const avg = sum / reviews.length || 0
          redis.setEx(`rate${product._id}`, 1200, avg.toString())
          product = { ...product, rating: avg }
        }
        return product
      })
    )

    res.json(xxx)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @desc Get product by id
// @route GET /products/:id
// @access Public
const getProductById = async (req, res) => {
  const { id } = req.params
  try {
    let product = await Product.findById(id).select('-__v').lean()
    if (!product) return res.status(404).json({ message: 'Product not found' })

    const reviews = await Review.find({ product: id })
      .select(['-__v', '-product'])
      .populate({ path: 'user', select: ['username', 'avatarURL'] })

    const rating = await redis.get(`rate${id}`)
    if (rating) {
      product = { ...product, rating }
    } else {
      const sum = reviews.reduce((acc, cur) => {
        return acc + cur.rate
      }, 0)
      const avg = sum / reviews.length
      console.log(avg, sum, reviews.length)

      await redis.setEx(`rate${product._id}`, 1200, avg.toString())
      product = { ...product, rating: avg }
    }

    product.photos = product.photos.map((photo) => {
      return `http://localhost:3000/images/${photo}`
    })
    res.json({ product, reviews })
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' })
    }
    return res.status(500).json({ message: err.message })
  }
}

// @desc Create product
// @route POST /products
// @access Private
const createProduct = async (req, res) => {
  const { name, description, category, photos, price, promo_price, brand } = req.body
  const newProduct = new Product({
    name,
    description,
    category,
    photos,
    price,
    promo_price,
    brand
  })

  try {
    const savedProduct = await newProduct.save()
    delete savedProduct.__v
    return res.status(201).json(savedProduct)
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
}

module.exports = {
  getProducts,
  createProduct,
  getProductById
}
