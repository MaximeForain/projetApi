require("dotenv").config();

const pool = require('../model/database');
const BarDBModel = require('../model/barDBModel');


module.exports.getBar = async (req, res) => {
    if (req.session) {  // on utilise la session de l'admin avec son Token
        const clientObj = req.session;
        const client_id = clientObj.id;
        const status = clientObj.authLevel;

        const client = await pool.connect();
        if (status === "customer") {
            try {
                const {rows: barAdmins} = await BarDBModel.getBars(client);

                if (barAdmins.length !== 0)
                    res.json(barAdmins);
                else
                    res.sendStatus(404);

            } catch (error){
                res.sendStatus(500);
            } finally {
                client.release();
            }
        }
        else if (status === "admin") {
            try {
                if (isNaN(client_id)) res.sendStatus(400);
                else {
                    const {rows: barsAdmin} = await BarDBModel.getBarByAdminId(client,client_id);

                    if (barsAdmin !== undefined)
                        res.json(barsAdmin);
                    else
                        res.sendStatus(404);
                }
            } catch (error){
                res.sendStatus(500);
            } finally {
                client.release();
            }
        } else {
            res.sendStatus(400);
            client.release();
        }
    } else  {
        res.sendStatus(401);
    }
}

module.exports.createBar = async (req, res) => {
    if (req.session) {  // on utilise la session de l'admin avec son Token
        const clientObj = req.session;
        const id = clientObj.id;

        const body = req.body;                  // Récuperation du body contemant les info
        const {barname,description,phonenumber,hashtags,webaddress,address} = body;

        const client = await pool.connect();    // Connexion au client DB

        try {
            // Appel à la méthode postBarAdmin qui ce charge de push les info dans la BD
            await BarDBModel.postBar(client,barname,description,phonenumber,hashtags,webaddress,address,id);
            res.sendStatus(201); // Indique que le BarAdmin à bien été créer
        } catch (error) {
            res.sendStatus(500);
        } finally {
            client.release();
        }
    } else  {
        res.sendStatus(401);
    }
}

module.exports.updateBar = async (req, res) => {
    if (req.session) {
        const clientObj = req.session;
        const toUpdate = req.body;
        const newData = {};

        const client = await pool.connect();

        const {rows: barsFound} = await BarDBModel.getBarByAdminIdAndBarId(client,clientObj.id,toUpdate.bar_id);
        const barFound = barsFound[0];

        newData.barname = toUpdate.barname ? toUpdate.barname : barFound.barname;
        newData.description = (toUpdate.description === "" || toUpdate.description) ? toUpdate.description : barFound.description;
        newData.phonenumber = toUpdate.phonenumber ? toUpdate.phonenumber : barFound.phonenumber;
        newData.hashtags = (toUpdate.hashtags === "" || toUpdate.hashtags) ? toUpdate.hashtags : barFound.hashtags;
        newData.webaddress = toUpdate.webaddress ? toUpdate.webaddress : barFound.webaddress;
        newData.address = toUpdate.address ? toUpdate.address : barFound.address;

        try {
            await BarDBModel.pathBar(
                client,
                clientObj.id,
                toUpdate.bar_id,
                newData.barname,
                newData.description,
                newData.phonenumber,
                newData.hashtags,
                newData.webaddress,
                newData.address
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

module.exports.deleteBar = async (req, res) => {
    if (req.session) {
        const clientObj = req.session;
        const admin_id = clientObj.id;
        const bar_id_text = req.params.id;
        const bar_id = parseInt(bar_id_text);

        if (isNaN(bar_id))
            res.sendStatus(400);

        else {

            const client = await pool.connect();
            try{
                await BarDBModel.deleteBar(client,admin_id,bar_id);
                res.sendStatus(204);
            } catch (error){
                res.sendStatus(500);
            } finally {
                client.release();
            }
        }
    } else {
        res.sendStatus(401);
    }
}


