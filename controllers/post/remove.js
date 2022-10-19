const Post = require('../../models/post')
exports.removePost = async (req, res) => {
	try {
		const post = await Post.findByIdAndDelete(req.params.postId)
		res.status(200).json({ ok: true })
	} catch (err) {
		res.status(500).json(err)
		console.log(err)
	}
}
