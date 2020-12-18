const BarControleur = require("../controller/barDBControler");
const jtwMiddleware = require("../middleware/identificationJWT");
const Authorization = require("../middleware/Authorization");

const Router = require("express-promise-router");
const router = new Router;

router.get('/', jtwMiddleware.identification,BarControleur.getBar);
router.post('/', jtwMiddleware.identification,Authorization.mustBeAdmin,BarControleur.createBar);
router.patch('/', jtwMiddleware.identification,Authorization.mustBeAdmin,BarControleur.updateBar);
router.delete('/:id', jtwMiddleware.identification,Authorization.mustBeAdmin,BarControleur.deleteBar);

module.exports = router;