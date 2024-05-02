/**
 * @openapi
 *  tags:
 *    name: Region
 *    description: Endpoint to get data from regions
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     region:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the region
 *         region:
 *           type: string
 *           description: The name of the region
 *         abreviatura:
 *           type: string
 *           description: The abbreviation of the region
 *         capital:
 *           type: string
 *           description: The capital of the region
 *       example:
 *           id: 1
 *           region: Taracapá
 *           abreviatura: TA
 *           capital: Iquique
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     comuna:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the region
 *         comuna:
 *           type: string
 *           description: The name of the comuna
 *         region_id:
 *           type: int
 *           description: The id of the region
 *       example:
 *           id: 1101
 *           comuna: Iquique
 *           region_id: 1
 */

/**
 * @openapi
 * paths:
 *   /region:
 *     get:
 *       summary: Get all regions
 *       tags: [Region]
 *       responses:
 *         200:
 *           description: The list of regions
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   regions:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: number
 *                           example: 1
 *                         region:
 *                           type: string
 *                           example: Taracapá
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

/**
 * @openapi
 * paths:
 *   /region/{id}:
 *     get:
 *       summary: Get comunas by region
 *       tags: [Region]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: number
 *           required: true
 *           description: The region id
 *       responses:
 *         200:
 *           description: The list of comunas by region
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   comunas:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/comuna'
 *
 */
