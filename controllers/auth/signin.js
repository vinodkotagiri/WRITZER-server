const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const { comparePassword } = require('../../helpers/auth')
const signin = async (req, res) => {
	try {
		const { email, password } = req.body
		// check if user exists in the database
		const user = await User.findOne({ email: email.toLowerCase() })
		if (!user) {
			return res.status(400).json({
				error: 'User not found',
			})
		}
		// check password
		const match = await comparePassword(password, user.password)
		if (!match) {
			return res.status(401).json({
				error: 'Invalid password',
			})
		}
		// create signed token
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
			expiresIn: '7d',
		})
		user.password = undefined
		user.secret = undefined
		res.status(200).json({
			token,
			user,
		})
	} catch (err) {
		console.log(err)
		return res
			.status(400)
			.json({ error: 'Something went wrong: ' + err.message })
	}
}
module.exports = signin
