const express = require('express')
const router = express.Router()

const {doAddUser, doGetUser, doGetOne, doEditUser, doDeleteUser, doLogin, protect, auth} = require('../controller/userController')
//user routes
//router.use(protect);
router.post('/add_user_details',protect,doAddUser)
router.get('/get-user',protect,doGetUser)
router.get('/get-one-user/:id',doGetOne)
router.put('/edit-user',doEditUser)
router.delete('/delete-user/:id',doDeleteUser)
//sign in
router.post('/user-login',doLogin)



module.exports = router;