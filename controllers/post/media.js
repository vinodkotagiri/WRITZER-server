const Media = require('../../models/media')
exports.media = async (req, res) => {
	try {
		const media = await Media.find()
			.populate('postedBy', '_id')
			.sort({ createdAt: -1 })
		res.json(media)
	} catch (err) {
		console.log(err)
	}
}

exports.removeMedia = async (req, res) => {
	try {
		const media = await Media.findByIdAndDelete(req.params.id)
		res.json({ ok: true })
	} catch (err) {
		console.log(err)
	}
}
