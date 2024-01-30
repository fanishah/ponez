/**
 * @swagger
 * tags:
 *  name: Category
 *  description: Category Module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateCategory:
 *              type: object
 *              required:
 *                  -   name
 *                  -   slug
 *                  -   icon
 *              properties:
 *                  name:
 *                      type: string
 *                  slug:
 *                      type: string
 *                  icon:
 *                      type: string
 *                  parent:
 *                      type: string
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateCategory:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  slug:
 *                      type: string
 *                  icon:
 *                      type: string
 *                  parent:
 *                      type: string
 */


/**
 * @swagger
 *
 * /category:
 *  post:
 *      summary: ساخت دسته بندی جدید
 *      tags:
 *          -   Category
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateCategory'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateCategory'
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /category:
 *  get:
 *      summary: دریافت تمام دسنه بندی ها
 *      tags:
 *          -   Category
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /category/{slug}:
 *  get:
 *      summary: دریافت دسته بندی بر اساس سلاگ
 *      tags:
 *          -   Category
 *      parameters:
 *          -   in: path
 *              name: slug
 *              type: string
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /category/{id}:
 *  patch:
 *      summary: ویرایش دسته بندی
 *      tags:
 *          -   Category
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateCategory'
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
 * /category/{id}:
 *  delete:
 *      summary: حذف دسته بندی بر اساس آیدی
 *      tags:
 *          -   Category
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      responses:
 *          200:
 *              description: success
 */