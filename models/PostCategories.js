import { Schema, model } from 'mongoose';

const PostCategorySchema = new Schema(
	{
		name: {
			type: String,
			reduired: true,
		}
	},
	{ timestamps: true }
);

const PostCategory = model('Post', PostCategorySchema);
export default PostCategory;
