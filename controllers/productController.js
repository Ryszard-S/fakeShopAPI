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
        console.log(product)
        console.log(product._id)
        const rating = await redis.get(`rate${product._id}`)
        console.log(rating)
        if (rating) {
          product = { ...product, rating }
          console.warn(product)
        } else {
          const reviews = await Review.find({ product: product._id }).select('rate')
          console.log('reviews', reviews)
          const sum = reviews.reduce((acc, cur) => {
            return acc + cur.rate
          }, 0)
          const avg = sum / reviews.length || 0
          console.log(sum, avg, reviews.length)
          redis.setEx(`rate${product._id}`, 1200, avg.toString())
          product = { ...product, rating: avg }
        }
        return product
      })
    )
    console.log(xxx)

    res.json(xxx)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @desc Get product by id
// @route GET /products/:id
// @access Public
const getProductById = async (req, res) => {
  console.log('getProductById')
  const { id } = req.params
  try {
    let product = await Product.findById(id).select('-__v').lean()
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    const reviews = await Review.find({ product: id })
      .select(['-__v', '-product'])
      .populate({ path: 'user', select: ['username', 'avatarURL'] })

    const rating = await redis.get(`rate${id}`)
    console.log(rating)
    if (rating) {
      product = { ...product, rating }
    } else {
      const sum = reviews.reduce((acc, cur) => {
        return acc + cur.rate
      }, 0)
      const avg = sum / reviews.length
      console.log(sum, avg, reviews.length)
      await redis.setEx(`rate${product._id}`, 1200, avg.toString())
      product = { ...product, rating: avg }
    }

    // console.log(prod)

    product.photos = product.photos.map((photo) => {
      return `http://localhost:3000/images/${photo}`
    })
    res.json({ product, reviews })
  } catch (err) {
    res.status(500).json({ message: err.message })
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

// // @desc Update product
// // @route PATCH /products/:id
// // @access Private
// const updateProduct = async (req, res) => {
//   const { id } = req.params
//   const { name, price, description, image } = req.body

//   const updatedProduct = {
//     name,
//     price,
//     description,
//     image
//   }

//   try {
//     const product = await Product
//       .
//       findById
//       (id)
//       .exec()

//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' })
//     }

//     const updatedProduct = await Product
//       .
//       findByIdAndUpdate
//       (id, updatedProduct, { new: true })
//       .exec()

//     res.json(updatedProduct)
//   } catch (err) {
//     res.status(400).json({ message: err.message })
//   }
// }

// // delete product from redish cashe
// const { id } = req.params
//   try {
//     const product = await Product
//       .
//       findById
//       (id)
//       .exec()

//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' })
//     }

//     await redis.del(product.name)

//     await Product
//       .
//       findByIdAndDelete
//       (id)
//       .exec()

//     res.json({ message: 'Product deleted' })
//   } catch (err) {

//     res.status(500).json({ message: err.message })
//   }
// }

module.exports = {
  getProducts,
  createProduct,
  getProductById
}
