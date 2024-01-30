/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth Module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          SendOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *          CheckOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                  code:
 *                      type: string
 */

/**
 * @swagger
 *
 * /auth/sendotp:
 *  post:
 *      summary: ارسال کد تایید برای ورود کاربر
 *      tags:
 *          -   Auth
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/SendOTP'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/SendOTP'
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /auth/checkotp:
 *  post:
 *      summary: چک کردن کد تایید برای ورود کاربر
 *      tags:
 *          -   Auth
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CheckOTP'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CheckOTP'
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /auth/refreshtoken:
 *  get:
 *      summary: رفرش توکن
 *      tags:
 *          -   Auth
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /auth/logout:
 *  get:
 *      summary: خروج کاربر
 *      tags:
 *          -   Auth
 *      responses:
 *          200:
 *              description: Seccessfully logged out
 */
