require("dotenv").config();

const pool = require('../model/database');
const bcrypt = require("bcrypt");
const CustomerDBModel = require('../model/customerDBModel');


module.exports.getCustomer = async (req, res) => {
    if (req.session) {  // on utilise la session avec le Token du user connecter et JWT...
        const clientObj = req.session;
        const id = clientObj.id;

        const client = await pool.connect();
        try {
            if (isNaN(id))
                res.sendStatus(400);

            else {
                const {rows: customers} = await CustomerDBModel.getCustomerById(client, id);
                const customer = customers[0];

                if (customer !== undefined) res.json(customer);
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

module.exports.createCustomer = async (req, res) => {
    const body = req.body;                  // Récuperation du body contemant les info
    const {email,password,username,phonenumber,birthdate,gender} = body;
    const client = await pool.connect();    // Connexion au client DB

    try {
        const passwordHashed = bcrypt.hashSync(password, 10); // Hachage du password

        // Appel à la méthode postCustomer qui ce charge de push les info dans la BD
        await CustomerDBModel.postCustomer(client,email,passwordHashed,username,phonenumber,birthdate,gender);
        res.sendStatus(201); // Indique que le customer à bien été créer
    } catch (error) {
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.updateCustomer = async (req, res) => {
    if (req.session) {
        const clientObj = req.session;
        const toUpdate = req.body;
        const newData = {};

        const client = await pool.connect();

        const {rows: customersFound} = await CustomerDBModel.getCustomerById(client,clientObj.id);
        const customerFound = customersFound[0];

        newData.email = toUpdate.email ? toUpdate.email : customerFound.email;
        newData.password = toUpdate.password ? bcrypt.hashSync(toUpdate.password, 10) : customerFound.password;
        newData.username = toUpdate.username ? toUpdate.username : customerFound.username;
        newData.phonenumber = toUpdate.phonenumber ? toUpdate.phonenumber : customerFound.phonenumber;

        try {
            await CustomerDBModel.pathCustomer(
                client,
                clientObj.id,
                newData.email,
                newData.password,
                newData.username,
                newData.phonenumber
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

module.exports.deleteCustomer = async (req, res) => {
    if (req.session) {
        const clientObj = req.session;
        const id = clientObj.id;

        const client = await pool.connect();
        try{
            await CustomerDBModel.deleteCustomer(client,id);
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


