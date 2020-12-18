const UserControleur = require("../controller/userDBControler");

const Router = require("express-promise-router");
const router = new Router;

router.post('/', UserControleur.login);

module.exports = router;