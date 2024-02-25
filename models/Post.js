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
			reduired: false,
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

//creating a reference to the comment schema
PostSchema.virtual('comments', {
  ref: "Comment", //model to pupalte data from
  localField: '_id',
  foreignField: 'postId'
})

const Post = model('Post', PostSchema);
export default Post;
