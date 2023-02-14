const Product = require('../models/Product')
const Review = require('../models/Review')
const redis = require('./redis')

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'
// @desc Get all products
// @route GET /products
// @access Public
const getProducts = async (req, res) => {
  try {
    let prod = await Product.find({})
    const xxx = await Promise.all(
      prod.map(async (product) => {
        const rating = await redis.get(`rate${product._id}`)
        if (rating) {
          product.rating = +rating
        } else {
          const reviews = await Review.find({ product: product._id }).select('rate')
          const sum = reviews.reduce((acc, cur) => {
            return acc + cur.rate
          }, 0)
          const avg = sum / reviews.length || 0
          redis.setEx(`rate${product._id}`, 1200, avg.toString())
          product.rating = avg
        }
        return product
      })
    )

    return res.status(200).json(xxx)
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
    let product = await Product.findById(id).exec()

    if (!product) return res.status(404).json({ message: 'Product not found' })

    const reviews = await Review.find({ product: id })
      .select(['-product'])
      .populate({ path: 'user', select: ['username', 'avatarURL'] })

    const rating = await redis.get(`rate${id}`)
    if (rating) {
      product.rating = +rating
    } else {
      const sum = reviews.reduce((acc, cur) => {
        return acc + cur.rate
      }, 0)
      let avg = sum / reviews.length
      if (isNaN(avg)) {
        avg = 0
      }
      await redis.setEx(`rate${product._id}`, 1200, avg.toString())
      product.rating = avg
    }

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
