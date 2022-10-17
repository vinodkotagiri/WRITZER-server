const User = require('../../models/user')
const deleteUser = async (req, res) => {
	try {
		const { userId } = req.params
		if (userId === req.user._id) return
		const user = await User.findByIdAndDelete(userId)
		res.status(200).json(user)
	} catch (err) {
		console.log(err)
		res.status(500).send('Internal Server Error: ' + err)
	}
}
module.exports = deleteUser
