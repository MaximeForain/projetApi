const CategoryControler = require("../controller/categoryDBControler");
const jtwMiddleware = require("../middleware/identificationJWT");
const Authorization = require("../middleware/Authorization");

const Router = require("express-promise-router");
const router = new Router;

router.get('/:id', jtwMiddleware.identification,CategoryControler.getCategory);
router.post('/', jtwMiddleware.identification,Authorization.mustBeAdmin,CategoryControler.createCategory);
router.patch('/', jtwMiddleware.identification,Authorization.mustBeAdmin,CategoryControler.updateCategory);
router.delete('/:id', jtwMiddleware.identification,Authorization.mustBeAdmin,CategoryControler.deleteCategory);

module.exports = router;