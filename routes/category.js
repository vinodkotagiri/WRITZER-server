const express = require('express')
const router = express.Router()

// middleware
const { requireSignin, isAdmin } = require('../middleware')
// controllers
const {
	createCategory,
	listCategories,
	removeCategory,
	updateCategory,
	postsByCategory,
} = require('../controllers/category')

router.post('/', requireSignin, isAdmin, createCategory)
router.get('/all', listCategories)
router.delete('/:slug', requireSignin, isAdmin, removeCategory)
router.put('/:slug', requireSignin, isAdmin, updateCategory)
router.get('/posts-by-category/:slug', postsByCategory)
module.exports = router
