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
 *         type:
 *           type: string
 *           description: The user's type
 *           default: local
 *       example:
 *         first_name: Felipe
 *         last_name: Castillo
 *         username: felipec
 *         email: user@test.com
 *         password: password
 *         type: local
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     profile:
 *       type: object
 *       required:
 *         - rut
 *         - phone
 *         - address
 *         - comuna_id
 *         - postal_code
 *         - picture
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the profile
 *         fk_user:
 *           type: string
 *           description: The id of the user
 *         rut:
 *           type: string
 *           description: The user's rut
 *         phone:
 *           type: string
 *           description: The user's phone
 *         address:
 *           type: string
 *           description: The user's address
 *         comuna_id:
 *           type: string
 *           description: The id of the comuna
 *         postal_code:
 *           type: string
 *           description: The user's postal code
 *         created_at:
 *           type: string
 *           description: The time the profile info was created
 *         updated_at:
 *           type: string
 *           description: The time the profile info was updated
 *         picture:
 *           type: string
 *           description: The user's picture
 *       example:
 *         id: d6600aff-830c-47a3-8b33-815e38b8fc71
 *         fk_user: 0e24b80b-a6eb-4d29-9d4a-4fb1fd57ba39
 *         rut: 28545678-9
 *         phone: +56983201234
 *         address: Av. Siempreviva 123
 *         comuna_id: 765cf05b-0c5f-46be-91f4-8dd70ffde9ac
 *         postal_code: 1234567
 *         created_at: 2022-01-01T00:00:00.000Z
 *         updated_at: 2022-01-01T00:00:00.000Z
 *         picture: url
 */

/**
 * @openapi
 * paths:
 *   /user:
 *     get:
 *       summary: Get all users basic info
 *       tags:
 *         - User
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 0e24b80b-a6eb-4d29-9d4a-4fb1fd57ba39
 *                     first_name:
 *                       type: string
 *                       example: Felipe
 *                     last_name:
 *                       type: string
 *                       example: Castillo
 *                     username:
 *                       type: string
 *                       example: felipec
 *                     email:
 *                       type: string
 *                       example: user@test.com
 *                     type:
 *                       type: string
 *                       example: local
 *         '404':
 *           description: Not Found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: number
 *                     example: 404
 *                   message:
 *                     type: string
 *                     example: el usuario no existe
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: number
 *                     example: 500
 *                   message:
 *                     type: string
 *                     example: Internal server error
 */

/**
 * @openapi
 * paths:
 *   /user/{id}:
 *     get:
 *       summary: Get user info by id
 *       tags:
 *         - User
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: The user id
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 0e24b80b-a6eb-4d29-9d4a-4fb1fd57ba39
 *                   first_name:
 *                     type: string
 *                     example: Felipe
 *                   last_name:
 *                     type: string
 *                     example: Castillo
 *                   username:
 *                     type: string
 *                     example: felipec
 *                   email:
 *                     type: string
 *                     example: user@test.com
 *                   type:
 *                     type: string
 *                     example: local
 *                   phone:
 *                     type: string
 *                     example: +56983201234
 *                   address:
 *                     type: string
 *                     example: Av. Siempreviva 123
 *                   comuna_id:
 *                     type: string
 *                     example: 765cf05b-0c5f-46be-91f4-8dd70ffde9ac
 *                   postal_code:
 *                     type: string
 *                     example: 1234567
 *                   created_at:
 *                     type: string
 *                     example: 2022-01-01T00:00:00.000Z
 *                   picture:
 *                     type: string
 *                     example: url
 *         '404':
 *           description: User not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: number
 *                     example: 404
 *                   message:
 *                     type: string
 *                     example: El usuario no existe
 */
