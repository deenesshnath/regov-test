var connections = {

    connectionLimit: 10, //staging
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    multipleStatements: true

}

module.exports = {
    connections: connections
}