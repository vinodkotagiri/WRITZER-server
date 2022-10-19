const Category = require('../../models/category')
const slugify = require('slugify')
const updateCategory = async (req, res) => {
	console.log(req.body)
	try {
		const { slug } = req.params
		const { name } = req.body
		const category = await Category.findOneAndUpdate(
			{ slug },
			{ name, slug: slugify(name) },
			{ new: true }
		)
		res.status(200).json(category)
	} catch (err) {
		console.log(err)
		res.status(500).send('Internal server error: ' + err)
	}
}
module.exports = updateCategory
