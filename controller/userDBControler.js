require("dotenv").config();
const process = require('process');
const jwt = require('jsonwebtoken');

const pool = require('../model/database');
const UserDBModel = require('../model/userDBModel');


module.exports.login = async (req, res) => {
    const {email, password} = req.body;             // R&cuper l'email et le password passer par le body

    if (email === undefined || password === undefined)
        res.sendStatus(500);                        // Indique que le serveur a rencontré un problème inattendu qui l'empêche de répondre à la requête.

    else {
        const client = await pool.connect();        // Récupération du client BD (voir database.js)

        try {
            const result = await UserDBModel.getUser(client, email, password);  // On attend le résultat de getUser (voir userDBModel.js)
            const {userType, value} = result;       // On récupe les infos return par le getUser

            if (userType === "unknown")
                res.sendStatus(404);                // Indique que aucun User n'a été trouvé suite à la requête

            else if (userType === "customer") {     // Si le type de user est un customer (client de l'app Android)

                const {customer_id} = value;
                const id = customer_id;
                const payload = {status: userType, value: {id}}; // On récupère l'id car on en à besoin dans le token pour la suite

                const token = jwt.sign(             // Création du token
                    payload,
                    process.env.SECRET_TOKEN,
                    {expiresIn: '7d'}       // Le token expire aprés 7 jours (7d)
                );

                res.json(token);

            } else {

                const {admin_id} = value;
                const id = admin_id;
                const payload = {status: userType, value: {id}};

                const token = jwt.sign(             // Création du token
                    payload,
                    process.env.SECRET_TOKEN,
                    {expiresIn: '12h'}      // Le token expire aprés une heure (12h)
                );

                res.json(token);

            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        } finally {
            client.release();                       // Manage properly the client lifecycle.
        }
    }
}