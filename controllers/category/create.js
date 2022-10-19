const Category = require('../../models/category')
const slugify = require('slugify')
const createCategory = async (req, res) => {
	try {
		const { name } = req.body
		const check = await Category.findOne({ slug: slugify(name) })
		if (check) return res.status(400).json({ error: 'Category already exists' })
		const category = await new Category({
			name,
			slug: slugify(name),
		}).save()
		// console.log("saved category", category);
		res.status(201).json(category)
	} catch (error) {
		console.log(error)
		res.status(500).send('Internal Server Error: ' + error)
	}
}
module.exports = createCategory
