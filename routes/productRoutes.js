const router = require('express').Router()
const productController = require('../controllers/productController')

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: routes for authorization and authentication
 */

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Get all products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductList'
 *       400:
 *         description: Bad request
 */

router.route('/').get(productController.getProducts)

// router.route('/').post(productController.createProduct)

/**
 * @swagger
 * /product/{productId}:
 *   get:
 *     summary: Get a product by id
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Get a product by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product not found
 */

router.route('/:id').get(productController.getProductById)

module.exports = router
