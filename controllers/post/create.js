const Post = require('../../models/post')
const Category = require('../../models/category')
const User = require('../../models/user')
const slugify = require('slugify')

exports.createPost = async (req, res) => {
	try {
		// console.log(req.body);
		const { title, content, categories } = req.body
		// check if title is taken
		const alreadyExist = await Post.findOne({
			slug: slugify(title.toLowerCase()),
		})
		if (alreadyExist) return res.status(400).json({ error: 'Title is taken' })
		// get category ids based on category name
		let ids = []
		for (let i = 0; i < categories.length; i++) {
			Category.findOne({
				name: categories[i],
			}).exec((err, data) => {
				if (err) {
					console.log(err)
					return res.status(500).json({ error: err })
				}
				ids.push(data._id)
			})
		}
		// save post
		setTimeout(async () => {
			try {
				const post = await new Post({
					...req.body,
					slug: slugify(title),
					categories: ids,
					postedBy: req.user._id,
				}).save()

				// push the post _id to user's posts []
				await User.findByIdAndUpdate(req.user._id, {
					$addToSet: { posts: post._id },
				})

				return res.status(201).json(post)
			} catch (err) {
				console.log(err)
				res.status(500).json({ error: err })
			}
		}, 1000)
	} catch (err) {
		console.log(err)
		res.status(500).json({ error: err })
	}
}
