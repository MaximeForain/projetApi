module.exports.customerExist = async (client,email) => {
    return await client.query(`SELECT * FROM customer WHERE email = $1 ;`, [email]);
}

module.exports.getCustomerById = async (client,id) => {
    return await client.query(`SELECT * FROM customer WHERE customer_id = $1 ;`, [id]);
}

module.exports.postCustomer = async (client,email,password,username,phonenumber,birthdate,gender) => {
    return await client.query(`
        INSERT INTO customer (email,password,username,phonenumber,birthdate,gender)
        VALUES ($1,$2,$3,$4,to_date($5, 'DD Mon YYYY'),$6)`,
        [email,password,username,phonenumber,birthdate,gender]);
}

module.exports.pathCustomer = async (client,id,email,password,username,phonenumber) => {
    return await client.query(`
        UPDATE customer SET  email = $1, password = $2, username = $3, phonenumber= $4
        WHERE customer_id = $5`,
        [email,password,username,phonenumber,id]);
}

module.exports.deleteCustomer = async (client,id) => {
    return await client.query(`DELETE FROM customer WHERE customer_id = $1`, [id]);
}

