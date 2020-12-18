module.exports.getReviewByBarId = async (client,bar_id) => {
    return await client.query(`SELECT * FROM review WHERE bar_id = $1;`, [bar_id]);
}

module.exports.getReviewByCustomerIdAndBarId = async (client,user_id,bar_id) => {
    return await client.query(`SELECT * FROM review WHERE customer_id = $1 AND bar_id = $2`, [user_id,bar_id]);
}

module.exports.postReview = async (client,reviewdegree,customer_id,bar_id) => {
    return await client.query(`
        INSERT INTO review (reviewdegree,customer_id,bar_id)
        VALUES ($1,$2,$3)`,
        [reviewdegree,customer_id,bar_id]);
}

module.exports.getReviewByReviewIdAndCustomerId = async (client,customer_id,review_id) => {
    return await client.query(`SELECT * FROM review WHERE customer_id = $1 AND reviewid = $2 `, [customer_id,review_id]);
}

module.exports.pathReview = async (client,customer_id,review_id,reviewdegree) => {
    return await client.query(`
        UPDATE review SET  reviewdegree=$1
        WHERE customer_id = $3 AND reviewid = $2`,
        [reviewdegree,customer_id,review_id]);
}

module.exports.deleteReview = async (client,review_id) => {
    return await client.query(`DELETE FROM review WHERE reviewid = $1`, [review_id]);
}