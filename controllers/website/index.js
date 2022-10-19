const Website = require('../../models/website')
const { sendContactMail } = require('../../helpers/mailer')

const contact = async (req, res) => {
	try {
		const { name, email, message } = req.body

		// send email
		try {
			sendContactMail({ name, email, message })
			res.json({ ok: true })
		} catch (err) {
			console.log(err)
			res.json({ ok: false })
		}
	} catch (err) {
		console.log(err)
	}
}

// homepage, getHomepage
const createPage = async (req, res) => {
	try {
		const { page } = req.body
		const found = await Website.findOne({ page })

		if (found) {
			// update
			const updated = await Website.findOneAndUpdate({ page }, req.body, {
				new: true,
			})
			return res.json(updated)
		} else {
			// create
			const created = await new Website(req.body).save()
			return res.json(created)
		}
	} catch (err) {
		console.log(err)
	}
}

const getPage = async (req, res) => {
	try {
		const { page } = req.params
		const found = await Website.findOne({ page }).populate('fullWidthImage')
		return res.json(found)
	} catch (err) {
		console.log(err)
	}
}
module.exports = { createPage, getPage, contact }
