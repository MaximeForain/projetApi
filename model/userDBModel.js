const bcrypt = require("bcrypt");
const {customerExist} = require('./customerDBModel');
const {adminExist} = require('./adminDBModel');

/*
* J'ai installé bcrypet dans le projet, il faudra que tu vérifies de ton côté que tu es bien
* installé : (en global pas dans le projet)
*   npm install --global windows-build-tools
*   npm install -g node-gyp
* */

/*
* Cette fonction servira à reconnaître le type d'utilisateur qui se connectera
* soit un client de l'application ou bien un administrateur sur le site web
*
* Elle retournera un objet avec le type de user et ca valeur.
* */


module.exports.getUser = async (client, email, password) => {

    const promises = [];
    const promisesCustomer = customerExist(client, email);    // Récupere le customer (user de l'application) dans la DB avec sont email
    const promisesAdmin = adminExist(client, email);          // Récupere l'admin dans la DB avec sont email
    promises.push(promisesCustomer, promisesAdmin);         // Tableau des promises récuperé avec les getters

    /*
    * renvoie une promesse (Promise) qui est résolue lorsque l'ensemble des promesses contenues
    * dans l'itérable passé en argument ont été résolues (ou qui échoue)
    * */
    const values = await Promise.all(promises);
    const customerRow = values[0].rows[0];
    const adminRow = values[1].rows[0];


    /*
    * Vérification de quel type de user à été récupérer grâce a l'email
    * Vérification également du password donner avec celui du user récupère
    * */

    //console.log(bcrypt.compareSync(password, customerRow.password)); //TEST

    if (customerRow !== undefined && await bcrypt.compare(password, customerRow.password)){
        return {userType: "customer", value: customerRow};
    } else if (adminRow !== undefined && await bcrypt.compare(password, adminRow.password)) {
        return {userType: "admin", value: adminRow};
    } else {
        return {userType: "unknown", value: null};
    }
}
