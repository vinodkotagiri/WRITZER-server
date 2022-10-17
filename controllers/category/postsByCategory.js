const Category = require('../../models/category')
const Post = require('../../models/post')
const postsByCategory = async (req, res) => {
	try {
		const { slug } = req.params
		const category = await Category.findOne({ slug })
		const posts = await Post.find({ categories: category._id })
			.populate('featuredImage postedBy')
			.limit(20)
		res.status(200).json({ posts, category })
	} catch (err) {
		console.log(err)
		res.status(500).send('Internal Server Error: ' + err)
	}
}
module.exports = postsByCategory
