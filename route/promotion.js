const PromotionControler = require("../controller/promotionDBControler");
const jtwMiddleware = require("../middleware/identificationJWT");
const Authorization = require("../middleware/Authorization");

const Router = require("express-promise-router");
const router = new Router;

router.get('/', jtwMiddleware.identification,PromotionControler.getPromotion);
router.post('/', jtwMiddleware.identification,Authorization.mustBeAdmin,PromotionControler.createPromotion);
router.patch('/', jtwMiddleware.identification,Authorization.mustBeAdmin,PromotionControler.updatePromotion);
router.delete('/', jtwMiddleware.identification,Authorization.mustBeAdmin,PromotionControler.deletePromotion);

module.exports = router;