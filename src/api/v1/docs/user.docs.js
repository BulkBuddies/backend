/**
 * @openapi
 *  tags:
 *    name: User
 *    description: API to handle operations with users
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       required:
 *         - first name
 *         - last name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the users
 *         first_name:
 *           type: string
 *           description: The user's first name
 *         last_name:
 *           type: string
 *           description: The user's last name
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *       example:
 *         first_name: Felipe
 *         last_name: Castillo
 *         email: user@test.com
 *         password: password
 */

/**
 * @openapi
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       '201':
 *         description: Usuario creado
 */

/**
 * @openapi
 * /user/{userId}/posts:
 *   get:
 *     summary: Get the user's own posts and the ones he's participating with
 *     tags:
 *       - User
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user to get their posts
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: 'post.docs.js#/components/schemas/post'
 *             example:
 *               - id: "1"
 *                 title: "Sample Post"
 *                 description: "This is a sample post"
 *                 status: "pending"
 *                 product_id: "12345"
 *                 expiration_date: "2022-12-31"
 *                 created_at: "2022-01-01 10:00:00"
 *                 updated_at: null
 */
