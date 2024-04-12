/**
 * @openapi
 *  tags:
 *    name: Post
 *    description: API to handle operations with posts
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     post:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - expiration_date
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the post
 *         title:
 *           type: string
 *           description: The title of the post
 *         description:
 *           type: string
 *           description: The description of the post
 *         status:
 *           type: string
 *           default: "pending"
 *           description: The status of the post
 *         product_id:
 *           type: string
 *           description: The ID of the associated product
 *         expiration_date:
 *           type: string
 *           description: The expiration date of the post
 *         created_at:
 *           type: string
 *           description: The timestamp when the post was created
 *         updated_at:
 *           type: null
 *           description: The timestamp when the post was last updated
 *       example:
 *         id: "1"
 *         title: "Sample Post"
 *         description: "This is a sample post"
 *         status: "pending"
 *         product_id: "12345"
 *         expiration_date: "2022-12-31"
 *         created_at: "2022-01-01 10:00:00"
 *         updated_at: null
 */

/**
 * @openapi
 * paths:
 *   /post:
 *     post:
 *       summary: Create a new post
 *       tags: [Post]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/post'
 *       responses:
 *         '201':
 *           description: Successfully created a new post
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/post'
 *         '400':
 *           description: Bad request
 */
