const Media = require('../../models/media')
const cloudinary = require('cloudinary')
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
})
const uploadImage = async (req, res) => {
	try {
		// console.log(req.body);
		const result = await cloudinary.uploader.upload(req.body.image)
		// console.log(result);
		res.json(result.secure_url)
	} catch (err) {
		console.log(err)
	}
}
const uploadImageFile = async (req, res) => {
	try {
		// console.log(req.files);
		const result = await cloudinary.uploader.upload(req.files.file.path)
		// save to db
		const media = await new Media({
			url: result.secure_url,
			public_id: result.public_id,
			postedBy: req.user._id,
		}).save()
		res.json(media)
	} catch (err) {
		console.log(err)
	}
}
module.exports = { uploadImageFile, uploadImage }
