/**
 * @openapi
 *  tags:
 *    name: Authentication
 *    description: API to handle user authentication
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     GoogleUser:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: The JWT token
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *         id:
 *           type: string
 *           description: The user id
 *           example: 123e4567-e89b-12d3-a456-426614174000
 *         first_name:
 *           type: string
 *           description: The user first name
 *           example: John
 *         last_name:
 *           type: string
 *           description: The user last name
 *           example: Doe
 *         email:
 *           type: string
 *           description: The user email
 *           example: '0iXqH@gmail.com'
 *         username:
 *           type: string
 *           description: The user username
 *           example: 'john.doe'
 *         type:
 *           type: string
 *           description: The user type
 *           example: 'google'
 *
 */

/**
 * @openapi
 * /login:
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *                     id:
 *                       type: string
 *                       example: 123e4567-e89b-12d3-a456-426614174000
 *                     first_name:
 *                       type: string
 *                       example: John
 *                     last_name:
 *                       type: string
 *                       example: Doe
 *                     email:
 *                       type: string
 *                       example: 'jhonH@gmail.com'
 *                     username:
 *                       type: string
 *                       example: 'john.doe'
 *                     type:
 *                       type: string
 *       "401":
 *         description: Invalid credentials
 */

/**
 * @openapi
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       "201":
 *         description: Usuario registrado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * Logs out the user by clearing the JWT cookie.
 *
 * @openapi
 * /logout:
 *   get:
 *     summary: Logs out the user.
 *     tags:
 *       - Authentication
 *     responses:
 *       '200':
 *         description: Logged out.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Logged out
 *       '401':
 *         description: No hay JWT en la cookie.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: No hay JWT en la cookie
 */

/**
 * @openapi
 * /refresh:
 *   get:
 *     summary: Refreshes the JWT
 *     tags:
 *       - Authentication
 *     responses:
 *       '200':
 *         description: Successful refresh
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       '401':
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Sin credenciales en la cookie
 */

/**
 * @openapi
 * /auth/success:
 *   get:
 *     summary: Successful login with Google
 *     description: Provided that the authentication with Google was succesful, the endpoint can be used to get the user information
 *     tags:
 *       - Authentication
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/GoogleUser'
 *       '400':
 *         description: Bad request
 */

/**
 * @openapi
 * paths:
 *   /password-reset:
 *     post:
 *       summary: Change user password
 *       tags:
 *         - Authentication
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 123e4567-e89b-12d3-a456-426614174000
 *                 password:
 *                   type: string
 *                   example: 'password123'
 *       responses:
 *         '200':
 *           description: User password changed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Contraseña cambiada
 */
