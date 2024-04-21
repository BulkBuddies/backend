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
 *         - username
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
 *         username:
 *           type: string
 *           description: The username
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *       example:
 *         first_name: Felipe
 *         last_name: Castillo
 *         username: felipec
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
 * /user/posts/{userId}:
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
 *                 $ref: '#/components/schemas/post'
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

/**
 * @openapi
 * /user/profile/{userId}:
 *   put:
 *     summary: update user personal info into profile table
 *     tags:
 *       - User
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user to update profile
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/post'
 *             example:
 *               - rut: "16595343-5"
 *                 phone: "569999999"
 *                 address: "Street 123"
 *                 comuna_id: "67"
 *                 postal_code: "12345"
 *                 updated_at: "2024-04-13"
 *                 picture: "my-pic.jpg"
 *                 
 */
