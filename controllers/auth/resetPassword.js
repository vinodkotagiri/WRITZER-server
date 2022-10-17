const User = require('../../models/user')
const { hashPassword } = require('../../helpers/auth')
const resetPassword = async (req, res) => {
	try {
		const { email, password, resetCode } = req.body
		// find user based on email and resetCode
		const user = await User.findOne({ email, resetCode })
		// if user not found
		if (!user) {
			return res.status(400).json({ error: 'Email or reset code is invalid' })
		}
		// if password is short
		if (!password || password.length < 6) {
			return res.status(400).json({
				error: 'Password is required and should be 6 characters long',
			})
		}
		// hash password
		const hashedPassword = await hashPassword(password)
		user.password = hashedPassword
		user.resetCode = ''
		user.save()
		return res.status(200).json({ ok: true })
	} catch (err) {
		console.log(err)
	}
}
module.exports = resetPassword
