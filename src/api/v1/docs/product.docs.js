/**
 * @openapi
 *  tags:
 *    name: Product
 *    description: API to handle operations with products
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - unit_price
 *         - url
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the post
 *         name:
 *           type: string
 *           description: The name of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         required_stock:
 *           type: integer
 *           description: The minimum quantity of the product to get a good bulk price
 *         unit_price:
 *           type: integer
 *           description: the price for each product
 *         created_at:
 *           type: string
 *           description: The timestamp when the product was created
 *         updated_at:
 *           type: string
 *           description: The timestamp when the product was last updated
 *         url:
 *           type: string
 *           description: The image url of the product
 *         category_id:
 *           type: string
 *           description: the category the product belongs to
 *       example:
 *         id: "fca350f7-40ff-4d73-aa4f-a30981f88fb3"
 *         name: "Q9 Star Phone"
 *         description: "Brand new phone"
 *         required_stock: 200
 *         unit_price: 5000
 *         created_at: "2022-01-01"
 *         updated_at: "2024-01-04"
 *         url: "http://www.image.com/product.jpg"
 *         category_id: "573765fd-4bdf-4ccf-936c-e9fd6de118e5"
 */

/**
 * @openapi
 * paths:
 *   /post:
 *     get:
 *       summary: Get all products
 *       tags: [Product]
 *       responses:
 *         '200':
 *           description: Successfully retrieved all products
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/product'
 *         '400':
 *           description: Bad request
 */

/**
 * @openapi
 * paths:
 *   /product/{productId}:
 *     get:
 *       summary: Get product by id
 *       tags:
 *         - Product
 *       parameters:
 *         - in: path
 *           name: productId
 *           required: true
 *           schema:
 *             type: string
 *           description: The product id
 *       responses:
 *         '200':
 *           description: Product
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 $ref: '#/components/schemas/product'
 *         '400':
 *           description: Bad request
 *         '404':
 *           description: Product not found
 */
