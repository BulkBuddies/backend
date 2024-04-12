/**
 * @openapi
 *  tags:
 *    name: Authentication
 *    description: API to handle user authentication
 */

/**
 * @openapi
 * api/v1/login:
 *   post:
 *     summary: Login to the application and generate a JWT
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       "200":
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       "401":
 *         description: Invalid credentials
 */
