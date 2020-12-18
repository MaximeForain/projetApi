const CustomerControleur = require("../controller/customerDBControler");
const jtwMiddleware = require("../middleware/identificationJWT");
const Authorization = require("../middleware/Authorization");

const Router = require("express-promise-router");
const router = new Router;

router.get('/', jtwMiddleware.identification,Authorization.mustBeCustomer,CustomerControleur.getCustomer);
router.post('/', CustomerControleur.createCustomer);
router.patch('/', jtwMiddleware.identification,Authorization.mustBeCustomer,CustomerControleur.updateCustomer);
router.delete('/', jtwMiddleware.identification,Authorization.mustBeCustomer,CustomerControleur.deleteCustomer);

module.exports = router;