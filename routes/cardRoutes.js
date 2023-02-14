const express = require('express')
const router = express.Router()
const cardController = require('../controllers/cardController')
const verifyJWT = require('../middleware/verifyJWT')

/**
 * @swagger
 * tags:
 *   name: Card
 *   description: The books managing API
 */

/**
 * @swagger
 * /card:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Returns the list of products in card
 *     tags: [Card]
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 */

router.route('/').get(verifyJWT, cardController.getCard)

/**
 * @swagger
 * /card:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags: [Card]
 *     summary: Add product to card
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Card'
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 *       404:
 *         description: Card list is empty
 */

router.route('/').post(verifyJWT, cardController.addProductToCard)

/**
 * @swagger
 * /card:
 *  delete:
 *   security:
 *     - bearerAuth: []
 *   tags: [Card]
 *   summary: Delete products from card
 *   requestBody:
 *     content:
 *      application/json:
 *       schema:
 *         $ref: '#/components/schemas/CardToDelete'
 *   responses:
 *     200:
 *       description: Products in card
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Card'
 */
router.route('/').delete(verifyJWT, cardController.removeProductFromCard)

/**
 * @swagger
 * /card/all:
 *  delete:
 *   security:
 *     - bearerAuth: []
 *   tags: [Card]
 *   summary: Delete all
 *   responses:
 *     204:
 *       description: deleted all products from card
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CardAll'
 */

router.route('/all').delete(verifyJWT, cardController.clearAllCard)

module.exports = router
