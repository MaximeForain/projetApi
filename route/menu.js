const MenuControleur = require("../controller/menuDBControler");
const jtwMiddleware = require("../middleware/identificationJWT");
const Authorization = require("../middleware/Authorization");

const Router = require("express-promise-router");
const router = new Router;

router.get('/:id', jtwMiddleware.identification,MenuControleur.getMenu);
router.post('/', jtwMiddleware.identification,Authorization.mustBeAdmin,MenuControleur.createMenu);
router.patch('/', jtwMiddleware.identification,Authorization.mustBeAdmin,MenuControleur.updateMenu);
router.delete('/:id', jtwMiddleware.identification,Authorization.mustBeAdmin,MenuControleur.deleteMenu);

module.exports = router;