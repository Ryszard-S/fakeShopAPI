const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/reviewController')
const verifyJWT = require('../middleware/verifyJWT')

router
  .route('/:id_product')
  .get(reviewController.getReviews)
  .post(verifyJWT, reviewController.createReview)

module.exports = router
