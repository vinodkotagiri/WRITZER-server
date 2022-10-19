const Post = require('../../models/post')
const Category = require('../../models/category')
const slugify = require('slugify')
exports.editPost = async (req, res) => {
	console.log(req.body)
	try {
		const { postId } = req.params
		const { title, content, featuredImage, categories } = req.body
		// get category ids based on category name
		let ids = []
		for (let i = 0; i < categories.length; i++) {
			Category.findOne({
				name: categories[i],
			}).exec((err, data) => {
				if (err) {
					return console.log(err)
				}
				ids.push(data._id)
			})
		}
		setTimeout(async () => {
			const post = await Post.findByIdAndUpdate(
				postId,
				{
					title,
					slug: slugify(title),
					content,
					categories: ids,
					featuredImage,
				},
				{ new: true }
			)
				.populate('postedBy', 'name')
				.populate('categories', 'name slug')
				.populate('featuredImage', 'url')

			res.status(200).json(post)
		}, 1000)
	} catch (err) {
		console.log(err)
		res.status(500).json(err)
	}
}
