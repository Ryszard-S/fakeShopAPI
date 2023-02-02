const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/register').post(authController.register)

router.route('/').post(authController.login)

router.route('/refresh').post(authController.refresh)

router.route('/logout').delete(verifyJWT, authController.logout)

module.exports = router
