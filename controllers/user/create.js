const User = require('../../models/user')
const { emailUserDetails } = require('./../../helpers/mailer')
const { hashPassword } = require('../../helpers/auth')
const createUser = async (req, res) => {
	const { name, email, password, role, checked, website } = req.body
	if (!name)
		return res.status(400).json({
			error: 'Name is required',
		})
	if (!email)
		return res.status(400).json({
			error: 'Email is required',
		})
	if (!password || password.length < 6)
		return res.status(400).json({
			error: 'Password is required and should be 6 characters long',
		})
	// if user exist
	const exist = await User.findOne({ email })
	if (exist) {
		return res.status(400).json({ error: 'Email already exists' })
	}
	// hash password
	const hashedPassword = await hashPassword(password)
	// if checked, send email with login details
	if (checked) {
		try {
			const user = await new User({
				name,
				email,
				password: hashedPassword,
				role,
				website,
			}).save()
			emailUserDetails(name, email, password)
			const { password: pwd, ...rest } = user._doc
			return res.status(201).json({ rest })
		} catch (err) {
			console.log(err)
		}
	}
}
module.exports = createUser
