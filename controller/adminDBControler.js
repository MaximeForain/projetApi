require("dotenv").config();

const pool = require('../model/database');
const bcrypt = require("bcrypt");
const AdminDBModel = require('../model/adminDBModel');

/**
 * @swagger
 * components:
 *  schemas:
 *      Admin:
 *          type: object
 *          properties:
 *              emailprofessional:
 *                  type: string
 *              password:
 *                  type: string
 *              numtva:
 *                  type: string
 */

/**
 *@swagger
 *components:
 *  responses:
 *      AdminFound:
 *          description: renvoie un admin
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Admin'
 */
module.exports.getAdmin = async (req, res) => {
    if (req.session) {
        const clientObj = req.session;
        const id = clientObj.id;

        const client = await pool.connect();
        try {
            if (isNaN(id))
                res.sendStatus(400);

            else {
                const {rows: admins} = await AdminDBModel.getAdminById(client, id);
                const admin = admins[0];

                if (admin !== undefined) res.json(admin);
                else res.sendStatus(404);
            }
        } catch (error){
            res.sendStatus(500);
        } finally {
            client.release();
        }
    } else  {
        res.sendStatus(401);
    }
}

/**
 *@swagger
 *components:
 *  responses:
 *      AdminAjoute:
 *          description: L'administrateur a été enregistré
 *  requestBodies:
 *      AdminAAjoute:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Admin'
 *                      required:
 *                          - emailprofessional
 *                          - password
 *                          - numtva
 */
module.exports.createAdmin = async (req, res) => {
    const body = req.body;
    const {password,numtva,emailprofessional} = body;
    const client = await pool.connect();

    try {
        const passwordHashed = bcrypt.hashSync(password, 10);

        await AdminDBModel.postAdmin(client,passwordHashed,numtva,emailprofessional);
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    } finally {
        client.release();
    }
}


/**
 *@swagger
 *components:
 *  responses:
 *      AdminUpdated:
 *          description: l'admin a été mis à jour
 *  requestBodies:
 *      AdminAUpdate:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Admin'
 */
module.exports.updateAdmin = async (req, res) => {
    if (req.session) {
        const clientObj = req.session;
        const toUpdate = req.body;
        const newData = {};

        const client = await pool.connect();

        const {rows: adminsFound} = await AdminDBModel.getAdminById(client,clientObj.id);
        const adminFound = adminsFound[0];

        newData.password = toUpdate.password ? bcrypt.hashSync(toUpdate.password, 10) : adminFound.password;
        newData.numtva = toUpdate.numtva ? toUpdate.numtva : adminFound.numtva;
        newData.emailprofessional = toUpdate.emailprofessional ? toUpdate.emailprofessional : adminFound.emailprofessional;

        try {
            await AdminDBModel.pathAdmin(
                client,
                clientObj.id,
                newData.password,
                newData.numtva,
                newData.emailprofessional
            );
            res.sendStatus(204);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    } else  {
        res.sendStatus(401);
    }
}

/**
 *@swagger
 *components:
 *  responses:
 *      AdminDeleted:
 *          description: l'admin a été supprimé
 */
module.exports.deleteAdmin = async (req, res) => {
    if (req.session) {
        const clientObj = req.session;
        const id = clientObj.id;

        const client = await pool.connect();
        try{
            await AdminDBModel.deleteAdmin(client,id);
            res.sendStatus(204);
        } catch (error){
            res.sendStatus(500);
        } finally {
            client.release();
        }
    } else {
        res.sendStatus(401);
    }
}

