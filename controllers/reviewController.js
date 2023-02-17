const Product = require('../models/Product')
const Review = require('../models/Review')
const redis = require('../controllers/redis')
const HTTPError = require('../utils/HTTPError')
const { recalculateRating } = require('../utils/rating')

// @desc Get one review
// @route GET /reviews/:id_product
// @access Public
const getReviews = async (req, res) => {
  const id_product = req.params.id_product

  try {
    const reviwes = await Review.find({ product: id_product }).populate({
      path: 'user',
      select: ['username', 'avatarURL']
    })
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
    if (!product) throw new HTTPError(404, 'Invalid product id')
    const reviewExist = await Review.exists({ product: id_product, user: id_user })
    if (reviewExist) throw new HTTPError(409, 'You have already reviewed this product')
  } catch (err) {
    if (err instanceof HTTPError) return res.status(err.statusCode).json({ message: err.message })
    return res.status(500).json({ message: err.message })
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
    recalculateRating(product)
    return res.status(201).json(newReview)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = {
  getReviews,
  createReview
}
