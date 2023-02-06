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
 *       200:
 *         description: Get all products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReviewResponse'
 *       400:
 *         description: Bad request
 */

router
  .route('/:id_product')
  .get(reviewController.getReviews)
  .post(verifyJWT, reviewController.createReview)

module.exports = router
