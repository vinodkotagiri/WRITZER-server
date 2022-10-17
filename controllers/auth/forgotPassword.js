const User = require('../../models/user')
const nanoid = require('nanoid')
const { sendResetEmail } = require('./../../helpers/mailer')
const forgotPassword = async (req, res) => {
	const { email } = req.body
	const user = await User.findOne({ email })
	if (!user) {
		res.status(400).json({ error: 'User not found!' })
		return
	}
	try {
		//Generate  unique reset code
		const resetCode = nanoid(6).toUpperCase()
		//Add code to the user db
		user.resetCode = resetCode
		user.save()
		sendResetEmail(email, resetCode)
		res.status(202).json({ messgae: 'Sent Email successfully' })
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error!' + error })
	}
}
module.exports = forgotPassword
