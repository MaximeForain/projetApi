require("dotenv").config();

const pool = require('../model/database');
const ReviewDBModel = require('../model/reviewDBModel');


module.exports.getReview = async (req, res) => {
    if (req.session) {
        const clientObj = req.session;
        const user_id = clientObj.id;
        const status = clientObj.authLevel;
        const bar_id_text = req.params.id;
        const bar_id = parseInt(bar_id_text);


        const client = await pool.connect();

        if (isNaN(bar_id)) res.sendStatus(400);

        else {
            if (status === "customer") {
                try {
                    const {rows: reviewsCustomer} = await ReviewDBModel.getReviewByCustomerIdAndBarId(client,user_id,bar_id);
                    const {rows: reviwsBar} = await ReviewDBModel.getReviewByBarId(client,bar_id);

                    const reviews = {reviewsCustomer,reviwsBar}

                    if (reviews.length !== 0) res.json(reviews);
                    else res.sendStatus(404);

                } catch (error){
                    res.sendStatus(500);
                } finally {
                    client.release();
                }
            } else if (status === "admin") {

                try {

                    const {rows: reviews} = await ReviewDBModel.getReviewByBarId(client,bar_id);

                    // TODO: barAdmins.lenght !== 0
                    if (reviews !== undefined) res.json(reviews);
                    else res.sendStatus(404);

                } catch (error){
                    res.sendStatus(500);
                } finally {
                    client.release();
                }
            }
        }
    } else  {
        res.sendStatus(401);
    }
}

module.exports.createReview = async (req, res) => {
    if (req.session) {
        const clientObj = req.session;
        const customer_id = clientObj.id;

        const body = req.body;
        const {reviewdegree,bar_id} = body;

        const client = await pool.connect();

        try {
            await ReviewDBModel.postReview(client,reviewdegree,customer_id,bar_id);
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

module.exports.updateReview = async (req, res) => {
    if (req.session) {
        const clientObj = req.session;
        const customer_id = clientObj.id;
        const toUpdate = req.body;
        const newData = {};

        const client = await pool.connect();

        const {rows: reviewsFound} = await ReviewDBModel.getReviewByReviewIdAndCustomerId(client,customer_id,toUpdate.review_id);
        const reviewFound = reviewsFound[0];

        newData.reviewdegree = toUpdate.reviewdegree ? toUpdate.reviewdegree : reviewFound.reviewdegree;

        try {
            await ReviewDBModel.pathReview(
                client,
                customer_id,
                toUpdate.review_id,
                newData.reviewdegree
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

module.exports.deleteReview = async (req, res) => {
    if (req.session) {
        const review_id_text = req.params.review_id;
        const review_id = parseInt(review_id_text);

        if (isNaN(review_id))
            res.sendStatus(400);

        else {

            const client = await pool.connect();
            try {
                await ReviewDBModel.deleteReview(client, review_id);
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

