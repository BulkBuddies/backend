/**
 * @openapi
 *  tags:
 *    name: Category
 *    description: Endpoints to manage categories
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the category
 *         name:
 *           type: string
 *           description: The name of the category
 *         created_at:
 *           type: string
 *           description: The date when the category was created
 *         updated_at:
 *           type: string
 *           description: The date when the category was updated
 *       example:
 *         id: 7c77da23-5ed3-441a-827f-6d8f465540d3
 *         name: Pets
 *         created_at: 2022-01-01T
 *         updated_at: 2022-01-01T
 */

/**
 * @openapi
 * paths:
 *   /category:
 *     get:
 *       summary: Get all categories
 *       tags: [Category]
 *       responses:
 *         200:
 *           description: The list of categories
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   categories:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 7c77da23-5ed3-441a-827f-6d8f465540d3
 *                         name:
 *                           type: string
 *                           example: Pets
 *
 *         500:
 *           description: Internal server error
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
