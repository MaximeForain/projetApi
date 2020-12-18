module.exports.getProductByCategoryId = async (client,category_id) => {
    return await client.query(`SELECT * FROM product WHERE category_id = $1 ;`, [category_id]);
}

module.exports.postProduct = async (client,productname,nbcl,alcoholvolume,price,description,category_id) => {
    return await client.query(`
        INSERT INTO product (productname,nbcl,alcoholvolume,price,description,category_id)
        VALUES ($1,$2,$3,$4,$5,$6)`,
        [productname,nbcl,alcoholvolume,price,description,category_id]);
}

module.exports.getProductByProductIdAndCategoryId = async (client,product_id,category_id) => {
    return await client.query(`SELECT * FROM product WHERE product_id = $1 AND category_id = $2`, [product_id,category_id]);
}

module.exports.pathProduct = async (client,product_id,category_id,productname,nbcl,alcoholvolume,price,description) => {
    return await client.query(`
        UPDATE product SET  productname=$1,nbcl=$2,alcoholvolume=$3,price=$4,description=$5
        WHERE product_id = $6 AND category_id = $7`,
        [productname,nbcl,alcoholvolume,price,description,product_id,category_id]);
}

module.exports.deleteProduct = async (client,product_id) => {
    return await client.query(`DELETE FROM product WHERE product_id = $1`, [product_id]);
}