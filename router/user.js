const express = require('express');
const { TokenExpiredError } = require('jsonwebtoken');
const router = express.Router();
const admin = require("../middleware/admin");
const token = require("../middleware/token")
const {doAddUser, doGetUser, doGetOne, doEditUser, doDeleteUser, doLogin, refreshTokenUser} = require('../repository/user.repository')

//user routes

router.post('/add_user_details',(req, res, next) => {
    doAddUser(req, res, next)
})

router.get('/get-users',admin,(req, res, next) => {
    doGetUser(req, res, next)
})

router.get('/get-one-user/:id',token,(req, res, next) => {
    doGetOne(req, res, next)
})

router.put('/edit-user', token, (req, res, next) => {
    doEditUser(req, res, next)
})
router.delete('/delete-user/:id',token,(req, res, next) => {
    doDeleteUser(req, res, next)
})

//sign in
router.post('/user-login',doLogin)
router.post('/refresh-token',refreshTokenUser)

module.exports = router;

