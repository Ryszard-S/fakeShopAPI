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
 *     summary: Returns the list of all the bookssssss
 *     tags: [Card]

 *     responses:
 *       200:
 *         description: The list of the books
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
 *     tags: [Card]
 *     summary: Add books to the list
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Card'
 *
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 *       404:
 *         description: The list of the books
 */

router.route('/').post(verifyJWT, cardController.addProductToCard)

/**
 * @swagger
 * /card:
 *  delete:
 *   tags: [Card]
 *   summary: Delete books from the list
 *   requestBody:
 *     content:
 *      application/json:
 *       schema:
 *         $ref: '#/components/schemas/CardToDelete'
 *   responses:
 *     200:
 *       description: The list of the books
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
 *   tags: [Card]
 *   summary: Delete all
 *   responses:
 *     200:
 *       description: The list of the books
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CardAll'
 */

router.route('/all').delete(verifyJWT, cardController.clearAllCard)

module.exports = router
