const apiResponse = require('./api_response');
const mysqlConnector = require('./module/mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


function checkuser(data) {
    return new Promise((resolve, reject) => {
        var connection;
        mysqlConnector.getConnectionPool().getConnection((err, conn) => {
            if (err) return reject(new apiResponse(500, err.code))
            connection = conn
            var sql_query = "Select * from admin.USER_APP where user = ?";
            if (err) return reject(new apiResponse(500, err.code));
            connection.query(sql_query, data.user, (err, results, fields) => {
                connection.release();
                if (err) return reject(new apiResponse(500, err.code));
                if (results.length > 0) {
                bcrypt.compare(data.password, results[0].password).then(function (res) {
                    if (res) {
                        var token = jwt.sign({ userID: results[0].user, level: results[0].level }, 'backendtest');
                        resolve(new apiResponse(200, token));
                    }
                    else reject(new apiResponse(401, "Not Authorize"));
                });
                }
                else reject(new apiResponse(404, "Not Found"));
            });
        })
    })
}


function createuser(username, password) {
    return new Promise((resolve, reject) => {
        var connection;

        mysqlConnector.getConnectionPool().getConnection((err, conn) => {
            if (err) return reject(new apiResponse(500, err.code))
            connection = conn
            let hash = bcrypt.hashSync(password, 10)
            var sql_query = "Insert into admin.USER_APP (user,password) values (?,?)";
            var values = [username, hash, level]
            if (err) return reject(new apiResponse(500, err.code));
            connection.query(sql_query, values, (err, results, fields) => {
                connection.release();
                if (err) return reject(err.code);
                resolve(new apiResponse(200, "User Registered"));
            });


        })
    })
}


function changepassword(data) {
    return new Promise((resolve, reject) => {
        var connection;
        mysqlConnector.getConnectionPool().getConnection((err, conn) => {
            if (err) return reject(new apiResponse(500, err.code))
            connection = conn
            let hash = bcrypt.hashSync(data.password, 10)
            var sql_query = "Update admin.USER_APP set password=? where user=?";
            var values=[hash,data.username]
            if (err) return reject(new apiResponse(500, err.code));
            connection.query(sql_query, values,(err, results, fields) => {
                connection.release();
                if (err) return reject(err.code);
                resolve(new apiResponse(200, results));
            });


        })
    })
}

module.exports = {
    checkuser: checkuser,
    createuser: createuser,
    changepassword:changepassword
}