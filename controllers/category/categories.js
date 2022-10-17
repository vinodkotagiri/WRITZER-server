const Category = require('../../models/category')
const listCategories = async (req, res) => {
	try {
		const categories = await Category.find().sort({ createdAt: -1 })
		res.status(200).json(categories)
	} catch (err) {
		console.log(err)
		res.status(500).send('Internal Server Error: ' + err)
	}
}
module.exports = listCategories
