module.exports.getBars = async (client) => {
    return await client.query(`SELECT * FROM bar`);
}

module.exports.getBarByAdminId = async (client,id) => {
    return await client.query(`SELECT * FROM bar WHERE admin_id = $1`, [id]);
}

module.exports.getBarByAdminIdAndBarId = async (client,admin_id,bar_id) => {
    return await client.query(`SELECT * FROM bar WHERE admin_id = $1 AND bar_id = $2 `, [admin_id,bar_id]);
}

module.exports.postBar = async (client,barname,description,phonenumber,hashtags,webaddress,address,admin_id) => {
    return await client.query(`
        INSERT INTO bar (barname,description,phonenumber,hashtags,webaddress,address,admin_id)
        VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [barname,description,phonenumber,hashtags,webaddress,address,admin_id]);
}

module.exports.pathBar = async (client,admin_id,bar_id,barname,description,phonenumber,hashtags,webaddress,address) => {
    return await client.query(`
        UPDATE bar SET  barname=$1,description=$2,phonenumber=$3,hashtags=$4,webaddress=$5,address=$6
        WHERE admin_id = $7 AND bar_id = $8`,
        [barname,description,phonenumber,hashtags,webaddress,address,admin_id,bar_id]);
}

module.exports.deleteBar = async (client,admin_id,bar_id) => {
    return await client.query(`DELETE FROM bar WHERE admin_id = $1 AND bar_id = $2`, [admin_id,bar_id]);
}
