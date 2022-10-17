const User = require('../../models/user')
const listUsers = async (req, res) => {
	try {
		const all = await User.find().select('-password -secret -resetCode')
		res.status(200).json(all)
	} catch (err) {
		res.status(500).send('Internal Server Error: ' + err)
		console.log(err)
	}
}
module.exports = listUsers
