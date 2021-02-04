const authEp = require('./authep');

function authlogin(req, res) {
    var body = req.body;
    authEp.checkuser(body)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))
        ;
}

function authsignup(req, res) {
    var user = req.body.username;
    var pass  = req.body.password;
    var level = req.body.level
    authEp.createuser(user,pass,level)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))
        ;
}

function changepassword(req, res) {
    var data =  req.body
    authEp.changepassword(data)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))
        ;
}

module.exports = {
    authlogin: authlogin,
    authsignup: authsignup,
    changepassword:changepassword,
}
