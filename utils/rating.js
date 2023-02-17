const redis = require('../controllers/redis')
const Review = require('../models/Review')

const getRating = async (product) => {
  const rating = await redis.get(`rate${product._id}`)
  if (rating) {
    return +rating
  } else {
    return await recalculateRating(product)
  }
}

const recalculateRating = async (product) => {
    const reviews = await Review.find({ product: product._id }).select('rate')
    const sum = reviews.reduce((acc, cur) => {
      return acc + cur.rate
    }, 0)
    const avg = sum / reviews.length || 0
    redis.setEx(`rate${product._id}`, 1200, avg.toString())
    return avg

 }

module.exports = {
    getRating,
    recalculateRating,
}
