const AdminControleur = require("../controller/adminDBControler");
const jtwMiddleware = require("../middleware/identificationJWT");
const Authorization = require("../middleware/Authorization");

const Router = require("express-promise-router");
const router = new Router;


/**
 * @swagger
 * /admin:
 *  get:
 *      tags:
 *         - Admin
 *      security:
 *         - bearerAuth: []
 *      responses:
 *          200:
 *              $ref: '#/components/responses/AdminFound'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          404:
 *              description: Admin non trouvé
 *          500:
 *              description: Erreur serveur
 */
router.get('/', jtwMiddleware.identification,Authorization.mustBeAdmin,AdminControleur.getAdmin);

/**
 * @swagger
 * /admin:
 *  post:
 *      tags:
 *          - Admin
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/AdminAAjoute'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/AdminAjoute'
 *          500:
 *              description: Erreur serveur
 */
router.post('/', AdminControleur.createAdmin);

/**
 * @swagger
 * /admin:
 *  patch:
 *      tags:
 *          - Admin
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/AdminAUpdate'
 *      responses:
 *          204:
 *              $ref: '#/components/responses/AdminUpdated'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description: Erreur serveur
 */
router.patch('/', jtwMiddleware.identification,Authorization.mustBeAdmin,AdminControleur.updateAdmin);

/**
 * @swagger
 * /admin:
 *  delete:
 *      tags:
 *          - Admin
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              $ref: '#/components/responses/AdminDeleted'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description: Erreur serveur
 */
router.delete('/', jtwMiddleware.identification,Authorization.mustBeAdmin,AdminControleur.deleteAdmin);

module.exports = router;