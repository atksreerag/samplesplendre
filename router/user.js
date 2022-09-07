const express = require('express')
const router = express.Router()

const {doAddUser, doGetUser, doGetOne, doEditUser, doDeleteUser, doLogin, protect, doRefreshToken} = require('../controller/userController')
//user routes
//router.use(protect);
router.post('/add_user_details',doAddUser)
router.get('/get-user',protect,doGetUser)
router.get('/get-one-user/:id',protect,doGetOne)
router.put('/edit-user',protect,doEditUser)
router.delete('/delete-user/:id',protect,doDeleteUser)
//sign in
router.post('/user-login',doLogin)
router.post('/refresh-token',doRefreshToken)



module.exports = router;