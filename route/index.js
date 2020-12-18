const router = require("express").Router();
const UserRouter = require('./user');
const CustomerRouter = require('./customer');
const AdminRouter = require('./admin');
const BarRouter = require('./bar');
const CategoryRouter = require('./category');
const MenuRouter = require('./menu');
const ProductRouter = require('./product');
const PromotionRouter = require('./promotion');
const ReviewRouter = require('./review');

router.use("/user",UserRouter);
router.use("/customer",CustomerRouter);
router.use("/admin",AdminRouter);
router.use("/bar",BarRouter);
router.use("/category",CategoryRouter);
router.use("/menu",MenuRouter);
router.use("/product",ProductRouter);
router.use("/promotion",PromotionRouter);
router.use("/review",ReviewRouter);

module.exports = router;

