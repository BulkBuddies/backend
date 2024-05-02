/**
 * @openapi
 *  tags:
 *    name: Profile
 *    description: Endpoint to manage user profile info
 */

/**
 * @openapi
 * /profile/{id}:
 *   put:
 *     tags: [Profile]
 *     summary: Update user profile
 *     description: Update user profile
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               username:
 *                 type: string
 *               rut:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               comuna_id:
 *                 type: string
 *               postal_code:
 *                 type: string
 *               picture:
 *                 type: string
 *     responses:
 *       201:
 *         description: User profile updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 profile:
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
 *                     rut:
 *                       type: string
 *                       example: 12345678-9
 *                     phone:
 *                       type: string
 *                       example: +56983201234
 *                     address:
 *                       type: string
 *                       example: Av. Siempreviva 123
 *                     comuna_id:
 *                       type: number
 *                       example: 1101
 *                     postal_code:
 *                       type: string
 *                       example: 1234567
 *                     picture:
 *                       type: string
 *                       example: https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: El usuario no existe
 */
