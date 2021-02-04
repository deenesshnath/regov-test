const express = require('express');
const Handler = require('./handler');
const router = express.Router();


// private routing. Require access validation

router.post('product',Handler.addproduct);
router.get('product',Handler.getproduct);
router.delete('product',Handler.deleteproduct);

router.post('warehouse',Handler.addwarehouse);
router.get('warehouse',Handler.getwarehouse);
router.get('warehouses',Handler.getwarehouses);
router.delete('warehouses',Handler.deletewarehouse);


router.get('getstock',Handler.getstock);
router.post('stock',Handler.stock);
router.post('unstock',Handler.unstock);






module.exports = router;