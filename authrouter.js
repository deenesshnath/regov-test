const express = require('express');
const auth = require('./auth');

const router = express.Router();


// private routing. Require access validation

router.post('/login',auth.authlogin);
router.post('/signup',auth.authsignup);
router.post('/changepassword',auth.changepassword);


module.exports = router;