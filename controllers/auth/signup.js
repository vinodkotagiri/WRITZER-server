const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const { hashPassword } = require('../../helpers/auth')
const signup = async (req, res) => {
	try {
		// validation
		const { name, email, password } = req.body
		if (!name) {
			return res.status(400).json({
				error: 'Name is required',
			})
		}
		if (!email) {
			return res.status(400).json({
				error: 'Email is required',
			})
		}
		if (!password || password.length < 6) {
			return res.status(400).json({
				error: 'Password is required and should be 6 characters long',
			})
		}
		//check if user already exists
		const exist = await User.findOne({ email })
		if (exist) {
			return res.status(400).json({
				error: 'Email is taken',
			})
		}
		// hash password
		const hashedPassword = await hashPassword(password)
		try {
			const user = await new User({
				name: name.toLowerCase(),
				email: email.toLowerCase(),
				password: hashedPassword,
			}).save()
			// create signed token
			const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
				expiresIn: '7d',
			})
			const { password, ...rest } = user._doc
			return res.status(201).json({
				token,
				user: rest,
			})
		} catch (error) {
			console.log(error)
			return res
				.status(500)
				.json({ error: 'Somethong went wrong: ' + error.message })
		}
	} catch (error) {
		console.log(error)
		return res
			.status(500)
			.json({ error: 'Somethong went wrong: ' + error.message })
	}
}
module.exports = signup
