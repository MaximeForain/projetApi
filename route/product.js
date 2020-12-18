const ProductControleur = require("../controller/productDBControler");
const jtwMiddleware = require("../middleware/identificationJWT");
const Authorization = require("../middleware/Authorization");

const Router = require("express-promise-router");
const router = new Router;

router.get('/:id', jtwMiddleware.identification,ProductControleur.getProduct);
router.post('/', jtwMiddleware.identification,Authorization.mustBeAdmin,ProductControleur.createProduct);
router.patch('/', jtwMiddleware.identification,Authorization.mustBeAdmin,ProductControleur.updateProduct);
router.delete('/:id', jtwMiddleware.identification,Authorization.mustBeAdmin,ProductControleur.deleteProduct);

module.exports = router;