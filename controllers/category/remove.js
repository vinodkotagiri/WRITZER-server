const Category = require('../../models/category')
const removeCategory = async (req, res) => {
	try {
		const { slug } = req.params
		const category = await Category.findOneAndDelete({ slug })
		res.status(200).json(category)
	} catch (err) {
		console.log(err)
		res.status(500).send('Internal Server Error: ' + error)
	}
}
module.exports = removeCategory
