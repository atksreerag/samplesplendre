const express = require('express');
const { TokenExpiredError } = require('jsonwebtoken');
const router = express.Router();
const admin = require("../middleware/admin");
const token = require("../middleware/token")
const {doAddUser, doGetUser, doGetOne, doEditUser, doDeleteUser, doLogin, protect, adminProtect, doRefreshToken} = require('../repository/user.repository')
//user routes
//router.use(protect);
router.post('/add_user_details', doAddUser)
router.get('/get-users',admin,doGetUser)
router.get('/get-one-user/:id',token,doGetOne)
router.put('/edit-user',token,doEditUser)
router.delete('/delete-user/:id',token,doDeleteUser)
//sign in
router.post('/user-login',doLogin)
router.post('/refresh-token',doRefreshToken)

module.exports = router;

