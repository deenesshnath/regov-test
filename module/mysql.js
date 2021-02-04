const mysql = require('mysql');
var connection21Pool;
const mysqlConnections = require('./connection').connections;
function init(connectionOptions) {
    connection21Pool = mysql.createPool(connectionOptions)
}
function getConnectionPool() {
    connection21Pool = mysql.createPool(mysqlConnections);
    return connection21Pool;
}

module.exports = {
    init    :   init,
    getConnectionPool:  getConnectionPool
};