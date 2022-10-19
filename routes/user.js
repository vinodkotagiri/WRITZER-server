const express = require('express')
const router = express.Router()
//controllers
const {
	createUser,
	listUsers,
	currentUser,
	deleteUser,
	updateUser,
	updateUserByAdmin,
} = require('.././controllers/user')
//middleware
const { requireSignin, isAdmin, isAuthor } = require('../middleware')
router.post('/create-user', requireSignin, isAdmin, createUser)
router.get('/all', requireSignin, isAdmin, listUsers)
router.get('/:userId', requireSignin, currentUser)
router.delete('/:userId', requireSignin, isAdmin, deleteUser)
router.put('/update-by-admin', requireSignin, isAdmin, updateUserByAdmin)
router.put('/update-by-user', requireSignin, updateUser)
// router.get('/current-admin', requireSignin, isAdmin, currentUser)
// router.get('/current-author', requireSignin, isAuthor, currentUser)
// // router.get('/current-subscriber', requireSignin, currentUser)
module.exports = router
