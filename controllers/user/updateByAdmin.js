const User = require('../../models/user')
const { hashPassword } = require('../../helpers/auth')
const emailValidator = require('email-validator')
const updateUserByAdmin = async (req, res) => {
	try {
		const { id, name, email, password, website, role, image } = req.body

		const userFromDb = await User.findById(id)

		// check valid email
		if (!emailValidator.validate(email)) {
			return res.json({ error: 'Invalid email' })
		}
		// check if email is taken
		const exist = await User.findOne({ email })
		if (exist && exist._id.toString() !== userFromDb._id.toString()) {
			return res.json({ error: 'Email is taken' })
		}
		// check password length
		if (password && password.length < 6) {
			return res.json({
				error: 'Password is required and should be 6 characters long',
			})
		}

		const hashedPassword = password ? await hashPassword(password) : undefined
		const updated = await User.findByIdAndUpdate(
			id,
			{
				name: name || userFromDb.name,
				email: email || userFromDb.email,
				password: hashedPassword || userFromDb.password,
				website: website || userFromDb.website,
				role: role || userFromDb.role,
				image: image || userFromDb.image,
			},
			{ new: true }
		).populate('image')

		res.status(200).json(updated)
	} catch (err) {
		console.log(err)
		res.status(500).send('Internal Server Error: ' + err)
	}
}
module.exports = updateUserByAdmin
