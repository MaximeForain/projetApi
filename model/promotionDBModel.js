module.exports.getPromotionByProductId = async (client,product_id) => {
    return await client.query(`SELECT * FROM promotion WHERE product_id = $1 ;`, [product_id]);
}

module.exports.postPromotion = async (client,promoprice,ishappyhour,startdate,enddate,starttime,endtime,desciption,product_id) => {
    return await client.query(`
        INSERT INTO promotion (promoprice,ishappyhour,startdate,enddate,starttime,endtime,desciption,product_id)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [promoprice,ishappyhour,startdate,enddate,starttime,endtime,desciption,product_id]);
}

module.exports.getPromotionByProductId = async (client,product_id) => {
    return await client.query(`SELECT * FROM promotion WHERE product_id = $1`, [product_id]);
}

module.exports.pathPromotion = async (client,product_id,promoprice,ishappyhour,startdate,enddate,starttime,endtime,desciption) => {
    return await client.query(`
        UPDATE promotion SET  promoprice=$1,ishappyhour=$2,startdate=$3,enddate=$4,starttime=$5,endtime=$6,desciption=$7
        WHERE product_id = $8`,
        [promoprice,ishappyhour,startdate,enddate,starttime,endtime,desciption,product_id]);
}

module.exports.deletePromotion = async (client,product_id) => {
    return await client.query(`DELETE FROM promotion WHERE product_id = $1`, [product_id]);
}