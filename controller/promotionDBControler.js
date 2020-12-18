require("dotenv").config();

const pool = require('../model/database');
const PromotionDBModel = require('../model/promotionDBModel');


module.exports.getPromotion = async (req, res) => {
    if (req.session) {
        const client = await pool.connect();
        const product_id_text = req.params.id;
        const product_id = parseInt(product_id_text);

        try {
            if (isNaN(product_id))
                res.sendStatus(400);

            else {
                const {rows: promotions} = await PromotionDBModel.getPromotionByProductId(client, product_id);
                const promotion = promotions[0];

                if (promotion !== undefined) res.json(promotion);
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

module.exports.createPromotion = async (req, res) => {
    if (req.session) {
        const body = req.body;
        const {promoprice,ishappyhour,startdate,enddate,starttime,endtime,desciption,product_id} = body;

        const client = await pool.connect();
        try {
            await PromotionDBModel.postPromotion(client,promoprice,ishappyhour,startdate,enddate,starttime,endtime,desciption,product_id);
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

module.exports.updatePromotion = async (req, res) => {
    if (req.session) {
        const toUpdate = req.body;
        const newData = {};

        const client = await pool.connect();

        const {rows: promotionsFound} = await PromotionDBModel.getPromotionByProductId(client,toUpdate.product_id);
        const promotionFound= promotionsFound[0];

        newData.promoprice = toUpdate.promoprice ? toUpdate.promoprice : promotionFound.promoprice;
        newData.ishappyhour = toUpdate.ishappyhour ? toUpdate.ishappyhour : promotionFound.ishappyhour;
        newData.startdate = toUpdate.startdate ? toUpdate.startdate : promotionFound.startdate;
        newData.enddate = toUpdate.enddate ? toUpdate.enddate : promotionFound.enddate;
        newData.starttime = toUpdate.starttime ? toUpdate.starttime : promotionFound.starttime;
        newData.endtime = toUpdate.endtime ? toUpdate.endtime : promotionFound.endtime;
        newData.desciption = toUpdate.desciption ? toUpdate.desciption : promotionFound.desciption;

        try {
            await PromotionDBModel.pathPromotion(
                client,
                toUpdate.product_id,
                newData.promoprice,
                newData.ishappyhour,
                newData.startdate,
                newData.enddate,
                newData.starttime,
                newData.endtime,
                newData.desciption,
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

module.exports.deletePromotion = async (req, res) => {
    if (req.session) {
        const product_id_text = req.params.id;
        const product_id = parseInt(product_id_text);

        if (isNaN(product_id))
            res.sendStatus(400);

        else {

            const client = await pool.connect();
            try {
                await PromotionDBModel.deletePromotion(client, product_id);
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

