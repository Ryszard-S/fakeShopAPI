const Product = require('../models/Product')
const Review = require('../models/Review')
const redis = require('../controllers/redis')

// @desc Get one review
// @route GET /reviews/:id_product
// @access Public
const getReviews = async (req, res) => {
  const id_product = req.params.id_product

  try {
    const reviwes = await Review.find({ product: id_product })
      .select('-__v')
      .populate({ path: 'user', select: ['username', 'avatarURL'] })
      .lean()
    if (!reviwes) return res.status(404).json({ message: 'Invalid product id' })
    res.json(reviwes)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const createReview = async (req, res) => {
  let product
  const id_product = req.params.id_product
  const id_user = req.userInfo.id
  const expiresAt = req.userInfo.expiresAt
  const { rate, review } = req.body
  try {
    product = await Product.findById({ _id: id_product }).exec()
    if (!product) throw new Error('Invalid product id')
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
  const newReview = new Review({
    product: id_product,
    user: id_user,
    rate,
    review,
    expiresAt
  })
  try {
    await newReview.save()
    const rate = await Review.find({ product: id_product }).select('rate')
    const sum = rate.reduce((acc, cur) => {
      return acc + cur.rate
    }, 0)
    const avg = sum / rate.length
    redis.setEx(`rate${product._id}`, 1200, avg.toString())
    return res.status(201).json(newReview)
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
}

module.exports = {
  getReviews,
  createReview
}
