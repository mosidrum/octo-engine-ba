import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

const createComment = async (req, res, next) => {
	try {
		const { desc, slug, parent, replyOnUser } = req.body;

		const post = await Post.findOne({ slug: slug });

		if (!post) {
			const error = new Error('Post was not found');
			return next(error);
		}

		const newComment = new Comment({
			user: req.user._id,
			desc,
			post: post._id,
			parent,
			replyOnUser,
		});

		const savedComment = await newComment.save();
		return res.json(savedComment);
	} catch (error) {
		next(error);
	}
};

const updateComment = async (req, res, next) => {
	try {
		const { desc, _id, userId } = req.body;
		const comment = await Comment.findOne({ _id });
		if (!comment) {
			const error = new Error('Comment was not found');
			return next(error);
		}
		if (comment.user.toString() !== userId) {
			const error = new Error('Comment does not belong to you');
			return next(error);
		}
		comment.desc = desc;
		const updatedComment = await comment.save();
		return res.json(updatedComment);
	} catch (error) {
		next(error);
	}
};

const deleteComment = async (req, res, next) => {
	try {
		const { commentId, userId } = req.body;
    console.log(commentId);
		const comment = await Comment.findOne({ _id: commentId });
    console.log(comment);
		if (!comment) {
			const error = new Error('Comment was not found');
			return next(error);
		}
		if (comment.user.toString() !== userId) {
			const error = new Error('Comment does not belong to you');
			return next(error);
		}
		const deletedComment = await Comment.deleteOne({ _id: commentId });
    console.log(deletedComment);
		return res.json(deletedComment);
	} catch (error) {
		next(error);
	}
};

export { createComment, updateComment, deleteComment };
