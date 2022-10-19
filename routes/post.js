const express = require('express')
const formidable = require('express-formidable')
const router = express.Router()

// middleware
const {
	requireSignin,
	isAdmin,
	canCreateRead,
	canUpdateDeletePost,
	canDeleteMedia,
	canUpdateDeleteComment,
} = require('../middleware')
// controllers
const {
	createPost,
	posts,
	postsForAdmin,
	singlePost,
	editPost,
	removePost,
	uploadImage,
	uploadImageFile,
	media,
	removeMedia,
	postsByAuthor,
	postCount,
	createComment,
	comments,
	userComments,
	commentCount,
	updateComment,
	removeComment,
	getNumbers,
} = require('../controllers/post')

//posts
router.post('/create-post', requireSignin, canCreateRead, createPost)
router.get('/posts', posts)
router.get('/posts-for-admin', requireSignin, isAdmin, postsForAdmin)
router.get('/posts-by-author', requireSignin, postsByAuthor)
router.get('/:slug', singlePost)
router.put('/edit-post/:postId', requireSignin, canUpdateDeletePost, editPost)
router.delete('/:postId', requireSignin, canUpdateDeletePost, removePost)
router.post(
	'/upload-image-file',
	formidable(),
	requireSignin,
	canCreateRead,
	uploadImageFile
)
router.post('/upload-image', requireSignin, canCreateRead, uploadImage)
router.get('/numbers', getNumbers)

//media
router.get('/media', requireSignin, canCreateRead, media)
router.delete('/media/:id', requireSignin, canDeleteMedia, removeMedia)

//comment
router.post('/comment/:postId', requireSignin, createComment)
router.get('/comments/:page', requireSignin, isAdmin, comments)
router.get('/user-comments', requireSignin, userComments)
router.get('/comment-count', commentCount)
router.put(
	'/comment/:commentId',
	requireSignin,
	canUpdateDeleteComment,
	updateComment
)
router.delete(
	'/comment/:commentId',
	requireSignin,
	canUpdateDeleteComment,
	removeComment
)

module.exports = router
