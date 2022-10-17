const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { hashPassword } = require('../helpers/auth')
exports.signup = async (req, res) => {
	try {
		// validation
		const { name, email, password } = req.body
		if (!name) {
			return res.json({
				error: 'Name is required',
			})
		}
		if (!email) {
			return res.json({
				error: 'Email is required',
			})
		}
		if (!password || password.length < 6) {
			return res.json({
				error: 'Password is required and should be 6 characters long',
			})
		}
		//check if user already exists
		const exist = await User.findOne({ email })
		if (exist) {
			return res.json({
				error: 'Email is taken',
			})
		}
		// hash password
		const hashedPassword = await hashPassword(password)
		try {
			const user = await new User({
				name,
				email,
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
			console.log(err)
			return res
				.status(500)
				.json({ error: 'Somethong went wrong: ' + error.message })
		}
	} catch (error) {
		console.log(err)
		return res
			.status(500)
			.json({ error: 'Somethong went wrong: ' + error.message })
	}
}
