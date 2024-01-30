/**
 * @swagger
 * tags:
 *  name: Announcement
 *  description: Announcement Module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreatePost:
 *              type: object
 *              required:
 *                  -   title
 *                  -   description
 *                  -   state
 *                  -   city
 *                  -   categoryid
 *                  -   location
 *                  -   price
 *              properties:
 *                  title:
 *                      type: string
 *                  description:
 *                      type: string
 *                  state:
 *                      type: string
 *                  city:
 *                      type: string
 *                  categoryid:
 *                      type: string
 *                  location:
 *                      type: string
 *                  price:
 *                      type: string
 *                  isshowusermobile:
 *                      type: boolean
 *                  options:
 *                      type: array
 *                  photos:
 *                      type: array
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdatePost:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  description:
 *                      type: string
 *                  state:
 *                      type: string
 *                  city:
 *                      type: string
 *                  categoryid:
 *                      type: string
 *                  location:
 *                      type: string
 *                  price:
 *                      type: string
 *                  isshowusermobile:
 *                      type: boolean
 *                  options:
 *                      type: array
 *                  photos:
 *                      type: array
 */

/**
 * @swagger
 *
 * /posts:
 *  post:
 *      summary: انتشار آگهی جدید
 *      tags:
 *          -   Announcement
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CreatePost'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreatePost'
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /posts:
 *  get:
 *      summary: دریافت تمام گهی ها
 *      tags:
 *          -   Announcement
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /posts/{id}:
 *  get:
 *      summary: دریافت آگهی
 *      tags:
 *          -   Announcement
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
 * /posts/{id}:
 *  patch:
 *      summary: ویرایش دسته بندی
 *      tags:
 *          -   Announcement
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdatePost'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdatePost'
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /posts/search?state={state}&city={city}:
 *  get:
 *      summary: جستجو آگهی بر اساس شهر و استان
 *      tags:
 *          -   Announcement
 *      parameters:
 *         - in: query
 *           name: state
 *         - in: query
 *           name: city
 *      responses:
 *          200:
 *              description: success
 */


/**
 * @swagger
 *
 * /posts/{id}:
 *  delete:
 *      summary: حذف آگهی
 *      tags:
 *          -   Announcement
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      responses:
 *          200:
 *              description: success
 */
