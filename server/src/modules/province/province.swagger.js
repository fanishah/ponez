/**
 * @swagger
 * tags:
 *  name: Province
 *  description: Province Module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateProvince:
 *              type: object
 *              required:
 *                  -   name
 *              properties:
 *                  name:
 *                      type: string
 *                      description: نام استان
 */

/**
 * @swagger
 *
 * /provinces:
 *  post:
 *      summary: اضافه کردن استان جدید
 *      tags:
 *          -   Province
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateProvince'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateProvince'
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /provinces:
 *  get:
 *      summary: دریافت اطلاعات استان ها
 *      tags:
 *          -   Province
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /provinces/{id}:
 *  get:
 *      summary: دریافت اطلاعات استان
 *      tags:
 *          -   Province
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              description: آیدی استان
 *              example: 67b130fb7bef9b44c9335f1c 
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /provinces/{id}:
 *  delete:
 *      summary: حذف استان
 *      tags:
 *          -   Province
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              description: آیدی استان
 *              example: 67b130fb7bef9b44c9335f1c
 *      responses:
 *          200:
 *              description: success
 */
