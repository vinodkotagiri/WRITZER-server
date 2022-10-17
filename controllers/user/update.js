const User = require('../../models/user')
const emailValidator = require('email-validator')
const updateUser = async (req, res) => {
	try {
		const { id, name, email, password, website, image } = req.body
		const userFromDb = await User.findById(id)
		// check if user is himself/herself
		if (userFromDb._id.toString() !== req.user._id.toString()) {
			return res.status(403).send('You are not allowed to update this user')
		}
		// check valid email
		if (!emailValidator.validate(email)) {
			return res.status(400).json({ error: 'Invalid email' })
		}
		// check if email is taken
		const exist = await User.findOne({ email })
		if (exist && exist._id.toString() !== userFromDb._id.toString()) {
			return res.status(400).json({ error: 'Email is taken' })
		}
		// check password length
		if (password && password.length < 6) {
			return res.status(400).json({
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
				// role: role || userFromDb.role,
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
module.exports = updateUser
