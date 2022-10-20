const express = require('express')

const router = express.Router()

// middlewares
const { requireSignin, isAdmin } = require('../middleware')
// controller
const { contact, createPage, getPage } = require('../controllers/website')

router.post('/contact', contact)
router.post('/page', requireSignin, isAdmin, createPage)
router.get('/page/:page', getPage)
router.get('/', (req, res) => {
	res.status(200).send('You hit The Server Home')
	console.log('Server home page call')
})
module.exports = router
