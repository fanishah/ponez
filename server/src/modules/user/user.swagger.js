/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Users Module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateUser:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateUser:
 *              type: object
 *              required:
 *                  -   role
 *                  -   verifiedMobile
 *              properties:
 *                  role:
 *                      type: string
 *                  verifiedMobile:
 *                      type: boolean
 */

/**
 * @swagger
 *
 * /users:
 *  post:
 *      summary: ساخت کاربر جدید
 *      tags:
 *          -   Users
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateUser'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateUser'
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /users:
 *  get:
 *      summary: دریافت کاربران
 *      tags:
 *          -   Users
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /users/{mobile}:
 *  delete:
 *      summary: حذف کاربر
 *      tags:
 *          -   Users
 *      parameters:
 *          -   in: path
 *              name: mobile
 *              type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /users/{mobile}:
 *  patch:
 *      summary: ویرایش کاربر
 *      tags:
 *          -   Users
 *      parameters:
 *          -   in: path
 *              name: mobile
 *              type: string
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateUser'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateUser'
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /users/{mobile}:
 *  get:
 *      summary: دیافت کاربر بر اساس شماره موبایل
 *      tags:
 *          -   Users
 *      parameters:
 *          -   in: path
 *              name: mobile
 *              type: string
 *      responses:
 *          200:
 *              description: success
 */
