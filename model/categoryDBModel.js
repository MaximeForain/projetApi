module.exports.getCategoryByMenuId = async (client,menu_id) => {
    return await client.query(`SELECT * FROM category WHERE menu_id = $1 ;`, [menu_id]);
}

module.exports.postCategory = async (client,categoryname,menu_id) => {
    return await client.query(`
        INSERT INTO category (categoryname,menu_id)
        VALUES ($1,$2)`,
        [categoryname,menu_id]);
}

module.exports.getCategoryByCategoryIdAndMenuId = async (client,category_id,menu_id) => {
    return await client.query(`SELECT * FROM category WHERE category_id = $1 AND menu_id = $2`, [category_id,menu_id]);
}

module.exports.pathCategory = async (client,category_id,menu_id,categoryname) => {
    return await client.query(`
        UPDATE category SET  categoryname = $1
        WHERE category_id = $2 AND menu_id = $3`,
        [categoryname,category_id,menu_id]);
}

module.exports.deleteCategory = async (client,category_id) => {
    return await client.query(`DELETE FROM category WHERE category_id = $1`, [category_id]);
}