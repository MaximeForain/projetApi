require("dotenv").config();

const pool = require('../model/database');
const CategoryDBModel = require('../model/categoryDBModel');


module.exports.getCategory = async (req, res) => {
    if (req.session) {
        const client = await pool.connect();
        const menu_id_text = req.params.id;
        const menu_id = parseInt(menu_id_text);

        try {
            if (isNaN(menu_id))
                res.sendStatus(400);

            else {
                const {rows: categorys} = await CategoryDBModel.getCategoryByMenuId(client, menu_id);

                if (categorys.length !== 0) res.json(categorys);
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

module.exports.createCategory = async (req, res) => {
    if (req.session) {
        const body = req.body;                  // Récuperation du body contemant les info
        const {categoryname,menu_id} = body;

        const client = await pool.connect();    // Connexion au client DB
        try {
            // Appel à la méthode postBarAdmin qui ce charge de push les info dans la BD
            await CategoryDBModel.postCategory(client,categoryname,menu_id);
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

module.exports.updateCategory = async (req, res) => {
    if (req.session) {
        const toUpdate = req.body;
        const newData = {};

        const client = await pool.connect();

        const {rows: categorysFound} = await CategoryDBModel.getCategoryByCategoryIdAndMenuId(client,toUpdate.category_id,toUpdate.menu_id);
        const categoryFound= categorysFound[0];

        newData.categoryname = toUpdate.categoryname ? toUpdate.categoryname : categoryFound.categoryname;

        try {
            await CategoryDBModel.pathCategory(
                client,
                toUpdate.category_id,
                toUpdate.menu_id,
                newData.categoryname
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

module.exports.deleteCategory = async (req, res) => {
    if (req.session) {
        const category_id_text = req.params.id;
        const category_id = parseInt(category_id_text);

        if (isNaN(category_id))
            res.sendStatus(400);

        else {

            const client = await pool.connect();
            try {
                await CategoryDBModel.deleteCategory(client, category_id);
                res.sendStatus(204);
            } catch (error) {
                res.sendStatus(500);
            } finally {
                client.release();
            }
        }
    } else  {
        res.sendStatus(401);
    }
}

