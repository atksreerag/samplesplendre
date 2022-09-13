const express = require('express')
const router = express.Router();
const admin = require("../middleware/admin");

const {doAddUser, doGetUser, doGetOne, doEditUser, doDeleteUser, doLogin, protect, adminProtect, doRefreshToken} = require('../controller/userController')
//user routes
//router.use(protect);
router.post('/add_user_details', admin, doAddUser)
router.get('/get-user',protect,adminProtect,doGetUser)
router.get('/get-one-user/:id',admin,doGetOne)
router.put('/edit-user',protect,doEditUser)
router.delete('/delete-user/:id',protect,doDeleteUser)
//sign in
router.post('/user-login',doLogin)
router.post('/refresh-token',doRefreshToken)



module.exports = router;