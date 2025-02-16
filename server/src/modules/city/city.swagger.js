/**
 * @swagger
 * tags:
 *  name: City
 *  description: City Module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CityProvince:
 *              type: object
 *              required:
 *                  -   name
 *                  -   provinceId
 *              properties:
 *                  name:
 *                      type: string
 *                      description: نام شهر
 *                  provinceId:
 *                      type: string
 *                      description: شناسه استان
 */

/**
 * @swagger
 *
 * /city:
 *  post:
 *      summary: اضافه کردن شهر جدید
 *      tags:
 *          -   City
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CityProvince'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CityProvince'
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /city:
 *  get:
 *      summary: دریافت اطلاعات شهر ها
 *      tags:
 *          -   City
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /city/{id}:
 *  get:
 *      summary: دریافت اطلاعات شهر
 *      tags:
 *          -   City
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              description: آیدی شهر
 *              example: 67b130fb7bef9b44c9335f1c
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /city/{id}:
 *  delete:
 *      summary: حذف شهر
 *      tags:
 *          -   City
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              description: آیدی شهر
 *              example: 67b130fb7bef9b44c9335f1c
 *      responses:
 *          200:
 *              description: success
 */
