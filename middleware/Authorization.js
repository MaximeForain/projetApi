module.exports.mustBeCustomer = (req, res, next) => {
    if(req.session && req.session.authLevel === "customer"){
        next();
    } else {
        res.sendStatus(403);
    }
}

/**
 *@swagger
 * components:
 *  responses:
 *      mustBeAdmin:
 *          description: L'action demandée ne peut être réalisée que par un admin
 */
module.exports.mustBeAdmin = (req, res, next) => {
    if(req.session && req.session.authLevel === "admin"){
        next();
    } else {
        res.sendStatus(403);
    }
}
