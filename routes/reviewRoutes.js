const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/reviewController')
const verifyJWT = require('../middleware/verifyJWT')

/**
 * @swagger
 * tags:
 *   name: Review
 *   description: routes for authorization and authentication
 */

router
  .route('/:id_product')
  /**
   * @swagger
   * /review/{productId}:
   *   get:
   *     summary: Get reviews for product
   *     tags: [Review]
   *     parameters:
   *       - in: path
   *         name: productId
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Get all products
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ReviewList'
   *       400:
   *         description: Bad request
   */

  .get(reviewController.getReviews)

  /**
   * @swagger
   * /review/{productId}:
   *   post:
   *     summary: Add review for product
   *     tags: [Review]
   *     parameters:
   *       - in: path
   *         name: productId
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       content:
   *        application/json:
   *         schema:
   *           $ref: '#/components/schemas/AddReviewBody'
   *     responses:
   *       201:
   *         description: Review created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ReviewResponse'
   *       404:
   *         description: Invalid product id
   *       409:
   *         description: You have already reviewed this product
   */

  .post(verifyJWT, reviewController.createReview)

module.exports = router
