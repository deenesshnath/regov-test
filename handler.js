const data = require('./endpoint');

function getproduct(req, res) {
    data.getproduct()
    .then(result => res.status(200).json(result))
    .catch(error => res.status(500).json(error));
}

function addproduct(req, res) {
    data.addproduct(req.body)
    .then(result => res.status(200).json(result))
    .catch(error => res.status(500).json(error));
}

function deleteproduct(req, res) {
    data.deleteproduct(req.query.id)
    .then(result => res.status(200).json(result))
    .catch(error => res.status(500).json(error));
}

function getwarehouse(req, res) {
    data.getwarehouse(req.query.data)
    .then(result => res.status(200).json(result))
    .catch(error => res.status(500).json(error));
}

function getwarehouses(req, res) {
    data.getwarehouses()
    .then(result => res.status(200).json(result))
    .catch(error => res.status(500).json(error));
}

function deletewarehouse(req, res) {
    data.deletewarehouse(req.query.id)
    .then(result => res.status(200).json(result))
    .catch(error => res.status(500).json(error));
}

function addwarehouse(req, res) {
    data.addwarehouse(req.body)
    .then(result => res.status(200).json(result))
    .catch(error => res.status(500).json(error));
}

function getstock(req, res) {
    data.getstock()
    .then(result => res.status(200).json(result))
    .catch(error => res.status(500).json(error));
}

function stock(req, res) {
    data.stock(req.body)
    .then(result => res.status(200).json(result))
    .catch(error => res.status(500).json(error));
}

function unstock(req, res) {
    data.unstock(req.body)
    .then(result => res.status(200).json(result))
    .catch(error => res.status(500).json(error));
}


module.exports = {
    getproduct : getproduct,
    addproduct : addproduct,
    deleteproduct : deleteproduct,
    getwarehouse : getwarehouse,
    getwarehouses : getwarehouses,
    deletewarehouse:deletewarehouse,
    addwarehouse:addwarehouse,
    getstock:getstock,
    stock:stock,
    unstock:unstock
 
}