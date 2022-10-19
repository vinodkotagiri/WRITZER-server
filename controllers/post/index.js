const { createPost } = require('./create')
const { editPost } = require('./edit')
const { removePost } = require('./remove')
const { media, removeMedia } = require('./media')
const { uploadImageFile, uploadImage } = require('./uploads')
const {
	postsForAdmin,
	posts,
	singlePost,
	postsByAuthor,
	postCount,
	getStats,
} = require('./posts')
const {
	createComment,
	comments,
	userComments,
	commentCount,
	updateComment,
	removeComment,
} = require('./comments')

module.exports = {
	createPost,
	postsForAdmin,
	posts,
	singlePost,
	editPost,
	removePost,
	uploadImageFile,
	uploadImage,
	media,
	removeMedia,
	postsByAuthor,
	postCount,
	getStats,
	createComment,
	comments,
	userComments,
	commentCount,
	updateComment,
	removeComment,
}
