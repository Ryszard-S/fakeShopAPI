const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const verifyJWT = require('../middleware/verifyJWT')

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: routes for authorization and authentication
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: register new user
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRegisterResponse'
 *       400:
 *         description: Bad request
 *       409:
 *         description: User already exists
 */

router.route('/register').post(authController.register)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: register new user
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *
 *     responses:
 *       200:
 *         description: User logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserLoginResponse'
 *       401:
 *         description: Unauthorized
 */

router.route('/login').post(authController.login)

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: register new user
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRefresh'
 *
 *     responses:
 *       200:
 *         description: User logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRefreshResponse'
 *       401:
 *         description: Unauthorized
 */

router.route('/refresh').post(authController.refresh)

/**
 * @swagger
 * /auth/logout:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: logout user
 *     tags: [Auth]
 *
 *     responses:
 *       204:
 *         description: User logged out
 *       401:
 *         description: Unauthorized
 */

router.route('/logout').delete(verifyJWT, authController.logout)

module.exports = router
