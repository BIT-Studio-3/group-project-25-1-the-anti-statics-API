/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           example: "John"
 *         lastName:
 *           type: string
 *           example: "Doe"
 *         emailAddress:
 *           type: string
 *           format: email
 *           example: "john.doe@example.com"
 *         password:
 *           type: string
 *           example: "password123"
 *         organization:
 *           type: string
 *           example: "MetService"
 *         role:
 *           type: string
 *           example: "BASIC"
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User successfully registered"
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       '409':
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User already exists"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Log in an existing user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailAddress:
 *                 type: string
 *                 format: email
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       '200':
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User successfully logged in"
 *                 token:
 *                   type: string
 *                   example: ""
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */