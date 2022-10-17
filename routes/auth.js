const express = require('express')
const router = express.Router()

//import auth controllers
const {
	signup,
	signin,
	forgotPassword,
	resetPassword,
} = require('.././controllers/auth')

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

module.exports = router
