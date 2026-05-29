const express = require("express");
const router = express.Router();

const {login , getUser,createUser,deleteUser,getUsersrec} = require('./userController');


router.post('/login',login);

router.get('/get',getUser);

router.post('/create',createUser);

router.delete('/delete/:id',deleteUser);
router.get('/userRec',getUsersrec);

module.exports = router;