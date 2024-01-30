/**
 * @swagger
 * tags:
 *  name: Option
 *  description: Option Module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateOption:
 *              type: object
 *              required:
 *                  -   title
 *                  -   key
 *                  -   category
 *              properties:
 *                  title:
 *                      type: string
 *                  key:
 *                      type: string
 *                  guid:
 *                      type: string
 *                  list:
 *                      type: array
 *                  required:
 *                      type: boolean
 *                  category:
 *                      type: string
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateOption:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  key:
 *                      type: string
 *                  guid:
 *                      type: string
 *                  list:
 *                      type: array
 *                  required:
 *                      type: boolean
 *                  category:
 *                      type: string
 */


/**
 * @swagger
 *
 * /options:
 *  post:
 *      summary: ساخت آپشن جدید برای دسته بندی
 *      tags:
 *          -   Option
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateOption'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateOption'
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /options:
 *  get:
 *      summary: دریافت تمام آپشن
 *      tags:
 *          -   Option
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /options/{CategoryID}:
 *  get:
 *      summary: دریافت آپشن ها بر ایدی دسته بندی
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: CategoryID
 *              type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /options/{id}:
 *  patch:
 *      summary: ویرایش آپشن
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateOption'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateCategory'
 *      responses:
 *          200:
 *              description: success
 */



/**
 * @swagger
 *
 * /options/{id}:
 *  delete:
 *      summary: حذف آپشن بر اساس آیدی
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /options/{CategoryID}:
 *  delete:
 *      summary: حذف آپشن بر اساس آیدی دسته بندی
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: CategoryID
 *              type: string
 *      responses:
 *          200:
 *              description: success
 */