require("dotenv").config();

const pool = require('../model/database');
const ProductDBModel = require('../model/productDBModel');


module.exports.getProduct = async (req, res) => {
    if (req.session) {
        const client = await pool.connect();
        const category_id_text = req.params.id;
        const category_id = parseInt(category_id_text);

        try {
            if (isNaN(category_id))
                res.sendStatus(400);

            else {
                const {rows: products} = await ProductDBModel.getProductByCategoryId(client, category_id);

                if (products.length !== 0) res.json(products);
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

module.exports.createProduct = async (req, res) => {
    if (req.session) {
        const body = req.body;
        const {productname,nbcl,alcoholvolume,price,description,category_id} = body;

        const client = await pool.connect();
        try {
            await ProductDBModel.postProduct(client,productname,nbcl,alcoholvolume,price,description,category_id);
            res.sendStatus(201);
        } catch (error) {
            res.sendStatus(500);
        } finally {
            client.release();
        }
    } else  {
        res.sendStatus(401);
    }
}

module.exports.updateProduct = async (req, res) => {
    if (req.session) {
        const toUpdate = req.body;
        const newData = {};

        const client = await pool.connect();

        const {rows: productsFound} = await ProductDBModel.getProductByProductIdAndCategoryId(client,toUpdate.product_id,toUpdate.category_id);
        const productFound= productsFound[0];

        newData.productname = toUpdate.productname ? toUpdate.productname : productFound.productname;
        newData.nbcl = toUpdate.nbcl ? toUpdate.nbcl : productFound.nbcl;
        newData.alcoholvolume = toUpdate.alcoholvolume ? toUpdate.alcoholvolume : productFound.alcoholvolume;
        newData.price = toUpdate.price ? toUpdate.price : productFound.price;
        newData.description = toUpdate.description ? toUpdate.description : productFound.description;

        try {
            await ProductDBModel.pathProduct(
                client,
                toUpdate.product_id,
                toUpdate.category_id,
                newData.productname,
                newData.nbcl,
                newData.alcoholvolume,
                newData.price,
                newData.description
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

module.exports.deleteProduct = async (req, res) => {
    if (req.session) {
        const product_id_text = req.params.id;
        const product_id = parseInt(product_id_text);

        if (isNaN(product_id))
            res.sendStatus(400);

        else {

            const client = await pool.connect();
            try {
                await ProductDBModel.deleteProduct(client, product_id);
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