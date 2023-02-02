const express = require('express')
const router = express.Router()
const cardController = require('../controllers/cardController')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/').get(verifyJWT, cardController.getCard)

router.route('/').post(verifyJWT, cardController.addProductToCard)

router.route('/').delete(verifyJWT, cardController.removeProductFromCard)

router.route('/all').delete(verifyJWT, cardController.clearAllCard)

module.exports = router
