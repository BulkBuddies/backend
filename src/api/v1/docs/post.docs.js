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
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         created_by:
 *           type: string
 *         description:
 *           type: string
 *         status:
 *           type: string
 *         expiration_date:
 *           type: string
 *         created_at:
 *           type: string
 *         updated_at:
 *           type: string
 *         unit_price:
 *           type: number
 *         url:
 *           type: string
 *         img_url:
 *           type: string
 *         category_id:
 *           type: string
 *         required_stock:
 *           type: number
 *         min_contribution:
 *           type: number
 *         user_stock:
 *           type: number
 *         visible:
 *           type: boolean
 *       required:
 *         - title
 *         - created_by
 *         - description
 *         - expiration_date
 *         - unit_price
 *         - url
 *         - img_url
 *         - category_id
 *         - required_stock
 *         - min_contribution
 *         - user_stock
 *       example:
 *         id: 5f0f5f0f-5f0f-5f0f-5f0f-5f0f5f0f5f0f
 *         title: post title
 *         created_by: 5f0f5f0f-5f0f-5f0f-5f0f-5f0f5f0f5f0f
 *         description: post description
 *         status: activo
 *         expiration_date: 2020-01-01T00:00:00.000Z
 *         unit_price: 100
 *         url: https://example.com
 *         img_url: https://example.com
 *         category_id: 5f0f5f0f-5f0f-5f0f-5f0f-5f0f5f0f5f0f
 *         required_stock: 10000
 *         min_contribution: 100
 *         user_stock: 100
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     logPost:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         user_id:
 *           type: string
 *         post_id:
 *           type: string
 *         role:
 *           type: string
 *         date:
 *           type: string
 *         item_by_this_user:
 *           type: number
 *       example:
 *         id: 10
 *         user_id: 22f305df-ab1d-46ff-9717-9a6b864583d7
 *         post_id: 58a5b134-47a5-4b41-975a-6c8ea86f087b
 *         role: Owner
 *         date: 2020-01-01T00:00:00.000Z
 *         item_by_this_user: 100
 *       required:
 *         - user_id
 *         - post_id
 *         - role
 *         - item_by_this_user
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

/**
 * @openapi
 * paths:
 *   /post:
 *     get:
 *       summary: Get all posts
 *       tags: [Post]
 *       responses:
 *         '200':
 *           description: Successfully retrieved all posts
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/post'
 *         '400':
 *           description: Bad request
 */

/**
 * @openapi
 * paths:
 *   /post/{id}:
 *     get:
 *       summary: Get post by id
 *       tags:
 *         - Post
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: The post id
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/post'
 *         '404':
 *           description: Post not found
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
 *                     example: Post not found
 */

/**
 * @openapi
 *  paths:
 *   /post/log/{id}:
 *     get:
 *       summary: Get posts logs by post id
 *       tags:
 *         - Post
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: The post id
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   itemData:
 *                     type: object
 *                     properties:
 *                       post_id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                   logs:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         post_id:
 *                           type: string
 *                         username:
 *                           type: string
 *                         user_id:
 *                           type: string
 *                         role:
 *                           type: string
 *                         item_by_this_user:
 *                           type: number
 *                         date:
 *                           type: string
 *         '404':
 *           description: Post not found
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
 *                     example: Este post no existe
 */

/**
 * @openapi
 * paths:
 *   /post/stock/{id}:

 */

/**
 * @openapi
 * paths:
 *   /post/{id}:
 *     patch:
 *       summary: Update post by id
 *       tags:
 *         - Post
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: The post id
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 url:
 *                   type: string
 *                 img_url:
 *                   type: string
 *                 category_id:
 *                   type: string
 *               required:
 *                 - title
 *                 - description
 *                 - url
 *                 - img_url
 *                 - category_id
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Post actualizado correctamente
 *                   post:
 *                     $ref: '#/components/schemas/post'
 *         '404':
 *           description: Post not found
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
 *                     example: Post not found
 */

/**
 * @openapi
 * paths:
 *   /post/{id}:
 *     delete:
 *       summary: Soft delete post by id
 *       tags:
 *         - Post
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: The post id
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: number
 *                     example: 200
 *                   post:
 *                     $ref: '#/components/schemas/post'
 *         '404':
 *           description: Post not found
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
 *                     example: Este post no existe
 *
 */

/**
 * @openapi
 *  paths:
 *   /post/user/{id}:
 *     get:
 *       summary: Get posts by user id
 *       tags:
 *         - Post
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
 *                   userData:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: string
 *                       username:
 *                         type: string
 *                       email:
 *                         type: string
 *                   posts:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/post'
 *         '404':
 *           description: Post not found
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
 *                     example: Post not found
 */

/**
 * @openapi
 *  paths:
 *   /post/user/log/{id}:
 *     get:
 *       summary: Get posts logs by user id
 *       tags:
 *         - Post
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
 *                   userData:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: string
 *                       username:
 *                         type: string
 *                       email:
 *                         type: string
 *                   logs:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/logPost'
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: number
 *                     example: 400
 *                   message:
 *                     type: string
 *                     example: El usuario no existe
 */
