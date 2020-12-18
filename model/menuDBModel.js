module.exports.getMenuByBarId = async (client,bar_id) => {
    return await client.query(`SELECT * FROM menu WHERE bar_id = $1 ;`, [bar_id]);
}

module.exports.postMenu = async (client,menuname,isondisplay,happyhourstarttime,happyhourendtime,bar_id) => {
    return await client.query(`
        INSERT INTO menu (menuname,isondisplay,happyhourstarttime,happyhourendtime,bar_id)
        VALUES ($1,$2,$3,$4,$5)`,
        [menuname,isondisplay,happyhourstarttime,happyhourendtime,bar_id]);
}

module.exports.getMenuByMenuIdAndBarId = async (client,menu_id,bar_id) => {
    return await client.query(`SELECT * FROM menu WHERE menu_id = $1 AND bar_id = $2`, [menu_id,bar_id]);
}

module.exports.pathMenu = async (client,menu_id_id,bar_id,menuname,isondisplay,happyhourstarttime,happyhourendtime) => {
    return await client.query(`
        UPDATE menu SET  menuname=$1,isondisplay=$2,happyhourstarttime=$3,happyhourendtime=$4
        WHERE menu_id = $5 AND bar_id = $6`,
        [menuname,isondisplay,happyhourstarttime,happyhourendtime,menu_id_id,bar_id]);
}

module.exports.deleteMenu = async (client,menu_id) => {
    return await client.query(`DELETE FROM menu WHERE menu_id = $1`, [menu_id]);
}