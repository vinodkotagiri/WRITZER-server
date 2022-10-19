const { createPost } = require('./create')
const {
	postsForAdmin,
	posts,
	singlePost,
	postsByAuthor,
	postCount,
	getNumbers,
} = require('./posts')
const { editPost } = require('./edit')
const { removePost } = require('./remove')
const { uploadImageFile, uploadImage } = require('./uploads')
const { media, removeMedia } = require('./media')
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
	getNumbers,
	createComment,
	comments,
	userComments,
	commentCount,
	updateComment,
	removeComment,
}
