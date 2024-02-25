import { Schema, model } from 'mongoose';

const CommentSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		desc: { type: String, required: true },
		postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
		check: { type: Boolean, default: false },
		parent: {
			type: Schema.Types.ObjectId,
			ref: 'Comment',
			required: true,
			default: null,
		},
		replyOnUser: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			default: null,
		},
	},
	{ timestamps: true }
);

//getting replies for each comment
PostSchema.virtual('replies', {
  ref: "Comment", //model to attach reply
  localField: '_id',
  foreignField: 'parent'
})

const Comment = model('Comment', CommentSchema);
export default Comment;
