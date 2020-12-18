const ReviewControler = require("../controller/reviewDBControler");
const jtwMiddleware = require("../middleware/identificationJWT");
const Authorization = require("../middleware/Authorization");

const Router = require("express-promise-router");
const router = new Router;

router.get('/:id', jtwMiddleware.identification,ReviewControler.getReview);
router.post('/', jtwMiddleware.identification,Authorization.mustBeCustomer,ReviewControler.createReview);
router.patch('/', jtwMiddleware.identification,Authorization.mustBeCustomer,ReviewControler.updateReview);
router.delete('/id', jtwMiddleware.identification,Authorization.mustBeCustomer,ReviewControler.deleteReview);

module.exports = router;