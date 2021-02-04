const jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
const express = require('express');
const bodyParser = require('body-parser');
var app = express();


app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Origin, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET');
    if (req.method == 'OPTIONS') res.sendStatus(200);
    else next();
});

app.use(expressJwt({ secret: 'backendtest' }).unless({ path: ['/auth/login','/auth/signup','/auth/changepassword'] }));
app.use('/auth', require('./authrouter'));

app.use('/regov', require('./router'));


module.exports = app;


