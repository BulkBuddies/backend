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
