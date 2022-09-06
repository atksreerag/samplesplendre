const express = require('express')
const router = express.Router()

const {doAddUser, doGetUser, doGetOne, doEditUser, doDeleteUser} = require('../controller/userController')
//user routes
router.post('/add_user_details',doAddUser)
router.get('/get-user',doGetUser)
router.get('/get-one-user/:id',doGetOne)
router.put('/edit-user',doEditUser)
router.delete('/delete-user/:id',doDeleteUser)


module.exports = router;