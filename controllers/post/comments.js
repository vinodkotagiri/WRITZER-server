const createComment = async (req, res) => {
	try {
		const { postId } = req.params
		const { comment } = req.body
		let newComment = await new Comment({
			content: comment,
			postedBy: req.user._id,
			postId,
		}).save()
		newComment = await newComment.populate('postedBy', 'name')
		res.json(newComment)
	} catch (err) {
		console.log(err)
	}
}

const comments = async (req, res) => {
	try {
		const perPage = 6
		const page = req.params.page || 1

		const allComments = await Comment.find()
			.skip((page - 1) * perPage)
			.populate('postedBy', 'name')
			.populate('postId', 'title slug')
			.sort({ createdAt: -1 })
			.limit(perPage)

		return res.json(allComments)
	} catch (err) {
		console.log(err)
	}
}

const userComments = async (req, res) => {
	try {
		const comments = await Comment.find({ postedBy: req.user._id })
			.populate('postedBy', 'name')
			.populate('postId', 'title slug')
			.sort({ createdAt: -1 })

		return res.json(comments)
	} catch (err) {
		console.log(err)
	}
}

const commentCount = async (req, res) => {
	try {
		const count = await Comment.countDocuments()
		res.json(count)
	} catch (err) {
		console.log(err)
	}
}

const updateComment = async (req, res) => {
	try {
		const { commentId } = req.params
		const { content } = req.body

		const updatedComment = await Comment.findByIdAndUpdate(
			commentId,
			{ content },
			{ new: true }
		)
		res.json(updatedComment)
	} catch (err) {
		console.log(err)
	}
}

const removeComment = async (req, res) => {
	try {
		const comment = await Comment.findByIdAndDelete(req.params.commentId)
		res.json({ ok: true })
	} catch (err) {
		console.log(err)
	}
}
module.exports = {
	createComment,
	comments,
	userComments,
	commentCount,
	updateComment,
	removeComment,
}
