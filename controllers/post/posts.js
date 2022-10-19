const Post = require('../../models/post')
const Comment = require('../../models/comment')
const posts = async (req, res) => {
	try {
		const perPage = 6
		const page = req.params.page || 1
		const all = await Post.find()
			.skip((page - 1) * perPage)
			.populate('featuredImage')
			.populate('postedBy', 'name')
			.populate('categories', 'name slug')
			.sort({ createdAt: -1 })
			.limit(perPage)
		res.status(200).json(all)
	} catch (err) {
		console.log(err)
		res.status(500).json(err)
	}
}

const postsForAdmin = async (req, res) => {
	try {
		const posts = await Post.find().select('title slug')
		res.status(200).json(posts)
	} catch (err) {
		console.log(err)
		res.status(500).json(err)
	}
}

const singlePost = async (req, res) => {
	try {
		const { slug } = req.params
		const post = await Post.findOne({ slug })
			.populate('postedBy', 'name')
			.populate('categories', 'name slug')
			.populate('featuredImage', 'url')
		// comments
		const comments = await Comment.find({ postId: post._id })
			.populate('postedBy', 'name')
			.sort({ createdAt: -1 })

		console.log('__comments__', comments)

		res.json({ post, comments })
	} catch (err) {
		console.log(err)
	}
}
const postsByAuthor = async (req, res) => {
	try {
		const posts = await Post.find({ postedBy: req.user._id })
			.populate('postedBy', 'name')
			.populate('categories', 'name slug')
			.populate('featuredImage', 'url')
			.sort({ createdAt: -1 })
		res.json(posts)
	} catch (err) {
		console.log(err)
	}
}

const postCount = async (req, res) => {
	try {
		const count = await Post.countDocuments()
		res.json(count)
	} catch (err) {
		console.log(err)
	}
}
const getNumbers = async (req, res) => {
	try {
		const posts = await Post.countDocuments()
		const users = await User.countDocuments()
		const comments = await Comment.countDocuments()
		const categories = await Category.countDocuments()

		return res.json({ posts, users, comments, categories })
	} catch (err) {
		console.log(err)
	}
}

module.exports = {
	posts,
	postsForAdmin,
	singlePost,
	postsByAuthor,
	postCount,
	getNumbers,
}
