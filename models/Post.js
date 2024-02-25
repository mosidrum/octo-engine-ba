import { Schema, model } from 'mongoose';

const PostSchema = new Schema(
	{
		title: {
			type: String,
			reduired: true,
		},
		caption: {
			type: String,
			reduired: true,
		},
		slug: {
			type: String,
			reduired: true,
			unique: true,
		},
		body: {
			type: Object,
			reduired: true,
		},
		photo: {
			type: String,
			reduired: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		tags: {
			type: [String],
		},
		categories: [{ type: Schema.Types.ObjectId, ref: 'PostCategories' }],
	},
	{ timestamps: true }
);

const Post = model('Post', PostSchema);
export default Post;
