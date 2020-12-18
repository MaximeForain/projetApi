module.exports.adminExist = async (client, emailprofessional) => {
    return await client.query(`SELECT * FROM administrator WHERE emailprofessional = $1;`, [emailprofessional]);
}

module.exports.getAdminById = async (client,id) => {
    return await client.query(`SELECT * FROM administrator WHERE admin_id = $1 ;`, [id]);
}

module.exports.postAdmin = async (client,password,numtva,emailprofessional) => {
    return await client.query(`
        INSERT INTO administrator (password,numtva,emailprofessional)
        VALUES ($1,$2,$3)`,
        [password,numtva,emailprofessional]);
}

module.exports.pathAdmin = async (client,id,password,numtva,emailprofessional) => {
    return await client.query(`
        UPDATE administrator SET  password = $1, numtva = $2, emailprofessional = $3
        WHERE admin_id = $4`,
        [password,numtva,emailprofessional,id]);
}

module.exports.deleteAdmin = async (client,id) => {
    return await client.query(`DELETE FROM administrator WHERE admin_id = $1`, [id]);
}