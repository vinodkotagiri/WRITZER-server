const User = require('../../models/user')
const currentUser = async (req, res) => {
	const { userId } = req.params
	try {
		const user = await User.findById(userId).populate('image')
		const { password, ...rest } = user._doc
		res.status(200).json({ rest })
	} catch (err) {
		console.log(err)
		res.status(500).send('Internal Server Error: ' + err)
	}
}
module.exports = currentUser
